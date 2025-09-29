import React, { useState } from "react";
import "../styles/MFooter.css";

function MFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="m-footer">
      <div className="footer-content">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <h3>Get Exclusive Deals in your Inbox</h3>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          <p className="spam-notice">
            we won't spam, read our <a href="#">email policy</a>
          </p>
          
          {/* Social Media Icons */}
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
            <a href="#" aria-label="Snapchat"><i className="fab fa-snapchat"></i></a>
          </div>
        </div>

        {/* Legal Pages */}
        <div className="footer-links">
          <h4>Legal Pages</h4>
          <ul>
            <li><a href="#">Terms and conditions</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Modern Slavery Statement</a></li>
          </ul>
        </div>

        {/* Important Links */}
        <div className="footer-links">
          <h4>Important Links</h4>
          <ul>
            <li><a href="#">Get help</a></li>
            <li><a href="#">Add your restaurant</a></li>
            <li><a href="#">Sign up to deliver</a></li>
            <li><a href="#">Create a business account</a></li>
          </ul>
        </div>
      </div>

      {/* App Store Buttons */}
      <div className="footer-apps">
        <a href="#" className="app-store-btn">
          <i className="fab fa-apple"></i>
          <div>
            <span>Download on the</span>
            <strong>App Store</strong>
          </div>
        </a>
        <a href="#" className="play-store-btn">
          <i className="fab fa-google-play"></i>
          <div>
            <span>GET IT ON</span>
            <strong>Google Play</strong>
          </div>
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>MEALY Copyright 2024, All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Pricing</a>
          <a href="#">Do not sell or share my personal information</a>
        </div>
      </div>
    </footer>
  );
}

export default MFooter;