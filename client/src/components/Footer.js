import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-content">
            {/* Logo and App Downloads */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/signup-illustration.png" alt="MEALY Logo" className="footer-logo-img" />
                <span className="footer-logo-text">MEALY</span>
              </div>

              <div className="footer-downloads">
                <a href="#" className="download-btn">
                  App Store
                </a>
                <a href="#" className="download-btn">
                  Google Play
                </a>
              </div>

              <div className="footer-social">
                <a href="#" className="social-link facebook">f</a>
                <a href="#" className="social-link instagram">ig</a>
                <a href="#" className="social-link twitter">tw</a>
                <a href="#" className="social-link snapchat">sc</a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="footer-newsletter">
              <h4 className="footer-heading">Get Exclusive Deals in your Inbox</h4>
              <div className="newsletter-signup">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
              <p className="newsletter-text">
                we wont spam, read our <a href="#">email policy</a>
              </p>
            </div>

            {/* Legal Pages */}
            <div className="footer-column">
              <h4 className="footer-heading">Legal Pages</h4>
              <ul className="footer-list">
                <li><a href="#">Terms and conditions</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Cookies</a></li>
                <li><a href="#">Modern Slavery Statement</a></li>
              </ul>
            </div>

            {/* Important Links */}
            <div className="footer-column">
              <h4 className="footer-heading">Important Links</h4>
              <ul className="footer-list">
                <li><a href="#">Get help</a></li>
                <li><a href="#">Add your restaurant</a></li>
                <li><a href="#">Sign up to deliver</a></li>
                <li><a href="#">Create a business account</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              MEALY Copyright 2024, All Rights Reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="#">Pricing</a>
              <a href="#">Do not sell or share my personal information</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;