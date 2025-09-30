import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "../services/api";
import PaymentModal from "./PaymentModal";
import "../styles/MFeatures.css";

// Import images
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import image16 from "../assets/image16.jpg";
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

function MFeatures() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Pizzas");
  const [basketItems, setBasketItems] = useState([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState(null);

  // Menu data for all categories
  const menuData = {
    "Pizzas": [
      {
        id: 1,
        name: "Farmhouse Xtreme Pizza",
        description: "Mozzarella | Big size | 6 slices",
        image: image21,
        rating: 5,
        prices: { Small: 650, Medium: 950, Large: 1250 }
      },
      {
        id: 2,
        name: "Deluxe Pizza",
        description: "Mozzarella | Big size | 6 slices",
        image: image22,
        rating: 5,
        prices: { Small: 700, Medium: 1000, Large: 1300 }
      },
      {
        id: 3,
        name: "Tandoori Pizza",
        description: "Tandoori chicken | Spicy | 8 slices",
        image: image23,
        rating: 5,
        prices: { Small: 750, Medium: 1100, Large: 1400 }
      }
    ],
    "Garlic Bread": [
      {
        id: 11,
        name: "Classic Garlic Bread",
        description: "Fresh baked | Butter & herbs",
        image: image24,
        rating: 4,
        prices: { Small: 250, Medium: 400, Large: 550 }
      },
      {
        id: 12,
        name: "Cheese Garlic Bread",
        description: "Loaded with mozzarella cheese",
        image: image25,
        rating: 5,
        prices: { Small: 350, Medium: 500, Large: 650 }
      },
      {
        id: 13,
        name: "Stuffed Garlic Bread",
        description: "Cheese & jalapeno stuffed",
        image: image26,
        rating: 4,
        prices: { Small: 400, Medium: 600, Large: 750 }
      }
    ],
    "Calzone": [
      {
        id: 21,
        name: "Chicken Calzone",
        description: "Grilled chicken | Cheese | Veggies",
        image: image27,
        rating: 5,
        prices: { Small: 550, Medium: 850, Large: 1150 }
      },
      {
        id: 22,
        name: "Veggie Calzone",
        description: "Mixed vegetables | Mozzarella",
        image: image28,
        rating: 4,
        prices: { Small: 500, Medium: 800, Large: 1050 }
      },
      {
        id: 23,
        name: "BBQ Beef Calzone",
        description: "BBQ beef | Onions | Cheese",
        image: image29,
        rating: 5,
        prices: { Small: 600, Medium: 900, Large: 1200 }
      }
    ],
    "Kebabas": [
      {
        id: 31,
        name: "Chicken Kebab",
        description: "Grilled chicken | Spices | Served with salad",
        image: image30,
        rating: 5,
        prices: { Small: 450, Medium: 700, Large: 950 }
      },
      {
        id: 32,
        name: "Beef Kebab",
        description: "Tender beef | Traditional spices",
        image: image31,
        rating: 5,
        prices: { Small: 500, Medium: 750, Large: 1000 }
      },
      {
        id: 33,
        name: "Mix Grill Kebab",
        description: "Chicken & beef | Full platter",
        image: image32,
        rating: 5,
        prices: { Small: 600, Medium: 900, Large: 1250 }
      }
    ],
    "Salads": [
      {
        id: 41,
        name: "Caesar Salad",
        description: "Lettuce | Chicken | Caesar dressing",
        image: image33,
        rating: 4,
        prices: { Small: 300, Medium: 450, Large: 600 }
      },
      {
        id: 42,
        name: "Greek Salad",
        description: "Feta cheese | Olives | Tomatoes",
        image: image34,
        rating: 4,
        prices: { Small: 350, Medium: 500, Large: 650 }
      },
      {
        id: 43,
        name: "Garden Fresh Salad",
        description: "Mixed greens | Fresh vegetables",
        image: image35,
        rating: 4,
        prices: { Small: 250, Medium: 400, Large: 550 }
      }
    ],
    "Cold drinks": [
      {
        id: 51,
        name: "Coca Cola",
        description: "Chilled soft drink",
        image: image36,
        rating: 5,
        prices: { Small: 100, Medium: 150, Large: 200 }
      },
      {
        id: 52,
        name: "Fresh Juice",
        description: "Mango | Orange | Passion",
        image: image37,
        rating: 5,
        prices: { Small: 150, Medium: 250, Large: 350 }
      },
      {
        id: 53,
        name: "Milkshake",
        description: "Chocolate | Vanilla | Strawberry",
        image: image38,
        rating: 5,
        prices: { Small: 200, Medium: 300, Large: 400 }
      }
    ],
    "Happy Mealy": [
      {
        id: 61,
        name: "Kids Pizza Meal",
        description: "Small pizza | Fries | Juice",
        image: image39,
        rating: 5,
        prices: { Small: 450, Medium: 650, Large: 850 }
      },
      {
        id: 62,
        name: "Chicken Nuggets Meal",
        description: "6pcs nuggets | Fries | Drink",
        image: image40,
        rating: 5,
        prices: { Small: 400, Medium: 600, Large: 800 }
      },
      {
        id: 63,
        name: "Mini Burger Meal",
        description: "Mini burger | Fries | Toy",
        image: image41,
        rating: 4,
        prices: { Small: 350, Medium: 500, Large: 650 }
      }
    ],
    "Desserts": [
      {
        id: 71,
        name: "Chocolate Cake",
        description: "Rich chocolate | Creamy frosting",
        image: image42,
        rating: 5,
        prices: { Small: 250, Medium: 400, Large: 550 }
      },
      {
        id: 72,
        name: "Ice Cream Sundae",
        description: "Vanilla | Chocolate | Toppings",
        image: image43,
        rating: 5,
        prices: { Small: 200, Medium: 350, Large: 500 }
      },
      {
        id: 73,
        name: "Brownie Delight",
        description: "Warm brownie | Ice cream",
        image: image44,
        rating: 5,
        prices: { Small: 300, Medium: 450, Large: 600 }
      }
    ],
    "Coffee": [
      {
        id: 81,
        name: "Cappuccino",
        description: "Espresso | Steamed milk | Foam",
        image: image45,
        rating: 5,
        prices: { Small: 180, Medium: 250, Large: 320 }
      },
      {
        id: 82,
        name: "Latte",
        description: "Smooth espresso | Milk",
        image: image46,
        rating: 5,
        prices: { Small: 200, Medium: 280, Large: 350 }
      },
      {
        id: 83,
        name: "Americano",
        description: "Strong espresso | Hot water",
        image: image47,
        rating: 4,
        prices: { Small: 150, Medium: 220, Large: 280 }
      }
    ],
    "Sauces": [
      {
        id: 91,
        name: "BBQ Sauce",
        description: "Smoky and sweet",
        image: image48,
        rating: 4,
        prices: { Small: 50, Medium: 80, Large: 100 }
      },
      {
        id: 92,
        name: "Hot Sauce",
        description: "Extra spicy | Chili peppers",
        image: image49,
        rating: 5,
        prices: { Small: 50, Medium: 80, Large: 100 }
      },
      {
        id: 93,
        name: "Garlic Mayo",
        description: "Creamy garlic mayonnaise",
        image: image50,
        rating: 5,
        prices: { Small: 60, Medium: 90, Large: 120 }
      }
    ],
    "KUKU": [
      {
        id: 101,
        name: "Fried Chicken",
        description: "Crispy fried | 4 pieces",
        image: image51,
        rating: 5,
        prices: { Small: 500, Medium: 800, Large: 1100 }
      },
      {
        id: 102,
        name: "Grilled Chicken",
        description: "Herb marinated | Tender",
        image: image52,
        rating: 5,
        prices: { Small: 550, Medium: 850, Large: 1150 }
      },
      {
        id: 103,
        name: "Chicken Wings",
        description: "Spicy buffalo | 8 pieces",
        image: image53,
        rating: 5,
        prices: { Small: 450, Medium: 700, Large: 950 }
      }
    ]
  };

  const categories = [
    "Pizzas", "Garlic Bread", "Calzone", "Kebabas", "Salads", 
    "Cold drinks", "Happy Mealy", "Desserts", "Coffee", "Sauces", "KUKU"
  ];

  const currentMenuItems = menuData[activeCategory] || [];

  const addToBasket = (item, size) => {
    const newItem = {
      dish_id: item.id,
      name: `${item.name} (${size})`,
      price: item.prices[size],
      quantity: 1,
      size
    };
    setBasketItems([...basketItems, newItem]);
  };

  const removeFromBasket = (index) => {
    const newBasket = basketItems.filter((_, i) => i !== index);
    setBasketItems(newBasket);
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please sign in to place an order');
      navigate('/signin');
      return;
    }

    if (basketItems.length === 0) {
      alert('Your basket is empty');
      return;
    }

    const orderData = {
      daily_menu_id: 1,
      items: basketItems.map(item => ({
        dish_id: item.dish_id,
        qty: item.quantity
      }))
    };

    setPendingOrderData(orderData);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = async (paymentInfo) => {
    setIsOrdering(true);

    try {
      await orderAPI.placeOrder(pendingOrderData);
      alert(`Payment successful via ${paymentInfo.method}! Order placed.`);
      setBasketItems([]);
      setPendingOrderData(null);
      navigate('/my-orders');
    } catch (error) {
      console.error('Order failed:', error);
      alert(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsOrdering(false);
    }
  };

  const subtotal = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const deliveryFee = 400;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="m-features-container">
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderTotal={total}
        onPaymentComplete={handlePaymentComplete}
      />
      <div className="features-layout">
        {/* Sidebar Menu */}
        <aside className="menu-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-icon">📋</span>
            <h2>Menu</h2>
          </div>
          <ul className="menu-categories">
            {categories.map((category) => (
              <li 
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="menu-main">
          <div className="category-header">
            <h2>{activeCategory}</h2>
          </div>

          <div className="menu-grid">
            {currentMenuItems.map((item) => (
              <div key={item.id} className="menu-item-card">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <div className="item-rating">
                    {"⭐".repeat(item.rating)}
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-sizes">
                    {Object.entries(item.prices).map(([size, price]) => (
                      <button 
                        key={size} 
                        className="size-btn"
                        onClick={() => addToBasket(item, size)}
                      >
                        {size} - {price} KSH
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Basket Sidebar */}
        <aside className="basket-sidebar">
          <div className="basket-header">
            <span className="basket-icon">🛒</span>
            <h2>My Basket</h2>
          </div>

          <div className="basket-items">
            {basketItems.length === 0 ? (
              <p className="empty-basket">Your basket is empty</p>
            ) : (
              basketItems.map((item, index) => (
                <div key={index} className="basket-item">
                  <div className="basket-item-header">
                    <span className="item-quantity">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromBasket(index)}
                    >
                      🗑️
                    </button>
                  </div>
                  {item.toppings && (
                    <p className="item-toppings">{item.toppings}</p>
                  )}
                  <div className="item-price-edit">
                    <span className="item-price">{item.price} KSH</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="basket-summary">
            <div className="summary-row">
              <span>Sub Total:</span>
              <span>KSH {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row discount">
              <span>Discounts:</span>
              <span>-{discount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>{deliveryFee}</span>
            </div>
          </div>

          <div className="basket-total">
            <span>Total:</span>
            <span>KSH {total.toFixed(2)}</span>
          </div>

          <div className="basket-actions">
            <button className="choose-free-item">
              <span>🎁</span>
              Choose your free item...
            </button>
            <button className="apply-coupon">
              <span>🎫</span>
              Apply Coupon Code here
            </button>
          </div>

          <div className="delivery-options">
            <button className="delivery-btn active">
              <span>🚚</span>
              <div>
                <strong>Delivery</strong>
                <small>Starts at 17:50</small>
              </div>
            </button>
            <button className="delivery-btn">
              <span>🏪</span>
              <div>
                <strong>Collection</strong>
                <small>Starts at 16:50</small>
              </div>
            </button>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={isOrdering || basketItems.length === 0}
            style={{ opacity: (isOrdering || basketItems.length === 0) ? 0.5 : 1 }}
          >
            <span>✅</span>
            {isOrdering ? 'Placing Order...' : 'Checkout!'}
          </button>
        </aside>
      </div>

      {/* Info Cards Section */}
      <section className="info-cards-section">
        <div className="info-card">
          <div className="info-card-icon">📍</div>
          <h3>Delivery Information</h3>
          <div className="info-times">
            <div className="time-row">
              <strong>Monday:</strong> 12:00 AM-3:00 AM, 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Tuesday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Wednesday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Thursday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Friday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Saturday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Sunday:</strong> 8:00 AM-12:00 AM
            </div>
            <div className="time-row">
              <strong>Estimated time until delivery:</strong> 20 min
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-icon">📞</div>
          <h3>Contact Information</h3>
          <p>If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.</p>
          <div className="contact-details">
            <strong>Phone number</strong>
            <p>+934443-43</p>
            <strong>Website</strong>
            <p>http://mcdonalds.uk/</p>
          </div>
        </div>

        <div className="info-card dark">
          <div className="info-card-icon">⏰</div>
          <h3>Operational Times</h3>
          <div className="info-times light">
            <div className="time-row">
              <strong>Monday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Tuesday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Wednesday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Thursday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Friday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Saturday:</strong> 8:00 AM-3:00 AM
            </div>
            <div className="time-row">
              <strong>Sunday:</strong> 8:00 AM-3:00 AM
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          <div className="review-nav">
            <button className="nav-arrow">←</button>
            <button className="nav-arrow">→</button>
          </div>
        </div>
        
        <div className="reviews-grid">
          <div className="review-card">
            <div className="reviewer-info">
              <div className="reviewer-avatar">ST</div>
              <div>
                <strong>St Glx</strong>
                <p>Uravu</p>
              </div>
              <div className="review-date">
                <span>⭐⭐⭐⭐⭐</span>
                <small>24th September, 2025</small>
              </div>
            </div>
            <p className="review-text">
              The positive aspect was undoubtedly the efficiency of the service. 
              The queue moved quickly, the staff was friendly, and the food was 
              up to its usual standard - hot and satisfying.
            </p>
          </div>

          <div className="review-card">
            <div className="reviewer-info">
              <div className="reviewer-avatar">NJ</div>
              <div>
                <strong>Nr Jin</strong>
                <p>U'itishu</p>
              </div>
              <div className="review-date">
                <span>⭐⭐⭐⭐⭐</span>
                <small>24th September, 2025</small>
              </div>
            </div>
            <p className="review-text">
              The positive aspect was undoubtedly the efficiency of the service. 
              The queue moved quickly, the staff was friendly, and the food was 
              up to its usual standard - hot and satisfying.
            </p>
          </div>
        </div>

        <div className="overall-rating">
          <div className="rating-badge">
            <span className="rating-number">3.4</span>
            <div className="rating-stars">⭐⭐⭐⭐☆</div>
            <span className="rating-count">1,345 reviews</span>
          </div>
        </div>
      </section>

      {/* Similar Restaurants */}
      <section className="similar-restaurants">
        <h2>Similar Restaurants</h2>
        <div className="restaurants-grid">
          <div className="restaurant-card">
            <img src={image4} alt="Mama Kulu" />
            <div className="restaurant-name">MAMA KULU</div>
          </div>
          <div className="restaurant-card">
            <img src={image5} alt="Nairobi Street Kitchen" />
            <div className="restaurant-name">Nairobi Street Kitchen</div>
          </div>
          <div className="restaurant-card">
            <img src={image16} alt="KFC" />
            <div className="restaurant-name">KFC Nairobi</div>
          </div>
          <div className="restaurant-card">
            <img src={image6} alt="Araki" />
            <div className="restaurant-name">Araki</div>
          </div>
          <div className="restaurant-card">
            <img src={image7} alt="Ashaki Restaurant" />
            <div className="restaurant-name">Ashaki Restaurant</div>
          </div>
          <div className="restaurant-card">
            <img src={image8} alt="Java House" />
            <div className="restaurant-name">JAVA HOUSE</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MFeatures;