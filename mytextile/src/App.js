import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import HomePage1 from './components/Homepg'
import SearchPage from './components/SearchPage';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import SignupPage from './components/SignupPage';
import VerifyOTPPage from './components/VerifyOTPPage'; // Import OTP verification page
import LoginPage from './components/LoginPage'; // Ensure this is the login page
import AdminPage from './components/AdminPage';
import AdminLogin from './components/AdminLogin';
import CheckoutPage from './components/CheckoutPage'
import ProductDetail from './components/ProductDetail';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path='/home1' element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<HomePage1 />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyOTPPage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
