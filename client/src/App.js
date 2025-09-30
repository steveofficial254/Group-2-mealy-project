import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MealyProvider } from './context/ContextProvider';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ManageMeals from './components/ManageMeals';
import Orders from './components/Orders';
import './App.css';
import Signup from './components/Signup';
import SignIn from './components/SignIn'; // Import SignIn

// Import your pages
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";

function App() {
  return (
    <MealyProvider>
      <Router>
        <Routes>
          {/* Signup is the first page */}
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Home page after successful signup */}
          <Route path="/home" element={<HomePage />} />
          
          {/* Other public routes */}
          <Route path="/menu" element={<MenuPage />} />
          
          {/* Dashboard routes with Layout */}
          <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/meals" element={<Layout><ManageMeals /></Layout>} />
          <Route path="/orders" element={<Layout><Orders /></Layout>} />
        </Routes>
      </Router>
    </MealyProvider>
  );
}

export default App;