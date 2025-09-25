import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Mealy!</h1>
      <p className="text-xl text-gray-600">You've successfully signed up!</p>
      <p className="text-sm text-gray-500 mt-4">This is a placeholder home page.</p>
    </div>
  </div>
);

const SignIn = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Sign In</h1>
      <p className="text-xl text-gray-600">Sign in page coming soon...</p>
      <a href="/signup" className="text-blue-500 underline mt-4 inline-block">
        Go back to Sign Up
      </a>
    </div>
  </div>
);

export default App;