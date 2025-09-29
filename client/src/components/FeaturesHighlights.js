import React from 'react';
import { 
  Pizza, 
  Sandwich, 
  Salad, 
  Coffee,
  IceCream,
  Fish,
  Star,
  Clock,
  MapPin
} from 'lucide-react';
import '../styles/FeaturesHighlights.css'; 

const FeaturesHighlights = () => {
  const categories = [
    {
      name: "Burgers",
      icon: Sandwich,
      color: "warm",
      description: "Juicy & Fresh"
    },
    {
      name: "Pizza",
      icon: Pizza,
      color: "warm", 
      description: "Hot & Crispy"
    },
    {
      name: "Salads",
      icon: Salad,
      color: "fresh",
      description: "Healthy & Fresh"
    },
    {
      name: "Sushi",
      icon: Fish,
      color: "fresh",
      description: "Premium Quality"
    },
    {
      name: "Desserts",
      icon: IceCream,
      color: "dessert",
      description: "Sweet & Delicious"
    },
    {
      name: "Beverages",
      icon: Coffee,
      color: "warm",
      description: "Hot & Cold"
    }
  ];

  const restaurants = [
    {
      name: "McDonald's",
      logo: "🍟",
      rating: 4.5,
      deliveryTime: "20-30 min",
      cuisine: "Fast Food",
      distance: "0.5 km",
      status: "Open"
    },
    {
      name: "KFC",
      logo: "🍗",
      rating: 4.3,
      deliveryTime: "25-35 min", 
      cuisine: "Fried Chicken",
      distance: "1.2 km",
      status: "Open"
    },
    {
      name: "Pizza Hut",
      logo: "🍕",
      rating: 4.6,
      deliveryTime: "30-40 min",
      cuisine: "Italian",
      distance: "0.8 km", 
      status: "Open"
    },
    {
      name: "Subway",
      logo: "🥪",
      rating: 4.4,
      deliveryTime: "15-25 min",
      cuisine: "Sandwiches",
      distance: "0.3 km",
      status: "Open"
    },
    {
      name: "Domino's",
      logo: "🍕",
      rating: 4.2,
      deliveryTime: "25-35 min",
      cuisine: "Pizza",
      distance: "1.0 km",
      status: "Busy"
    },
    {
      name: "Starbucks",
      logo: "☕",
      rating: 4.7,
      deliveryTime: "10-20 min",
      cuisine: "Coffee & Snacks", 
      distance: "0.4 km",
      status: "Open"
    }
  ];

  return (
    <>
      {/* Food Categories Section */}
      <section className="features categories">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Mealy Popular <span className="primary">Categories</span>
            </h2>
            <p className="features-description">
              Discover our most loved food categories, carefully curated to satisfy every craving
            </p>
          </div>

          <div className="features-grid categories">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={category.name}
                  className={`feature-card ${category.color}`}
                >
                  <div className="feature-card-content">
                    <div className="feature-icon">
                      <div className="feature-icon-bg">
                        <IconComponent size={32} />
                      </div>
                    </div>
                    <h3 className="feature-title">{category.name}</h3>
                    <p className="feature-description">{category.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="features-link">
            <button className="features-link-button">
              View All Categories →
            </button>
          </div>
        </div>
      </section>

      {/* Popular Restaurants Section */}
      <section className="features">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Popular <span className="primary">Restaurants</span>
            </h2>
            <p className="features-description">
              Your favorite restaurants are just a click away. Fast delivery, great taste!
            </p>
          </div>

          <div className="features-grid restaurants">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="feature-card">
                <div className="feature-card-content restaurant">
                  <div className="restaurant-header">
                    <div className="restaurant-info">
                      <div className="restaurant-logo">{restaurant.logo}</div>
                      <div className="restaurant-details">
                        <h3 className="name">{restaurant.name}</h3>
                        <p className="cuisine">{restaurant.cuisine}</p>
                      </div>
                    </div>
                    <div className={`restaurant-badge ${restaurant.status.toLowerCase()}`}>
                      {restaurant.status}
                    </div>
                  </div>

                  <div className="restaurant-stats">
                    <div className="restaurant-stat">
                      <div className="restaurant-stat-left">
                        <Star className="icon rating-icon" size={16} fill="currentColor" />
                        <span className="text">{restaurant.rating}</span>
                        <span className="subtext">(500+ reviews)</span>
                      </div>
                    </div>
                    
                    <div className="restaurant-stat">
                      <div className="restaurant-stat-left">
                        <Clock className="icon" size={16} />
                        <span className="text">{restaurant.deliveryTime}</span>
                      </div>
                      <div className="restaurant-stat-right">
                        <MapPin size={16} />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>

                    <div className="restaurant-delivery">
                      <div className="restaurant-delivery-info">
                        <span className="label">Delivery Fee</span>
                        <span className="value">Free</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="features-link">
            <button className="features-link-button">
              View All Restaurants →
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesHighlights;