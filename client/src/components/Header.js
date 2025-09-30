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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span>Get 5% Off your first order, Promo: ORDER5</span>
          </div>
          <div className="location-section">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Kimathi Street Nairobi</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-image">
              {/* Replace this div with your actual logo image */}
           
            </div>
            <div className="logo-text-container">
              <div className="logo-title">MEALY</div>
              <div className="logo-badge">
                <span>ENJOY YOUR MEAL!</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="navigation">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
            >
              Menu
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
            >
              admin
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;