import React from 'react';

import Footer from '../components/Footer';

const MenuPage = () => {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Menu</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Explore our delicious selection of meals from the best restaurants
          </p>
          <div className="bg-muted p-8 rounded-xl text-muted-foreground">
            Menu page coming soon! Browse our amazing food categories on the home page.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;
