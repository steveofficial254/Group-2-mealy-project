import React from "react";
import MHeader from "../components/MHeader";
import MHero from "../components/MHero";
import MFeatures from "../components/MFeatures";
import MFooter from "../components/MFooter";


function MenuPage() {
  return (
    <div className="menu-page">
      <MHeader />
      <MHero />
      <MFeatures />
      <MFooter />
    </div>
  );
}

export default MenuPage;
