import React, { useState } from "react";
import "../styles/MHero.css";

function MHero({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="m-hero">
      <div className="hero-content">
        <h1 className="hero-title">Your Daily Food Ordering Made Simple</h1>
        <h2 className="hero-subtitle">CONNECT WITH LOCAL CATERERS</h2>

        <p className="hero-description">
          Mealy is a food-ordering platform that connects customers with caterers.
          Easily select meals from daily menus while caterers manage meal options,
          set daily menus, and track sales and orders. Experience transparency,
          efficiency, and a smooth ordering process.
        </p>

        <div className="hero-badges">
          <div className="badge">
            <span>Daily Fresh Menus</span>
          </div>
          <div className="badge">
            <span>Easy Order Tracking</span>
          </div>
        </div>
      </div>

      <div className="hero-sidebar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search from menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </section>
  );
}

export default MHero;