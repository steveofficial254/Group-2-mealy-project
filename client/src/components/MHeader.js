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
          <span>Get 5% OFF your first order, <a href="#">Promo: ORDER5</a></span>
        </div>
        <div className="location-info">
          <span>{location}</span>
        </div>
      </div>

      <div className="header-main">
        <Link to="/" className="logo">
          <img src="/signup-illustration.png" alt="MEALY Logo" className="logo-image" />
          <span className="logo-text">MEALY</span>
        </Link>

        <nav className="main-nav">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link active">Browse Menu</Link>
          <Link to="/my-orders" className="nav-link">My Orders</Link>
          {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}
          {userName && (
            <>
              <span style={{ color: '#fff', marginLeft: '20px' }}>{userName}</span>
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