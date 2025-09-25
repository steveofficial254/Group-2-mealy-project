import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesHighlights from '../components/FeaturesHighlights';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import '../styles/HomePage.css'; // new file for page-specific styles

const HomePage = () => {
  return (
    <div className="homepage">
      <Header currentPage="home" />
      <main aria-label="Homepage main content">
        <HeroSection />
        <FeaturesHighlights />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;