import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Link
import HomePage from './components/HomePage';
import ShoppingCart from './components/ShoppingCart';
import CheckoutPage from './components/CheckoutPage';
import ProductDetailsPage from './components/ProductDetails';
import ThankYouPage from './components/ThankYouPage';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import NavigationBar from './components/Navbar';
import { CartProvider } from './CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
      <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
