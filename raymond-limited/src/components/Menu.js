import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Menu.css';
import Home from './Home';
import Product from './Product'; 
import Review from './Review'; 
import SignUpForm from './Auth'; 
import LoginForm from './Auth2'; 
import About from './About'; 
import Order from './Order'; 
import Cart from './cart';
import AdminDashboard from './Dashboard/AdminDashboard';
import Unauthorized from './Dashboard/Unauthorized';
import ProtectedRoute from './Dashboard/ProtectedRoute';

import logo from '../assets/relog.png'; 

const Menu = () => {
  return (
    <Router>
      <div className="header-container">
        <img src={logo} alt="Logo" className="logo" />
        <nav>
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/product">Products</Link></li>
            <li><Link to="/review">Reviews</Link></li> 
            <li><Link to="/cart" className="cart-icon">Cart</Link></li>
            
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order/:productId" element={<Order />} />
        <Route path="/review" element={<Review />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} roleRequired="admin" />} />
      </Routes>
    </Router>
  );
};

export default Menu;



/**<li><Link to="/OrderSummary">Orders</Link></li> */
/**<Route path="/orderSummary" element={<OrderSummary />} /> */