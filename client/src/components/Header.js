import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (location.pathname === "/menu") {
      setActiveTab("Menu");
    } else if (location.pathname === "/admin") {
      setActiveTab("Admin");
    } else {
      setActiveTab("Home");
    }

    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.full_name || user.name || '');
        setIsAdmin(user.role === 'admin');
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
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
          {/* Logo - Click to go home */}
          <div className="logo-section" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
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
            to="/my-orders"
            className={`nav-button ${activeTab === "Orders" ? "active" : ""}`}
          >
            My Orders
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className={`nav-button admin ${activeTab === "Admin" ? "active" : ""}`}
            >
              Admin
            </Link>
          )}

          <div className="spacer"></div>

          {userName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#333', fontWeight: '500' }}>
                {userName}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  background: '#EB5C5C',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;