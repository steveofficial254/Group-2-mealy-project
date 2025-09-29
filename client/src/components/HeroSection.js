import React, { useState } from "react";
import "../styles/HeroSection.css";
import heroImg from "../assets/hero.jpg";

function HeroSection() {
  const [postcode, setPostcode] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (postcode.trim()) {
      setSearchResult(`Showing results for "${postcode}"`);
      console.log("Searching for:", postcode);
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
        <h1>
          Feast Your Senses,
          <span>Fast and Fresh</span>
        </h1>
        <p>
          Order restaurant food, takeaway, and groceries delivered right to your door.
        </p>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter a postcode to see what we deliver"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
          <button type="submit" aria-label="Search for delivery options">
            Search
          </button>
        </form>

        {/* Search result message */}
        {searchResult && <p className="search-result">{searchResult}</p>}
      </div>

      {/* Right Side Order Cards */}
      <div className="hero-right">
        <div className="order-card order-card-1">
          <h3>Order</h3>
          <p>We've received your order! Awaiting restaurant acceptance 🎉</p>
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
