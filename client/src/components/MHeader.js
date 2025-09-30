import React, { useState, useEffect } from "react";
import "../styles/MHeader.css";
import { Link, useNavigate } from "react-router-dom";

function MHeader() {
  const [location, setLocation] = useState("Nairobi, Kenya");
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

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
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link active">Menu</Link>
          <Link to="/my-orders" className="nav-link">My Orders</Link>
          {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}
          {userName && (
            <>
              <span style={{ color: '#333', marginLeft: '20px' }}>{userName}</span>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: '10px',
                  padding: '6px 14px',
                  background: '#EB5C5C',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default MHeader;