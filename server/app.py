import os
from datetime import datetime, date
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
)
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import jwt
import requests
from models import db, User, Caterer, DailyMenu, Dish, Order, OrderItem

load_dotenv()


def create_app():
    app = Flask(__name__)

    # -------------------- Config --------------------
    # Fix for Render/Heroku DATABASE_URL (postgres:// -> postgresql://)
    database_url = os.getenv("DATABASE_URL", "sqlite:///mealy.db")
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "dev-secret")
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-flask-secret")

    # -------------------- Init extensions --------------------
    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # -------------------- Helpers --------------------
    def err(msg, code=400):
        return jsonify({"error": msg}), code

    def must_iso_date(s, field="date"):
        try:
            return date.fromisoformat(s)
        except Exception:
            raise ValueError(f"{field} must be YYYY-MM-DD")

    def must_iso_dt(s, field="datetime"):
        try:
            return datetime.fromisoformat(s.rstrip("Z"))
        except Exception:
            raise ValueError(f"{field} must be ISO-8601 (e.g. 2025-09-10T16:00:00Z)")

    def paginate(query):
        p = max(int(request.args.get("page", 1)), 1)
        n = min(max(int(request.args.get("per_page", 20)), 1), 100)
        res = query.paginate(page=p, per_page=n, error_out=False)
        return res.items, {"page": p, "per_page": n, "total": res.total, "total_pages": res.pages}

    # Role guard
    def role_required(role):
        def decorator(fn):
            from functools import wraps
            @wraps(fn)
            @jwt_required()
            def wrapper(*args, **kwargs):
                claims = get_jwt()
                if claims.get("role") != role:
                    return err("forbidden: requires role " + role, 403)
                return fn(*args, **kwargs)
            return wrapper
        return decorator

    # -------------------- Routes --------------------
    @app.get("/")
    def index():
        """Display all available API endpoints"""
        routes = []
        for rule in app.url_map.iter_rules():
            if rule.endpoint != 'static':
                routes.append({
                    "endpoint": rule.rule,
                    "methods": sorted(list(rule.methods - {'HEAD', 'OPTIONS'})),
                    "function": rule.endpoint
                })

        # Sort by endpoint path
        routes.sort(key=lambda x: x['endpoint'])

        return jsonify({
            "message": "Mealy API Server",
            "version": "1.0",
            "total_endpoints": len(routes),
            "endpoints": routes,
            "grouped_endpoints": {
                "health": [
                    {"path": "/health", "methods": ["GET"], "description": "Health check"}
                ],
                "authentication": [
                    {"path": "/auth/register", "methods": ["POST"], "description": "Register new user"},
                    {"path": "/auth/login", "methods": ["POST"], "description": "Login with email/password"},
                    {"path": "/auth/me", "methods": ["GET"], "description": "Get current user info (requires JWT)"},
                    {"path": "/auth/google", "methods": ["POST"], "description": "Google OAuth authentication"},
                    {"path": "/auth/apple", "methods": ["POST"], "description": "Apple Sign In authentication"}
                ],
                "caterers": [
                    {"path": "/caterers", "methods": ["POST"], "description": "Create caterer (admin only)"}
                ],
                "daily_menus": [
                    {"path": "/daily-menus", "methods": ["POST"], "description": "Create daily menu (admin only)"},
                    {"path": "/daily-menus", "methods": ["GET"], "description": "List daily menus with pagination"},
                    {"path": "/daily-menus/<int:menu_id>", "methods": ["GET"], "description": "Get menu details with dishes"}
                ],
                "dishes": [
                    {"path": "/dishes", "methods": ["POST"], "description": "Add dish to menu (admin only)"},
                    {"path": "/dishes", "methods": ["GET"], "description": "List dishes for a menu"},
                    {"path": "/dishes/<int:dish_id>", "methods": ["PATCH"], "description": "Update dish (admin only)"},
                    {"path": "/dishes/<int:dish_id>", "methods": ["DELETE"], "description": "Delete dish (admin only)"}
                ],
                "orders": [
                    {"path": "/orders", "methods": ["POST"], "description": "Place new order (customer only)"},
                    {"path": "/orders/my", "methods": ["GET"], "description": "Get my orders (customer only)"},
                    {"path": "/orders/<int:order_id>", "methods": ["PATCH"], "description": "Edit order before cutoff (customer only)"},
                    {"path": "/orders/<int:order_id>/mark-paid", "methods": ["POST"], "description": "Mark order as paid (admin only)"},
                    {"path": "/orders/<int:order_id>/cancel", "methods": ["POST"], "description": "Cancel order (customer only)"}
                ],
                "admin": [
                    {"path": "/admin/orders", "methods": ["GET"], "description": "View orders for a date (admin only)"},
                    {"path": "/admin/revenue", "methods": ["GET"], "description": "View revenue for a date (admin only)"}
                ],
                "debug": [
                    {"path": "/debug/users", "methods": ["GET"], "description": "List all users (dev only)"},
                    {"path": "/debug/caterers", "methods": ["GET"], "description": "List all caterers (dev only)"}
                ]
            }
        })

    @app.get("/health")
    def health():
        return jsonify({"ok": True})

    # -------- Auth --------
    @app.post("/auth/register")
    def register():
        d = request.get_json() or {}
        email = d.get("email")
        password = d.get("password")
        full_name = d.get("full_name")
        role = d.get("role", "customer")
        if not all([email, password, full_name]) or role not in ("customer", "admin"):
            return err("email, password, full_name, role('customer'|'admin') required")
        if User.query.filter_by(email=email).first():
            return err("email already exists", 409)
        u = User(
            email=email,
            password_hash=generate_password_hash(password),
            full_name=full_name,
            role=role
        )
        db.session.add(u)
        db.session.commit()
        return jsonify(u.to_dict()), 201

    @app.post("/auth/login")
    def login():
        d = request.get_json() or {}
        email = d.get("email")
        password = d.get("password")
        if not email or not password:
            return err("email and password required")
        u = User.query.filter_by(email=email).first()
        if not u or not check_password_hash(u.password_hash, password):
            return err("invalid credentials", 401)
        # IMPORTANT: identity must be a STRING for modern PyJWT
        token = create_access_token(identity=str(u.id), additional_claims={"role": u.role})
        return jsonify({"access_token": token, "user": u.to_dict()})

    @app.get("/auth/me")
    @jwt_required()
    def me():
        uid = int(get_jwt_identity())
        u = User.query.get_or_404(uid)
        return jsonify(u.to_dict())

    @app.post("/auth/google")
    def google_auth():
        """
        Authenticate with Google OAuth
        Body: { "token": "google_id_token" }
        """
        d = request.get_json() or {}
        token = d.get("token")
        if not token:
            return err("token required")

        try:
            # Verify the Google token
            google_client_id = os.getenv("GOOGLE_CLIENT_ID")
            idinfo = id_token.verify_oauth2_token(
                token, google_requests.Request(), google_client_id
            )

            # Extract user information
            email = idinfo.get("email")
            full_name = idinfo.get("name")
            google_id = idinfo.get("sub")

            if not email:
                return err("email not provided by Google", 400)

            # Check if user exists
            u = User.query.filter_by(email=email).first()

            if not u:
                # Create new user
                u = User(
                    email=email,
                    password_hash=generate_password_hash(os.urandom(32).hex()),  # Random password for OAuth users
                    full_name=full_name or email.split("@")[0],
                    role="customer",
                    oauth_provider="google",
                    oauth_id=google_id
                )
                db.session.add(u)
                db.session.commit()

            # Generate JWT token
            access_token = create_access_token(
                identity=str(u.id),
                additional_claims={"role": u.role}
            )

            return jsonify({
                "access_token": access_token,
                "user": u.to_dict()
            })

        except ValueError as e:
            return err(f"Invalid Google token: {str(e)}", 401)
        except Exception as e:
            return err(f"Google authentication failed: {str(e)}", 500)

    @app.post("/auth/apple")
    def apple_auth():
        """
        Authenticate with Apple Sign In
        Body: { "id_token": "apple_id_token", "code": "authorization_code" }
        """
        d = request.get_json() or {}
        id_token_str = d.get("id_token")

        if not id_token_str:
            return err("id_token required")

        try:
            # Decode Apple JWT (without verification for simplicity - in production, verify signature)
            decoded = jwt.decode(id_token_str, options={"verify_signature": False})

            email = decoded.get("email")
            apple_id = decoded.get("sub")

            if not email and not apple_id:
                return err("Invalid Apple token", 400)

            # For Apple, email might not always be provided (only on first sign-in)
            # Use apple_id to find existing users
            u = None
            if email:
                u = User.query.filter_by(email=email).first()

            if not u and apple_id:
                u = User.query.filter_by(oauth_id=apple_id, oauth_provider="apple").first()

            if not u:
                # Create new user
                # If no email provided, generate a placeholder
                user_email = email or f"{apple_id}@appleid.mealy.com"
                full_name = d.get("user", {}).get("name", {}).get("firstName", "Apple User")

                u = User(
                    email=user_email,
                    password_hash=generate_password_hash(os.urandom(32).hex()),
                    full_name=full_name,
                    role="customer",
                    oauth_provider="apple",
                    oauth_id=apple_id
                )
                db.session.add(u)
                db.session.commit()

            # Generate JWT token
            access_token = create_access_token(
                identity=str(u.id),
                additional_claims={"role": u.role}
            )

            return jsonify({
                "access_token": access_token,
                "user": u.to_dict()
            })

        except jwt.InvalidTokenError as e:
            return err(f"Invalid Apple token: {str(e)}", 401)
        except Exception as e:
            return err(f"Apple authentication failed: {str(e)}", 500)

    # -------- Caterers (admin) --------
    @app.post("/caterers")
    @role_required("admin")
    def create_caterer():
        d = request.get_json() or {}
        name = d.get("name")
        if not name:
            return err("name required")
        uid = int(get_jwt_identity())
        c = Caterer(name=name, owner_user_id=uid)
        db.session.add(c)
        db.session.commit()
        return jsonify(c.to_dict()), 201

    # -------- Daily menus --------
    @app.post("/daily-menus")
    @role_required("admin")
    def create_daily_menu():
        d = request.get_json() or {}
        caterer_id = d.get("caterer_id")
        menu_date = d.get("menu_date")
        cutoff_at = d.get("cutoff_at")
        if not all([caterer_id, menu_date, cutoff_at]):
            return err("caterer_id, menu_date, cutoff_at required")
        if not Caterer.query.get(caterer_id):
            return err("caterer not found", 404)
        try:
            menu_date = must_iso_date(menu_date, "menu_date")
            cutoff_at = must_iso_dt(cutoff_at, "cutoff_at")
        except ValueError as e:
            return err(str(e))
        exists = DailyMenu.query.filter_by(caterer_id=caterer_id, menu_date=menu_date).first()
        if exists:
            return err("menu already exists for this caterer/date", 409)
        m = DailyMenu(caterer_id=caterer_id, menu_date=menu_date, cutoff_at=cutoff_at)
        db.session.add(m)
        db.session.commit()
        return jsonify(m.to_dict()), 201

    @app.get("/daily-menus")
    def list_daily_menus():
        caterer_id = request.args.get("caterer_id", type=int)
        date_str = request.args.get("date")
        q = DailyMenu.query
        if caterer_id:
            q = q.filter_by(caterer_id=caterer_id)
        if date_str:
            try:
                d = must_iso_date(date_str, "date")
            except ValueError as e:
                return err(str(e))
            q = q.filter_by(menu_date=d)
        q = q.order_by(DailyMenu.menu_date.desc(), DailyMenu.id.desc())
        items, meta = paginate(q)
        return jsonify({"data": [m.to_dict() for m in items], "pagination": meta})

    @app.get("/daily-menus/<int:menu_id>")
    def daily_menu_detail(menu_id):
        m = DailyMenu.query.get_or_404(menu_id)
        return jsonify(m.to_dict(include_dishes=True))

    # -------- Dishes --------
    @app.post("/dishes")
    @role_required("admin")
    def add_dish():
        d = request.get_json() or {}
        required = ("daily_menu_id", "name", "price_cents", "category", "available_qty")
        if not all(k in d for k in required):
            return err(f"required: {', '.join(required)}")
        menu = DailyMenu.query.get(d["daily_menu_id"])
        if not menu:
            return err("daily_menu not found", 404)
        if int(d["price_cents"]) < 0 or int(d["available_qty"]) < 0:
            return err("price_cents and available_qty must be >= 0")
        dish = Dish(
            daily_menu_id=d["daily_menu_id"],
            name=d["name"],
            price_cents=int(d["price_cents"]),
            category=d["category"],
            image_url=d.get("image_url"),
            description=d.get("description"),
            ingredients=d.get("ingredients"),
            available_qty=int(d["available_qty"]),
        )
        db.session.add(dish)
        db.session.commit()
        return jsonify(dish.to_dict()), 201

    @app.patch("/dishes/<int:dish_id>")
    @role_required("admin")
    def update_dish(dish_id):
        dish = Dish.query.get_or_404(dish_id)
        d = request.get_json() or {}
        for field in ("name", "price_cents", "category", "image_url", "description", "ingredients", "available_qty"):
            if field in d:
                setattr(dish, field, d[field])
        db.session.commit()
        return jsonify(dish.to_dict())

    @app.get("/dishes")
    def list_dishes():
        daily_menu_id = request.args.get("daily_menu_id", type=int)
        if not daily_menu_id:
            return err("daily_menu_id query param required")
        q = Dish.query.filter_by(daily_menu_id=daily_menu_id).order_by(Dish.id.asc())
        items, meta = paginate(q)
        return jsonify({"data": [x.to_dict() for x in items], "pagination": meta})

    @app.delete("/dishes/<int:dish_id>")
    @role_required("admin")
    def delete_dish(dish_id):
        dish = Dish.query.get_or_404(dish_id)
        db.session.delete(dish)
        db.session.commit()
        return jsonify({"message": "dish deleted"}), 200

    # -------- Orders --------
    @app.post("/orders")
    @role_required("customer")
    def place_order():
        """
        Body:
        {
          "daily_menu_id": 10,
          "items": [{"dish_id": 100, "qty": 1}, {"dish_id": 101, "qty": 2}]
        }
        """
        d = request.get_json() or {}
        daily_menu_id = d.get("daily_menu_id")
        items = d.get("items", [])
        if not daily_menu_id or not items:
            return err("daily_menu_id and items[] required")
        uid = int(get_jwt_identity())
        menu = DailyMenu.query.get(daily_menu_id)
        if not menu:
            return err("daily_menu not found", 404)

        # Note: Customers CAN place new orders anytime, they just can't EDIT after cutoff
        order = Order(user_id=uid, caterer_id=menu.caterer_id, daily_menu_id=menu.id,
                      status="placed", payment_status="unpaid")
        total = 0
        for it in items:
            dish = Dish.query.get(it.get("dish_id"))
            qty = int(it.get("qty", 0))
            if not dish or dish.daily_menu_id != menu.id:
                return err("dish invalid for this menu", 400)
            if qty <= 0:
                return err("qty must be > 0", 400)
            if dish.available_qty < qty:
                return err(f"insufficient stock for {dish.name}", 400)
            line_total = dish.price_cents * qty
            total += line_total
            order.items.append(OrderItem(
                dish_id=dish.id, qty=qty,
                unit_price_cents=dish.price_cents,
                line_total_cents=line_total
            ))
            dish.available_qty -= qty

        order.total_cents = total
        db.session.add(order)
        db.session.commit()
        return jsonify(order.to_dict(include_items=True)), 201

    @app.patch("/orders/<int:order_id>")
    @role_required("customer")
    def edit_order(order_id):
        """
        Body: { "items": [{"dish_id":100,"qty":2}, ...] }
        Only before cutoff. User can only edit own order.
        """
        uid = int(get_jwt_identity())
        order = Order.query.get_or_404(order_id)
        if order.user_id != uid:
            return err("cannot edit someone else's order", 403)
        menu = DailyMenu.query.get(order.daily_menu_id)
        if datetime.utcnow() >= menu.cutoff_at:
            return err("cutoff passed", 400)
        d = request.get_json() or {}
        new_items = d.get("items", [])
        if not new_items:
            return err("items[] required")

        # restock previous items
        for it in order.items:
            dish = Dish.query.get(it.dish_id)
            dish.available_qty += it.qty
        # remove old lines
        OrderItem.query.filter_by(order_id=order.id).delete()

        total = 0
        for it in new_items:
            dish = Dish.query.get(it.get("dish_id"))
            qty = int(it.get("qty", 0))
            if not dish or dish.daily_menu_id != menu.id:
                return err("dish invalid for this menu", 400)
            if qty <= 0:
                return err("qty must be > 0", 400)
            if dish.available_qty < qty:
                return err(f"insufficient stock for {dish.name}", 400)
            line_total = dish.price_cents * qty
            total += line_total
            db.session.add(OrderItem(order_id=order.id, dish_id=dish.id, qty=qty,
                                     unit_price_cents=dish.price_cents, line_total_cents=line_total))
            dish.available_qty -= qty

        order.total_cents = total
        order.status = "edited"
        db.session.commit()
        return jsonify(order.to_dict(include_items=True))

    @app.get("/orders/my")
    @role_required("customer")
    def my_orders():
        uid = int(get_jwt_identity())
        q = Order.query.filter_by(user_id=uid).order_by(Order.created_at.desc())
        items, meta = paginate(q)
        return jsonify({"data": [o.to_dict(include_items=True, include_user=False) for o in items], "pagination": meta})

    @app.post("/orders/<int:order_id>/mark-paid")
    @role_required("admin")
    def mark_paid(order_id):
        order = Order.query.get_or_404(order_id)
        order.payment_status = "paid"
        db.session.commit()
        return jsonify(order.to_dict())

    @app.post("/orders/<int:order_id>/cancel")
    @role_required("customer")
    def cancel_order(order_id):
        """
        Cancel an order - customer can only cancel their own orders
        Restocks the dishes that were in the order
        """
        uid = int(get_jwt_identity())
        order = Order.query.get_or_404(order_id)

        # Check if user owns this order
        if order.user_id != uid:
            return err("cannot cancel someone else's order", 403)

        # Check if order can be cancelled
        if order.status == "cancelled":
            return err("order is already cancelled", 400)
        if order.status == "served":
            return err("cannot cancel completed order", 400)

        # Restock the items
        for item in order.items:
            dish = Dish.query.get(item.dish_id)
            if dish:
                dish.available_qty += item.qty

        # Update order status
        order.status = "cancelled"
        db.session.commit()

        return jsonify({"message": "order cancelled successfully", "order": order.to_dict(include_items=True)})

    # -------- Admin dashboards --------
    @app.get("/admin/orders")
    @role_required("admin")
    def admin_orders_for_day():
        caterer_id = request.args.get("caterer_id", type=int)
        date_str = request.args.get("date")
        if not caterer_id or not date_str:
            return err("caterer_id and date required")
        try:
            d = date.fromisoformat(date_str)
        except Exception:
            return err("date must be YYYY-MM-DD")
        q = (Order.query.join(DailyMenu, Order.daily_menu_id == DailyMenu.id)
             .filter(Order.caterer_id == caterer_id, DailyMenu.menu_date == d)
             .order_by(Order.created_at.desc()))
        items, meta = paginate(q)
        return jsonify({"data": [o.to_dict(include_items=True, include_user=True) for o in items], "pagination": meta})

    @app.get("/admin/revenue")
    @role_required("admin")
    def admin_revenue_for_day():
        caterer_id = request.args.get("caterer_id", type=int)
        date_str = request.args.get("date")
        if not caterer_id or not date_str:
            return err("caterer_id and date required")
        try:
            d = date.fromisoformat(date_str)
        except Exception:
            return err("date must be YYYY-MM-DD")
        q = (Order.query.join(DailyMenu, Order.daily_menu_id == DailyMenu.id)
             .filter(
                 Order.caterer_id == caterer_id,
                 DailyMenu.menu_date == d,
                 Order.status.in_(["placed", "edited", "served"])
             ))
        total_orders = q.count()
        total_cents = sum(o.total_cents for o in q.all())
        return jsonify({"total_orders": total_orders, "total_revenue_cents": total_cents})

    # -------- DEV ONLY: quick inspection --------
    @app.route("/debug/users", methods=["GET"])
    def debug_users():
        users = User.query.order_by(User.id).all()
        return jsonify({
            "count": len(users),
            "users": [
                {"id": u.id, "email": u.email, "role": u.role, "full_name": u.full_name}
                for u in users
            ]
        }), 200

    @app.route("/debug/caterers", methods=["GET"])
    def debug_caterers():
        cats = Caterer.query.order_by(Caterer.id).all()
        return jsonify([c.to_dict() for c in cats]), 200

    return app


# For production deployment (Gunicorn)
app = create_app()

if __name__ == "__main__":
    # Safe in dev if tables don't exist yet; with migrations it's a no-op.
    with app.app_context():
        db.create_all()

    # Allow port to be configured via environment variable or default to 5001
    port = int(os.getenv("FLASK_PORT", 5001))
    app.run(debug=True, port=port, host="0.0.0.0")

