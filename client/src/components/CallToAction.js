import React from 'react';
import '../styles/CallToAction.css';
     

const CallToAction = () => {
  return (
    <section className="cta">
      <div className="cta-container">
        
        {/* Left Content */}
        <div className="cta-text">
          <h2 className="cta-title">
            Get the <span className="primary">MEALY</span> App
          </h2>
          <p className="cta-description">
            Order faster, track your delivery in real-time, and enjoy exclusive app-only offers. 
            Download now and get <strong>20% off</strong> your first order!
          </p>

          {/* Download Buttons */}
          <div className="cta-buttons">
            <a href="#ios" className="store-badge">
             
            </a>
            <a href="#android" className="store-badge">
             
            </a>
          </div>
        </div>

        {/* Right Content - Phone Mockup */}
        <div className="cta-mockup">
          
        </div>
      </div>
    </section>
  );
};

export default CallToAction;