import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';   
 

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          backgroundColor: 'hsl(var(--background))' 
        }}>
          
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />   {/* fixed */}
            </Routes>
          </div>
       
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
