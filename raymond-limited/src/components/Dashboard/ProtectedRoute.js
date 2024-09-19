// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, roleRequired }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    // User is not authenticated
    return <Navigate to="/login" />;
  }

  if (role !== roleRequired) {
    // User is authenticated but not authorized
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default ProtectedRoute;
