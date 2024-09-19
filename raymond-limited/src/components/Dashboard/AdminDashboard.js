import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Users from './Users';
import Orders from './Orders';
import Products from './Products';
import Reviews from './Reviews';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/orders">Orders</Link></li>
          <li><Link to="/admin/products">Products</Link></li>
          <li><Link to="/admin/reviews">Reviews</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="reviews" element={<Reviews />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;





