import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
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
            <NavLink
              to="/"
              className={({ isActive }) => `nav-button home ${isActive ? "active" : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) => `nav-button menu ${isActive ? "active" : ""}`}
            >
              Menu
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => `nav-button admin ${isActive ? "active" : ""}`}
            >
              Admin
            </NavLink>
          </nav>

          {/* Spacer */}
          <div className="spacer"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;