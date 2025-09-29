import React from "react";
import "../styles/MHero.css";

function MHero() {
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
          <div className="rating-stars">
            ⭐⭐⭐⭐☆
          </div>
          <span className="rating-number">3.4</span>
          <span className="rating-reviews">(1,345 reviews)</span>
        </div>
        
        <button className="order-button">
          <span className="order-icon">📋</span>
          Order from US
        </button>
      </div>
      
      <div className="hero-sidebar">
        <div className="search-box">
          <input type="text" placeholder="Search from menu..." />
          <button className="search-btn">🔍</button>
        </div>
      </div>
    </section>
  );
}

export default MHero;