import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesHighlights from "../components/FeaturesHighlights";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      {/* Header */}
      

      {/* Hero Section */}
      <HeroSection />

      {/* Features Highlights (Deals, Categories, Restaurants) */}
      <FeaturesHighlights />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;