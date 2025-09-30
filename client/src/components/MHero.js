import React from "react";
import "../styles/MHero.css";

function MHero() {
  return (
    <section className="m-hero">
      <div className="hero-content">
        <h1 className="hero-title">TODAY'S MENU</h1>

        <div className="hero-badges">
          <div className="badge">
            <span className="badge-icon">⏰</span>
            <span>Order Cutoff: 10:00 AM</span>
          </div>
          <div className="badge">
            <span className="badge-icon">🍽️</span>
            <span>Fresh Daily Meals</span>
          </div>
        </div>

        <div className="hero-rating">
          <div className="rating-stars">
            ⭐⭐⭐⭐⭐
          </div>
          <span className="rating-number">4.8</span>
          <span className="rating-reviews">(245 reviews)</span>
        </div>

        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.95rem' }}>
          Pre-order your meal from our daily selection
        </p>
      </div>

      <div className="hero-sidebar">
        <div className="search-box">
          <input type="text" placeholder="Search menu items..." />
          <button className="search-btn">🔍</button>
        </div>
      </div>
    </section>
  );
}

export default MHero;