import { Star, Clock, Truck } from "lucide-react";
import heroImage from "../assets/hero-bg.jpg";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          {/* Left Content */}
          <div className="hero-text">
            <div>
              <h1 className="hero-title">
                <span>Feast Your</span>
                <br />
                <span className="primary">Senses,</span>
                <br />
                <span>Fast and</span>
                <br />
                <span className="primary">Fresh</span>
              </h1>
              <p className="hero-description">
                Delicious meals delivered to your doorstep in 30 minutes or less.
                Experience the perfect blend of taste, speed, and convenience.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button className="hero-button-primary">Order Now</button>
              <button className="hero-button-secondary">View Menu</button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-icon">
                  <Star size={20} fill="currentColor" />
                </div>
                <div className="hero-stat-text">
                  <div className="title">4.8 Rating</div>
                  <div className="subtitle">2000+ Reviews</div>
                </div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-icon">
                  <Clock size={20} />
                </div>
                <div className="hero-stat-text">
                  <div className="title">30 Min</div>
                  <div className="subtitle">Delivery</div>
                </div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-icon">
                  <Truck size={20} />
                </div>
                <div className="hero-stat-text">
                  <div className="title">Free</div>
                  <div className="subtitle">Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="hero-image">
            <div>
              <img
                src={heroImage}
                alt="Delicious food assortment"
                className="hero-main-image"
              />

              {/* Floating Cards */}
              <div className="hero-floating-card top-left">
                <div className="floating-card-content">
                  <div className="floating-card-icon success">
                    <Star size={16} fill="currentColor" />
                  </div>
                  <div className="floating-card-text">
                    <div className="title">Top Rated</div>
                    <div className="subtitle">Best Quality</div>
                  </div>
                </div>
              </div>

              <div className="hero-floating-card bottom-right">
                <div className="floating-card-content">
                  <div className="floating-card-icon primary">
                    <Clock size={16} />
                  </div>
                  <div className="floating-card-text">
                    <div className="title">Fast Delivery</div>
                    <div className="subtitle">30 min max</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="hero-decoration top-right"></div>
      <div className="hero-decoration bottom-left"></div>
      <div className="hero-decoration center-right"></div>
    </section>
  );
};

export default HeroSection;