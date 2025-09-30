import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";
import heroImg from "../assets/hero.jpg";

function HeroSection() {
  const [postcode, setPostcode] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (postcode.trim()) {
      console.log("Searching for:", postcode);
      navigate('/menu');
    }
  };

  return (
    <section className="hero">
      {/* Background Image Container */}
      <div className="hero-bg">
        <img src={heroImg} alt="Delicious food delivery" />
      </div>

      {/* Left Side Content */}
      <div className="hero-left">
        {userName && (
          <p className="welcome-text" style={{
            fontSize: '1.2rem',
            color: '#2d3748',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            Welcome back, {userName}!
          </p>
        )}

        <h1>
          Order Your Daily Meal
          <span>Fresh & Convenient</span>
        </h1>
        <p>
          Pre-order your meals from our daily menu. Quick, easy, and delicious meals ready when you need them.
        </p>

        {/* Browse Menu Button */}
        <div className="hero-cta">
          <button
            className="signup-btn"
            onClick={() => navigate('/menu')}
            style={{ marginTop: '2rem' }}
          >
            View Today's Menu
          </button>
        </div>
      </div>

      {/* Right Side Order Cards */}
      <div className="hero-right">
        <div className="order-card order-card-1">
          <h3>Order</h3>
          <p>We've received your order!
            Awaiting restaurant acceptance
             🎉</p>
        </div>
        <div className="order-card order-card-2">
          <h3>Order Accepted</h3>
          <p>Your order will be delivered shortly</p>
        </div>
        <div className="order-card order-card-3">
          <h3>Your rider's nearby 🚴</h3>
          <p>They're almost there – get ready!</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;