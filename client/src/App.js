import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MealyProvider } from './context/ContextProvider';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ManageMeals from './components/ManageMeals';
import Orders from './components/Orders';
import './App.css';

function App() {
  return (
    <MealyProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meals" element={<ManageMeals />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Layout>
      </Router>
    </MealyProvider>
  );
}

export default App;