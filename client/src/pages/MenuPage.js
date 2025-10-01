import React, { useState, useRef } from "react";
import MHeader from "../components/MHeader";
import MHero from "../components/MHero";
import MFeatures from "../components/MFeatures";
import MFooter from "../components/MFooter";
import { MealyProvider } from "../context/ContextProvider";


function MenuPage() {
  const mFeaturesRef = useRef(null);

  const handleSearch = (searchTerm) => {
    if (mFeaturesRef.current) {
      mFeaturesRef.current.handleSearch(searchTerm);
    }
  };

  return (
    <MealyProvider>
      <div className="menu-page">
        <MHeader />
        <MHero onSearch={handleSearch} />
        <MFeatures ref={mFeaturesRef} />
        <MFooter />
      </div>
    </MealyProvider>
  );
}

export default MenuPage;
