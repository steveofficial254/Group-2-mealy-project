#!/usr/bin/env python3
"""
Seed script to populate the database with a caterer, daily menu, and dishes.
Run this script to set up initial data for the Mealy application.
"""
from datetime import datetime, date, timedelta
from app import create_app
from models import db, Caterer, DailyMenu, Dish, User

def seed_database():
    app = create_app()

    with app.app_context():
        # Check if we already have data
        existing_caterer = Caterer.query.first()
        if existing_caterer:
            print(f"✓ Caterer already exists: {existing_caterer.name} (ID: {existing_caterer.id})")
            caterer = existing_caterer
        else:
            # Find an admin user or create one
            admin_user = User.query.filter_by(role='admin').first()
            if not admin_user:
                print("Creating default admin user...")
                from werkzeug.security import generate_password_hash
                admin_user = User(
                    email='admin@mealy.com',
                    password_hash=generate_password_hash('admin123'),
                    full_name='Admin User',
                    role='admin'
                )
                db.session.add(admin_user)
                db.session.commit()
                print(f"✓ Created admin user: {admin_user.email}")

            # Create caterer
            caterer = Caterer(
                name='Mealy Kitchen',
                owner_user_id=admin_user.id
            )
            db.session.add(caterer)
            db.session.commit()
            print(f"✓ Created caterer: {caterer.name} (ID: {caterer.id})")

        # Check if we have a daily menu for today
        today = date.today()
        existing_menu = DailyMenu.query.filter_by(
            caterer_id=caterer.id,
            menu_date=today
        ).first()

        if existing_menu:
            print(f"✓ Daily menu already exists for {today} (ID: {existing_menu.id})")
            daily_menu = existing_menu
        else:
            # Create daily menu for today
            cutoff_time = datetime.combine(today, datetime.min.time()).replace(hour=14, minute=0)
            daily_menu = DailyMenu(
                caterer_id=caterer.id,
                menu_date=today,
                cutoff_at=cutoff_time
            )
            db.session.add(daily_menu)
            db.session.commit()
            print(f"✓ Created daily menu for {today} (ID: {daily_menu.id})")

        # Check if we already have dishes
        existing_dishes = Dish.query.filter_by(daily_menu_id=daily_menu.id).count()
        if existing_dishes > 0:
            print(f"✓ Menu already has {existing_dishes} dishes")
            return

        # Image base URL for frontend assets
        image_base = "/static/media/"

        # Seed dishes - comprehensive menu including all categories from frontend
        dishes_data = [
            # Pizzas (images 21-23)
            {"name": "Farmhouse Xtreme Pizza", "price_cents": 95000, "category": "Pizzas", "available_qty": 20,
             "description": "Mozzarella | Big size | 6 slices", "image_url": f"{image_base}image21.jpg"},
            {"name": "Deluxe Pizza", "price_cents": 100000, "category": "Pizzas", "available_qty": 20,
             "description": "Mozzarella | Big size | 6 slices", "image_url": f"{image_base}image22.jpg"},
            {"name": "Tandoori Pizza", "price_cents": 110000, "category": "Pizzas", "available_qty": 15,
             "description": "Tandoori chicken | Spicy | 8 slices", "image_url": f"{image_base}image23.jpg"},

            # Garlic Bread (images 24-26)
            {"name": "Classic Garlic Bread", "price_cents": 40000, "category": "Garlic Bread", "available_qty": 30,
             "description": "Fresh baked | Butter & herbs", "image_url": f"{image_base}image24.jpg"},
            {"name": "Cheese Garlic Bread", "price_cents": 50000, "category": "Garlic Bread", "available_qty": 30,
             "description": "Loaded with mozzarella cheese", "image_url": f"{image_base}image25.jpg"},
            {"name": "Stuffed Garlic Bread", "price_cents": 60000, "category": "Garlic Bread", "available_qty": 25,
             "description": "Cheese & jalapeno stuffed", "image_url": f"{image_base}image26.jpg"},

            # Calzone (images 27-29)
            {"name": "Chicken Calzone", "price_cents": 85000, "category": "Calzone", "available_qty": 20,
             "description": "Grilled chicken | Cheese | Veggies", "image_url": f"{image_base}image27.jpg"},
            {"name": "Veggie Calzone", "price_cents": 80000, "category": "Calzone", "available_qty": 20,
             "description": "Mixed vegetables | Mozzarella", "image_url": f"{image_base}image28.jpg"},
            {"name": "BBQ Beef Calzone", "price_cents": 90000, "category": "Calzone", "available_qty": 15,
             "description": "BBQ beef | Onions | Cheese", "image_url": f"{image_base}image29.jpg"},

            # Kebabas (images 30-32)
            {"name": "Chicken Kebab", "price_cents": 70000, "category": "Kebabas", "available_qty": 25,
             "description": "Grilled chicken | Spices | Served with salad", "image_url": f"{image_base}image30.jpg"},
            {"name": "Beef Kebab", "price_cents": 75000, "category": "Kebabas", "available_qty": 25,
             "description": "Tender beef | Traditional spices", "image_url": f"{image_base}image31.jpg"},
            {"name": "Mix Grill Kebab", "price_cents": 90000, "category": "Kebabas", "available_qty": 20,
             "description": "Chicken & beef | Full platter", "image_url": f"{image_base}image32.jpg"},

            # Salads (images 33-35)
            {"name": "Caesar Salad", "price_cents": 45000, "category": "Salads", "available_qty": 30,
             "description": "Lettuce | Chicken | Caesar dressing", "image_url": f"{image_base}image33.jpg"},
            {"name": "Greek Salad", "price_cents": 50000, "category": "Salads", "available_qty": 30,
             "description": "Feta cheese | Olives | Tomatoes", "image_url": f"{image_base}image34.jpg"},
            {"name": "Garden Fresh Salad", "price_cents": 40000, "category": "Salads", "available_qty": 35,
             "description": "Mixed greens | Fresh vegetables", "image_url": f"{image_base}image35.jpg"},

            # Cold drinks (images 36-38)
            {"name": "Coca Cola", "price_cents": 15000, "category": "Cold drinks", "available_qty": 50,
             "description": "Chilled soft drink", "image_url": f"{image_base}image36.jpg"},
            {"name": "Fresh Juice", "price_cents": 25000, "category": "Cold drinks", "available_qty": 40,
             "description": "Mango | Orange | Passion", "image_url": f"{image_base}image37.jpg"},
            {"name": "Milkshake", "price_cents": 30000, "category": "Cold drinks", "available_qty": 30,
             "description": "Chocolate | Vanilla | Strawberry", "image_url": f"{image_base}image38.jpg"},

            # Happy Mealy (images 39-41)
            {"name": "Kids Pizza Meal", "price_cents": 65000, "category": "Happy Mealy", "available_qty": 20,
             "description": "Small pizza | Fries | Juice", "image_url": f"{image_base}image39.jpg"},
            {"name": "Chicken Nuggets Meal", "price_cents": 60000, "category": "Happy Mealy", "available_qty": 25,
             "description": "6pcs nuggets | Fries | Drink", "image_url": f"{image_base}image40.jpg"},
            {"name": "Mini Burger Meal", "price_cents": 50000, "category": "Happy Mealy", "available_qty": 25,
             "description": "Mini burger | Fries | Toy", "image_url": f"{image_base}image41.jpg"},

            # Desserts (images 42-44)
            {"name": "Chocolate Cake", "price_cents": 40000, "category": "Desserts", "available_qty": 20,
             "description": "Rich chocolate | Creamy frosting", "image_url": f"{image_base}image42.jpg"},
            {"name": "Ice Cream Sundae", "price_cents": 35000, "category": "Desserts", "available_qty": 30,
             "description": "Vanilla | Chocolate | Toppings", "image_url": f"{image_base}image43.jpg"},
            {"name": "Brownie Delight", "price_cents": 45000, "category": "Desserts", "available_qty": 20,
             "description": "Warm brownie | Ice cream", "image_url": f"{image_base}image44.jpg"},

            # Coffee (images 45-47)
            {"name": "Cappuccino", "price_cents": 25000, "category": "Coffee", "available_qty": 40,
             "description": "Espresso | Steamed milk | Foam", "image_url": f"{image_base}image45.jpg"},
            {"name": "Latte", "price_cents": 28000, "category": "Coffee", "available_qty": 40,
             "description": "Smooth espresso | Milk", "image_url": f"{image_base}image46.jpg"},
            {"name": "Americano", "price_cents": 22000, "category": "Coffee", "available_qty": 40,
             "description": "Strong espresso | Hot water", "image_url": f"{image_base}image47.jpg"},

            # Sauces (images 48-50)
            {"name": "BBQ Sauce", "price_cents": 8000, "category": "Sauces", "available_qty": 100,
             "description": "Smoky and sweet", "image_url": f"{image_base}image48.jpg"},
            {"name": "Hot Sauce", "price_cents": 8000, "category": "Sauces", "available_qty": 100,
             "description": "Extra spicy | Chili peppers", "image_url": f"{image_base}image49.jpg"},
            {"name": "Garlic Mayo", "price_cents": 9000, "category": "Sauces", "available_qty": 100,
             "description": "Creamy garlic mayonnaise", "image_url": f"{image_base}image50.jpg"},

            # KUKU (images 51-53)
            {"name": "Fried Chicken", "price_cents": 80000, "category": "KUKU", "available_qty": 30,
             "description": "Crispy fried | 4 pieces", "image_url": f"{image_base}image51.jpg"},
            {"name": "Grilled Chicken", "price_cents": 85000, "category": "KUKU", "available_qty": 30,
             "description": "Herb marinated | Tender", "image_url": f"{image_base}image52.jpg"},
            {"name": "Chicken Wings", "price_cents": 70000, "category": "KUKU", "available_qty": 35,
             "description": "Spicy buffalo | 8 pieces", "image_url": f"{image_base}image53.jpg"},

            # Daily Menu / Traditional Kenyan
            {"name": "Nyama Choma Platter", "price_cents": 120000, "category": "Daily Menu", "available_qty": 15,
             "description": "Grilled goat meat | Authentic Kenyan style"},
            {"name": "Ugali & Sukuma Wiki", "price_cents": 35000, "category": "Daily Menu", "available_qty": 40,
             "description": "Traditional maize meal with kale"},
            {"name": "Pilau Rice", "price_cents": 65000, "category": "Daily Menu", "available_qty": 30,
             "description": "Spiced rice | Kenyan style"},
            {"name": "Githeri Special", "price_cents": 28000, "category": "Daily Menu", "available_qty": 35,
             "description": "Maize and beans | Traditional"},
            {"name": "Chapati & Beef Stew", "price_cents": 48000, "category": "Daily Menu", "available_qty": 30,
             "description": "Soft flatbread with rich stew"},
            {"name": "Samosas (6 pcs)", "price_cents": 30000, "category": "Daily Menu", "available_qty": 50,
             "description": "Crispy pastries | Beef or veg"},
            {"name": "Mutura Combo", "price_cents": 42000, "category": "Daily Menu", "available_qty": 25,
             "description": "Traditional sausage | Kachumbari"},
            {"name": "Fish & Ugali", "price_cents": 85000, "category": "Daily Menu", "available_qty": 20,
             "description": "Fried tilapia with ugali"},
        ]

        print(f"\nAdding {len(dishes_data)} dishes to menu...")
        for dish_data in dishes_data:
            dish = Dish(
                daily_menu_id=daily_menu.id,
                **dish_data
            )
            db.session.add(dish)

        db.session.commit()
        print(f"✓ Successfully added {len(dishes_data)} dishes\n")

        # Print summary
        print("=" * 60)
        print("DATABASE SEEDING COMPLETE")
        print("=" * 60)
        print(f"Caterer ID: {caterer.id}")
        print(f"Daily Menu ID: {daily_menu.id}")
        print(f"Menu Date: {daily_menu.menu_date}")
        print(f"Total Dishes: {len(dishes_data)}")
        print("=" * 60)
        print("\nYou can now use this menu in your application!")
        print(f"Use daily_menu_id={daily_menu.id} when placing orders\n")

if __name__ == '__main__':
    seed_database()
