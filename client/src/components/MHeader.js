import React, { useState } from "react";
import "../styles/MHeader.css";
import { Link } from "react-router-dom";

function MHeader() {
  const [location, setLocation] = useState("Nairobi, Kenya");

  return (
    <header className="m-header">
      <div className="header-top">
        <div className="delivery-info">
          <span className="delivery-icon"></span>
          <span>Get 25.00 OFF your first order, <a href="#">Promo: ORDER25</a></span>
        </div>
        <div className="location-info">
          <span className="location-icon"></span>
          <span>{location}</span>
        </div>
      </div>
      
      <div className="header-main">
        <Link to="/" className="logo">
          <span className="logo-icon"></span>
          <span className="logo-text">MEALY</span>
        </Link>
        
        <nav className="main-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link active">Menu</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

export default MHeader;