from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def utcnow():
    return datetime.utcnow()


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, unique=True, nullable=False, index=True)
    password_hash = db.Column(db.Text, nullable=False)
    full_name = db.Column(db.Text, nullable=False)
    role = db.Column(db.Text, nullable=False)  # 'customer' | 'admin'
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    # One admin user can own one caterer (simple 1:1)
    caterer = db.relationship("Caterer", back_populates="owner", uselist=False)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "role": self.role,
            "created_at": self.created_at.isoformat() + "Z",
        }


class Caterer(db.Model):
    __tablename__ = "caterers"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    owner_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    owner = db.relationship("User", back_populates="caterer")
    daily_menus = db.relationship("DailyMenu", back_populates="caterer", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "owner_user_id": self.owner_user_id,
            "created_at": self.created_at.isoformat() + "Z",
        }


class DailyMenu(db.Model):
    __tablename__ = "daily_menus"
    id = db.Column(db.Integer, primary_key=True)
    caterer_id = db.Column(db.Integer, db.ForeignKey("caterers.id"), nullable=False, index=True)
    menu_date = db.Column(db.Date, nullable=False, index=True)
    cutoff_at = db.Column(db.DateTime, nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    __table_args__ = (
        db.UniqueConstraint("caterer_id", "menu_date", name="uq_menu_per_caterer_per_date"),
    )

    caterer = db.relationship("Caterer", back_populates="daily_menus")
    dishes = db.relationship("Dish", back_populates="daily_menu", cascade="all, delete-orphan")
    orders = db.relationship("Order", back_populates="daily_menu", cascade="all, delete-orphan")

    def to_dict(self, include_dishes=False):
        base = {
            "id": self.id,
            "caterer_id": self.caterer_id,
            "menu_date": self.menu_date.isoformat(),
            "cutoff_at": self.cutoff_at.isoformat() + "Z",
            "created_at": self.created_at.isoformat() + "Z",
        }
        if include_dishes:
            base["dishes"] = [d.to_dict() for d in self.dishes]
        return base


class Dish(db.Model):
    __tablename__ = "dishes"
    id = db.Column(db.Integer, primary_key=True)
    daily_menu_id = db.Column(db.Integer, db.ForeignKey("daily_menus.id"), nullable=False, index=True)
    name = db.Column(db.Text, nullable=False)
    price_cents = db.Column(db.Integer, nullable=False)
    category = db.Column(db.Text, nullable=False)  # breakfast/lunch/snack/dinner/etc
    image_url = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    ingredients = db.Column(db.Text, nullable=True)
    available_qty = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    daily_menu = db.relationship("DailyMenu", back_populates="dishes")
    order_items = db.relationship("OrderItem", back_populates="dish")

    def to_dict(self):
        return {
            "id": self.id,
            "daily_menu_id": self.daily_menu_id,
            "name": self.name,
            "price_cents": self.price_cents,
            "category": self.category,
            "image_url": self.image_url,
            "description": self.description,
            "ingredients": self.ingredients,
            "available_qty": self.available_qty,
            "created_at": self.created_at.isoformat() + "Z",
        }


class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    caterer_id = db.Column(db.Integer, db.ForeignKey("caterers.id"), nullable=False, index=True)
    daily_menu_id = db.Column(db.Integer, db.ForeignKey("daily_menus.id"), nullable=False, index=True)
    total_cents = db.Column(db.Integer, nullable=False, default=0)
    status = db.Column(db.Text, nullable=False, default="placed")  # placed/edited/cancelled/served
    payment_status = db.Column(db.Text, nullable=False, default="unpaid")  # unpaid/paid/refunded
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    user = db.relationship("User")
    daily_menu = db.relationship("DailyMenu", back_populates="orders")
    items = db.relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

    def to_dict(self, include_items=False):
        base = {
            "id": self.id,
            "user_id": self.user_id,
            "caterer_id": self.caterer_id,
            "daily_menu_id": self.daily_menu_id,
            "total_cents": self.total_cents,
            "status": self.status,
            "payment_status": self.payment_status,
            "created_at": self.created_at.isoformat() + "Z",
        }
        if include_items:
            base["items"] = [i.to_dict() for i in self.items]
        return base


class OrderItem(db.Model):
    __tablename__ = "order_items"
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False, index=True)
    dish_id = db.Column(db.Integer, db.ForeignKey("dishes.id"), nullable=False, index=True)
    qty = db.Column(db.Integer, nullable=False)
    unit_price_cents = db.Column(db.Integer, nullable=False)
    line_total_cents = db.Column(db.Integer, nullable=False)

    order = db.relationship("Order", back_populates="items")
    dish = db.relationship("Dish", back_populates="order_items")

    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "dish_id": self.dish_id,
            "qty": self.qty,
            "unit_price_cents": self.unit_price_cents,
            "line_total_cents": self.line_total_cents,
        }
