import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Home");

  // Update active tab based on current route
  React.useEffect(() => {
    if (location.pathname === "/menu") {
      setActiveTab("Menu");
    } else if (location.pathname === "/admin") {
      setActiveTab("Admin");
    } else {
      setActiveTab("Home");
    }
  }, [location.pathname]);

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
          <Link 
            to="/menu" 
            className={`nav-button menu ${activeTab === "Menu" ? "active" : ""}`}
          >
            Menu
          </Link>

          <Link 
            to="/admin" 
            className={`nav-button admin ${activeTab === "Admin" ? "active" : ""}`}
          >
            Admin
          </Link>

          {/* Spacer */}
          <div className="spacer"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;