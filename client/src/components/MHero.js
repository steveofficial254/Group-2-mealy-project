import React, { useState } from "react";
import "../styles/MHero.css";
import { useNavigate } from "react-router-dom";

import image21 from "../assets/image21.jpg";
import image22 from "../assets/image22.jpg";
import image23 from "../assets/image23.jpg";
import image24 from "../assets/image24.jpg";
import image25 from "../assets/image25.jpg";
import image26 from "../assets/image26.jpg";
import image27 from "../assets/image27.jpg";
import image28 from "../assets/image28.jpg";
import image29 from "../assets/image29.jpg";
import image30 from "../assets/image30.jpg";
import image31 from "../assets/image31.jpg";
import image32 from "../assets/image32.jpg";
import image33 from "../assets/image33.jpg";
import image34 from "../assets/image34.jpg";
import image35 from "../assets/image35.jpg";
import image36 from "../assets/image36.jpg";
import image37 from "../assets/image37.jpg";
import image38 from "../assets/image38.jpg";
import image39 from "../assets/image39.jpg";
import image40 from "../assets/image40.jpg";
import image41 from "../assets/image41.jpg";
import image42 from "../assets/image42.jpg";
import image43 from "../assets/image43.jpg";
import image44 from "../assets/image44.jpg";
import image45 from "../assets/image45.jpg";
import image46 from "../assets/image46.jpg";
import image47 from "../assets/image47.jpg";
import image48 from "../assets/image48.jpg";
import image49 from "../assets/image49.jpg";
import image50 from "../assets/image50.jpg";
import image51 from "../assets/image51.jpg";
import image52 from "../assets/image52.jpg";
import image53 from "../assets/image53.jpg";

// Menu data
const menuItems = {
  "Pizzas": [
    { id: 1, name: "Farmhouse Xtreme Pizza", description: "Mozzarella | Big size | 6 slices", image: image21, rating: 5, prices: { Small: 650, Medium: 950, Large: 1250 } },
    { id: 2, name: "Deluxe Pizza", description: "Mozzarella | Big size | 6 slices", image: image22, rating: 5, prices: { Small: 700, Medium: 1000, Large: 1300 } },
    { id: 3, name: "Tandoori Pizza", description: "Tandoori chicken | Spicy | 8 slices", image: image23, rating: 5, prices: { Small: 750, Medium: 1100, Large: 1400 } }
  ],
    "Garlic Bread": [
    { id: 11, name: "Classic Garlic Bread", description: "Fresh baked | Butter & herbs", image: image24, rating: 4, prices: { Small: 250, Medium: 400, Large: 550 } },
    { id: 12, name: "Cheese Garlic Bread", description: "Loaded with mozzarella cheese", image: image25, rating: 5, prices: { Small: 350, Medium: 500, Large: 650 } },
    { id: 13, name: "Stuffed Garlic Bread", description: "Cheese & jalapeno stuffed", image: image26, rating: 4, prices: { Small: 400, Medium: 600, Large: 750 } }
  ],
  "Calzone": [
    { id: 21, name: "Chicken Calzone", description: "Grilled chicken | Cheese | Veggies", image: image27, rating: 5, prices: { Small: 550, Medium: 850, Large: 1150 } },
    { id: 22, name: "Veggie Calzone", description: "Mixed vegetables | Mozzarella", image: image28, rating: 4, prices: { Small: 500, Medium: 800, Large: 1050 } },
    { id: 23, name: "BBQ Beef Calzone", description: "BBQ beef | Onions | Cheese", image: image29, rating: 5, prices: { Small: 600, Medium: 900, Large: 1200 } }
  ],
  "Kebabas": [
    { id: 31, name: "Chicken Kebab", description: "Grilled chicken | Spices | Served with salad", image: image30, rating: 5, prices: { Small: 450, Medium: 700, Large: 950 } },
    { id: 32, name: "Beef Kebab", description: "Tender beef | Traditional spices", image: image31, rating: 5, prices: { Small: 500, Medium: 750, Large: 1000 } },
    { id: 33, name: "Mix Grill Kebab", description: "Chicken & beef | Full platter", image: image32, rating: 5, prices: { Small: 600, Medium: 900, Large: 1250 } }
  ],
  "Salads": [
    { id: 41, name: "Caesar Salad", description: "Lettuce | Chicken | Caesar dressing", image: image33, rating: 4, prices: { Small: 300, Medium: 450, Large: 600 } },
    { id: 42, name: "Greek Salad", description: "Feta cheese | Olives | Tomatoes", image: image34, rating: 4, prices: { Small: 350, Medium: 500, Large: 650 } },
    { id: 43, name: "Garden Fresh Salad", description: "Mixed greens | Fresh vegetables", image: image35, rating: 4, prices: { Small: 250, Medium: 400, Large: 550 } }
  ],
  "Cold drinks": [
    { id: 51, name: "Coca Cola", description: "Chilled soft drink", image: image36, rating: 5, prices: { Small: 100, Medium: 150, Large: 200 } },
    { id: 52, name: "Fresh Juice", description: "Mango | Orange | Passion", image: image37, rating: 5, prices: { Small: 150, Medium: 250, Large: 350 } },
    { id: 53, name: "Milkshake", description: "Chocolate | Vanilla | Strawberry", image: image38, rating: 5, prices: { Small: 200, Medium: 300, Large: 400 } }
  ],
  "Happy Mealy": [
    { id: 61, name: "Kids Pizza Meal", description: "Small pizza | Fries | Juice", image: image39, rating: 5, prices: { Small: 450, Medium: 650, Large: 850 } },
    { id: 62, name: "Chicken Nuggets Meal", description: "6pcs nuggets | Fries | Drink", image: image40, rating: 5, prices: { Small: 400, Medium: 600, Large: 800 } },
    { id: 63, name: "Mini Burger Meal", description: "Mini burger | Fries | Toy", image: image41, rating: 4, prices: { Small: 350, Medium: 500, Large: 650 } }
  ],
  "Desserts": [
    { id: 71, name: "Chocolate Cake", description: "Rich chocolate | Creamy frosting", image: image42, rating: 5, prices: { Small: 250, Medium: 400, Large: 550 } },
    { id: 72, name: "Ice Cream Sundae", description: "Vanilla | Chocolate | Toppings", image: image43, rating: 5, prices: { Small: 200, Medium: 350, Large: 500 } },
    { id: 73, name: "Brownie Delight", description: "Warm brownie | Ice cream", image: image44, rating: 5, prices: { Small: 300, Medium: 450, Large: 600 } }
  ],
  "Coffee": [
    { id: 81, name: "Cappuccino", description: "Espresso | Steamed milk | Foam", image: image45, rating: 5, prices: { Small: 180, Medium: 250, Large: 320 } },
    { id: 82, name: "Latte", description: "Smooth espresso | Milk", image: image46, rating: 5, prices: { Small: 200, Medium: 280, Large: 350 } },
    { id: 83, name: "Americano", description: "Strong espresso | Hot water", image: image47, rating: 4, prices: { Small: 150, Medium: 220, Large: 280 } }
  ],
  "Sauces": [
    { id: 91, name: "BBQ Sauce", description: "Smoky and sweet", image: image48, rating: 4, prices: { Small: 50, Medium: 80, Large: 100 } },
    { id: 92, name: "Hot Sauce", description: "Extra spicy | Chili peppers", image: image49, rating: 5, prices: { Small: 50, Medium: 80, Large: 100 } },
    { id: 93, name: "Garlic Mayo", description: "Creamy garlic mayonnaise", image: image50, rating: 5, prices: { Small: 60, Medium: 90, Large: 120 } }
  ],

  "KUKU": [
    { id: 101, name: "Fried Chicken", description: "Crispy fried | 4 pieces", image: image51, rating: 5, prices: { Small: 500, Medium: 800, Large: 1100 } },
    { id: 102, name: "Grilled Chicken", description: "Herb marinated | Tender", image: image52, rating: 5, prices: { Small: 550, Medium: 850, Large: 1150 } },
    { id: 103, name: "Chicken Wings", description: "Spicy buffalo | 8 pieces", image: image53, rating: 5, prices: { Small: 450, Medium: 700, Large: 950 } }
  ]
};

function MHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
  let foundItem = null;

  for (const category in menuItems) {
    const item = menuItems[category].find(
      (menuItem) =>
        menuItem.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    if (item) {
      foundItem = { ...item, outOfOrder: false };
      break;
    }
  }

  if (!foundItem) {
    foundItem = { name: searchQuery, outOfOrder: true };
  }

  setSearchResult(foundItem);
};
const handleOrderClick = () => {
  navigate("/menu"); 
};

  return (
    <section className="m-hero">
      <div className="hero-content">
        <h1 className="hero-title">READY TO SERVE</h1>

        <div className="hero-badges">
          <div className="badge">
            <span className="badge-icon">⏰</span>
            <span>Minimum Order: 12 KSH</span>
          </div>
          <div className="badge">
            <span className="badge-icon">🚚</span>
            <span>Delivery in 20-25 Minutes</span>
          </div>
        </div>

        <div className="hero-rating">
          <div className="rating-stars">⭐⭐⭐⭐☆</div>
          <span className="rating-number">3.4</span>
          <span className="rating-reviews">(1,345 reviews)</span>
        </div>

        <button className="order-button" onClick={handleOrderClick}>
          <span className="order-icon">📋</span>
          Order from US
        </button>
      </div>

      <div className="hero-sidebar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search from menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            🔍
          </button>
        </div>

        {searchResult && (
          <div className="search-result">
            {searchResult.outOfOrder ? (
              <div className="out-of-order">
                {searchResult.name} is currently out of order.
              </div>
            ) : (
              <div className="found-item">
                <img
                  src={searchResult.image}
                  alt={searchResult.name}
                  style={{ width: "80px", marginRight: "10px" }}
                />
                <div>
                  <div><strong>{searchResult.name}</strong></div>
                  <div>{searchResult.description}</div>
                  <div>
                    {Object.entries(searchResult.prices)
                      .map(([size, price]) => `${size}: KSH ${price}`)
                      .join(" | ")}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default MHero;
