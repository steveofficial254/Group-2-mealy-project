#!/usr/bin/env python3
  
from app import create_app
from models import db, Dish

def update_images():
    app = create_app()

    with app.app_context():
        # Image mappings for Daily Menu items
        image_mappings = {
            "Nyama Choma Platter": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center",
            "Ugali & Sukuma Wiki": "https://upload.wikimedia.org/wikipedia/commons/4/48/Ugali_%26_Sukuma_Wiki.jpg",
            "Pilau Rice": "https://soyummyrecipes.com/wp-content/uploads/2020/12/Chicken-pilau-rice-1-2.jpg.webp",
            "Githeri Special": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8jo17LHxmHZeRXbkwED5MIthJXthXYlmTMQ&s",
            "Chapati & Beef Stew": "https://i.pinimg.com/1200x/11/51/72/1151724a874912495a0dc0440a5c179e.jpg",
            "Samosas (6 pcs)": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center",
            "Mutura Combo": "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop&crop=center",
            "Fish & Ugali": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6F-5ExO6HnUWgNnQ1_qRzsFXgDsu9j2KxOTPxXx_MgqIGxR1saR-bbCPdx-HsfmIocQc&usqp=CAU"
        }

        updated_count = 0
        for dish_name, image_url in image_mappings.items():
            dishes = Dish.query.filter_by(name=dish_name, category="Daily Menu").all()
            for dish in dishes:
                if not dish.image_url or dish.image_url == "":
                    dish.image_url = image_url
                    updated_count += 1
                    print(f"✓ Updated image for: {dish_name}")

        db.session.commit()
        print(f"\n{'='*60}")
        print(f"Updated {updated_count} Daily Menu dishes with images")
        print(f"{'='*60}")

if __name__ == '__main__':
    update_images()
