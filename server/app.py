import os
from datetime import datetime, date
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
)
from models import db, User, Caterer, DailyMenu, Dish, Order, OrderItem

load_dotenv()


def create_app():
    app = Flask(__name__)

    # -------------------- Config --------------------
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///mealy.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "dev-secret")
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-flask-secret")

    # -------------------- Init extensions --------------------
    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)

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
        if datetime.utcnow() >= menu.cutoff_at:
            return err("cutoff passed", 400)

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
        return jsonify({"data": [o.to_dict() for o in items], "pagination": meta})

    @app.post("/orders/<int:order_id>/mark-paid")
    @role_required("admin")
    def mark_paid(order_id):
        order = Order.query.get_or_404(order_id)
        order.payment_status = "paid"
        db.session.commit()
        return jsonify(order.to_dict())

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
        return jsonify({"data": [o.to_dict(include_items=True) for o in items], "pagination": meta})

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


if __name__ == "__main__":
    app = create_app()
    # Safe in dev if tables don't exist yet; with migrations it's a no-op.
    with app.app_context():
        db.create_all()
    app.run(debug=True)