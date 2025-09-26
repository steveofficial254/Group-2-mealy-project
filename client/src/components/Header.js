import React, { useState } from "react";
import "../styles/Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const handleNavigation = (tab) => {
    setActiveTab(tab);
  };

  return (
    <header className="header">
      {/* Top Banner */}
      <div className="top-banner">
        <div className="top-banner-container">
          <div className="promo-section">
            <span>⭐</span>
            <span>Get 5% Off your first order, Promo: ORDER5</span>
          </div>
          <div className="location-section">
            <span></span>
            <span>Kimathi Street Nairobi</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-container">
              <div className="logo-text">MEALY</div>
              <div className="logo-badge">ENJOY YOUR MEAL!</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="navigation">
            <button
              onClick={() => handleNavigation("Home")}
              className={`nav-button home ${activeTab === "Home" ? "active" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("Menu")}
              className={`nav-button menu ${activeTab === "Menu" ? "active" : ""}`}
            >
              Menu
            </button>
            <button
              onClick={() => handleNavigation("Admin")}
              className={`nav-button admin ${activeTab === "Admin" ? "active" : ""}`}
            >
              Admin
            </button>
          </nav>

          {/* Spacer */}
          <div className="spacer"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;