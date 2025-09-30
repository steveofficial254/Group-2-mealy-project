import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MealyProvider } from './context/ContextProvider';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ManageMeals from './components/ManageMeals';
import Orders from './components/Orders';
import './App.css';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <MealyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/home" element={
            <ProtectedRoute><HomePage /></ProtectedRoute>
          } />

          <Route path="/menu" element={
            <ProtectedRoute><MenuPage /></ProtectedRoute>
          } />

          <Route path="/my-orders" element={
            <ProtectedRoute><MyOrders /></ProtectedRoute>
          } />

          <Route path="/admin/*" element={
            <ProtectedRoute requireAdmin={true}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/meals" element={<ManageMeals />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </MealyProvider>
  );
}

export default App;