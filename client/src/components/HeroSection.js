import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";
import heroImg from "../assets/hero.jpg";

function HeroSection() {
  const [postcode, setPostcode] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
        <p className="hero-subtitle">Order Restaurant food, takeaway and groceries.</p>
        <h1>
          Feast Your Senses,
          <br />
          <span>Fast and Fresh</span>
        </h1>
        <p className="hero-description">
          Enter a postcode to see what we deliver
        </p>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="e.g. EC4R 3TE"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Right Side Order Cards */}
      <div className="hero-right">
        <div className="order-card order-card-1">
          <h3>Order</h3>
          <p>We've received your order!</p>
          <p>Awaiting Restaurant acceptance</p>
        </div>
        <div className="order-card order-card-2">
          <h3>Order Accepted</h3>
          <p>Your order will be delivered shortly</p>
        </div>
        <div className="order-card order-card-3">
          <h3>Your rider's nearby</h3>
          <p>They're almost there - get ready!</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;