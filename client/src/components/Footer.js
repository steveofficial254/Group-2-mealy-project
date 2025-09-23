import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import logoImage from '../assets/logo.png';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <img 
              src={logoImage} 
              alt="MEALY logo" 
              className="footer-logo"
            />
            <p className="footer-description">
              Delicious meals delivered to your doorstep. Fast, fresh, and always satisfying.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Home</a>
              <a href="#" className="footer-link">Menu</a>
              <a href="#" className="footer-link">Restaurants</a>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <div className="footer-links">
              <a href="#" className="footer-link">Food Delivery</a>
              <a href="#" className="footer-link">Catering</a>
              <a href="#" className="footer-link">Corporate Orders</a>
              <a href="#" className="footer-link">Gift Cards</a>
              <a href="#" className="footer-link">Loyalty Program</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <MapPin className="footer-contact-icon" size={20} />
                <span className="footer-contact-text">
                  123 Food Street, City, State 12345
                </span>
              </div>
              <div className="footer-contact-item">
                <Phone className="footer-contact-icon" size={20} />
                <span className="footer-contact-text">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="footer-contact-item">
                <Mail className="footer-contact-icon" size={20} />
                <span className="footer-contact-text">
                  hello@mealy.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2024 MEALY. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#" className="footer-legal-link">Privacy Policy</a>
              <a href="#" className="footer-legal-link">Terms of Service</a>
              <a href="#" className="footer-legal-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;