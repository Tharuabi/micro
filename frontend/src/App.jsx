// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import AddProject from './pages/AddProject';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import CheckoutPage from './pages/CheckoutPage'; 

import './App.css';

const App = () => {
  const NAVBAR_HEIGHT = '70px';
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (projectToAdd) => {
    if (!projectToAdd) return;
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item.id === projectToAdd.id);
      if (isItemInCart) {
        return prevItems.map(item =>
          item.id === projectToAdd.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevItems, { ...projectToAdd, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (projectIdToRemove) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== projectIdToRemove));
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotalFunctionForProjectPage = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  return (
    <Router>
      <div className="app-layout">
        <Navbar cartItemCount={cartItems.length} />
        <main className="main-content" style={{ paddingTop: NAVBAR_HEIGHT }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projectdetails" element={<ProjectDetails />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/projectpage"
              element={
                <ProjectPage
                  cartItems={cartItems}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  calculateCartTotal={getCartTotalFunctionForProjectPage}
                />
              }
            />
            <Route
              path="/checkoutpage"
              element={
                <CheckoutPage
                  cartItems={cartItems}
                  clearCart={clearCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  updateCartItemQuantity={updateCartItemQuantity}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
