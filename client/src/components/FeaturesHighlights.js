import React from "react";
import "../styles/FeaturesHighlights.css";

// ---------------- DEALS IMAGES ----------------
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image11 from "../assets/image11.jpg";

// ---------------- CATEGORY IMAGES ----------------
import kenyanPilau from "../assets/image1.jpg";
import nyamaChoma from "../assets/image2.jpg";
import pastaAndCasuals from "../assets/image19.jpg";
import pizza from "../assets/image20.jpg";
import breakfast from "../assets/image5.jpg";
import soups from "../assets/image3.jpg";

// ---------------- RESTAURANT LOGOS ----------------
import mamaKuluLogo from "../assets/image4.jpg";
import nairobiStreetKitchenLogo from "../assets/image5.jpg";
import kfcLogo from "../assets/image16.jpg";
import arzLogo from "../assets/image6.jpg";
import ashokiLogo from "../assets/image7.jpg";
import javaHouseLogo from "../assets/image8.jpg";

// ---------------- PERSONALISED + RIDES ----------------
import image10 from "../assets/image10.jpg";
import image9 from "../assets/image9.jpg";
import image18 from "../assets/image18.jpg";
import image17 from "../assets/image17.jpg";

function FeaturesHighlights() {
  // Deals
  const deals = [
    { id: 1, image: image1, alt: "Sandwich and salad combo deal" },
    { id: 2, image: image2, alt: "Various dishes deal" },
    { id: 3, image: image11, alt: "Burger and fries deal" },
  ];

  const categoriesTabs = ["Legal Fish", "Cuisine", "Pizza & Fast food"];

  // Food Categories
  const categories = [
    { id: 1, name: "Kenyan Pilau", subtitle: "Spiced rice dish", image: kenyanPilau },
    { id: 2, name: "Nyama Choma", subtitle: "Grilled meat special", image: nyamaChoma },
    { id: 3, name: "Pasta & Casuals", subtitle: "Italian favorites", image: pastaAndCasuals },
    { id: 4, name: "Pizza", subtitle: "Fresh & delicious", image: pizza },
    { id: 5, name: "Breakfast", subtitle: "Start your day right", image: breakfast },
    { id: 6, name: "Soups", subtitle: "Warm & comforting", image: soups },
  ];

  // Restaurants
  const restaurants = [
    { id: 1, name: "MAMA KULU", logo: mamaKuluLogo, buttonColor: "#ff6600", buttonText: "MAMA KULU" },
    { id: 2, name: "Nairobi Street Kitchen", logo: nairobiStreetKitchenLogo, buttonColor: "#ff6600", buttonText: "Nairobi Street Kitchen" },
    { id: 3, name: "KFC", logo: kfcLogo, buttonColor: "#DC143C", buttonText: "KFC" },
    { id: 4, name: "ARZ", logo: arzLogo, buttonColor: "#4682B4", buttonText: "ARZ" },
    { id: 5, name: "Ashoki", logo: ashokiLogo, buttonColor: "#000", buttonText: "Ashoki Restaurant" },
    { id: 6, name: "JAVA HOUSE", logo: javaHouseLogo, buttonColor: "#ff6600", buttonText: "JAVA HOUSE" },
  ];

  // Rides
  const rides = [
    { id: 6, image: image10 },
    { id: 9, image: image18 },
    { id: 10, image: image17 },
  ];

  // FAQs
  const faqs = [
    { question: "How does MEALY work?", isActive: true },
    { question: "What payment methods are accepted?", isActive: false },
    { question: "Can I track my order in real-time?", isActive: false },
    { question: "Are there any special discounts or promotional available?", isActive: false },
    { question: "Is Order-UK available in my area?", isActive: false },
  ];

  // Features
  const features = [
    { icon: "📱", title: "Place an Order!", description: "Place order through our website or mobile app" },
    { icon: "🚚", title: "Track Progress", description: "You can track your order status with delivery time" },
    { icon: "✅", title: "Get your Order!", description: "Receive your order at a lightning fast speed!" },
  ];

  return (
    <div className="features-highlights">
      {/* ---------------- DEALS SECTION ---------------- */}
      <section className="deals-section">
        <div className="container">
          <div className="deals-header">
            <h2 className="deals-title">Up to -40% 🎯 MEALY exclusive deals</h2>
            <div className="category-tabs">
              {categoriesTabs.map((cat, index) => (
                <button key={cat} className={`category-tab ${index === 2 ? "active" : ""}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="deals-grid">
            {deals.map((deal) => (
              <div key={deal.id} className="deal-card">
                <img src={deal.image} alt={deal.alt} className="deal-image" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CATEGORIES SECTION ---------------- */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Mealy Popular Categories 😋</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-image-container">
                  <img src={category.image} alt={category.name} className="category-image" />
                </div>
                <div className="category-info">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-subtitle">{category.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- RESTAURANTS SECTION ---------------- */}
      <section className="restaurants-section">
        <div className="container">
          <h2 className="section-title">Popular Restaurants 🍽️</h2>
          <div className="restaurants-grid">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="restaurant-card"
                style={{ backgroundColor: restaurant.buttonColor }}
              >
                <img src={restaurant.logo} alt={`${restaurant.name} logo`} className="restaurant-logo" />
                <h3 className="restaurant-name">{restaurant.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PERSONALISED SECTION ---------------- */}
      <section className="personalised">
        <div className="personalised-container">
          <div className="personalised-image">
            <img src={image9} alt="Personalised Experience" />
          </div>
          <div className="personalised-text">
            <h2>MEALY is more</h2>
            <h2>
              <span className="highlight">Personalised &amp; Instant</span>
            </h2>
            <div className="store-buttons">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="store-btn">
                <i className="fab fa-google-play"></i> Google Play
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="store-btn">
                <i className="fab fa-apple"></i> App Store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- RIDES SECTION ---------------- */}
      <section className="rides">
        <div className="rides-gallery">
          {rides.map((ride) => (
            <div key={ride.id} className="ride-card">
              <img src={ride.image} alt={`Ride ${ride.id}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">Know more about us!</h2>
          <div className="about-content">
            <div className="faq-section">
              <div className="faq-tabs">
                <button className="tab active">Frequent Questions</button>
                <button className="tab">Who we are?</button>
                <button className="tab">Partner Program</button>
                <button className="tab">Help & Support</button>
              </div>

              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className={`faq-item ${faq.isActive ? "active" : ""}`}>
                    <div className="faq-question">
                      {faq.question}
                      <span className="faq-icon">{faq.isActive ? "−" : "+"}</span>
                    </div>
                    {faq.isActive && (
                      <div className="faq-answer">
                        <p>When payment methods are accepted?</p>
                        <p>Can I track my order in real-time?</p>
                        <p>Are there any special discounts or promotional available?</p>
                        <p>Is Order-UK available in my area?</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="features-section">
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="features-description">
                <p>
                  MEALY simplifies the food ordering process. Browse through our diverse menus,
                  select your favorite dishes, and proceed to checkout. Your delicious meal will be
                  on its way to your doorstep in no time!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeaturesHighlights;
