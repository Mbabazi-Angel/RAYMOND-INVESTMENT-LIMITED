// src/api/api.js
import apiClient from './axios';

// Auth API
export const registerUser = (userData) => apiClient.post('/auth/register', userData);
export const loginUser = (userData) => apiClient.post('/auth/login', userData);

// Company API
export const createCompany = (companyData) => apiClient.post('/companies/create', companyData);
export const deleteCompany = (id) => apiClient.delete(`/companies/delete/${id}`);

// Order API
export const createOrder = (orderData) => apiClient.post('/orders/create', orderData);
export const deleteOrder = (id) => apiClient.delete(`/orders/delete/${id}`);
export const updateOrder = (id, orderData) => apiClient.patch(`/orders/update/${id}`, orderData);
export const getAllOrders = () => apiClient.get('/orders/');
export const getOrder = (id) => apiClient.get(`/orders/${id}`);

// Product API
export const createProduct = (productData) => apiClient.post('/products/create', productData);
export const deleteProduct = (id) => apiClient.delete(`/products/delete/${id}`);
export const updateProduct = (id, productData) => apiClient.patch(`/products/update/${id}`, productData);
export const getAllProducts = () => apiClient.get('/products/');
export const getProduct = (id) => apiClient.get(`/products/${id}`);

// Review API
export const createReview = (reviewData) => apiClient.post('/reviews/create', reviewData);
export const deleteReview = (id) => apiClient.delete(`/reviews/delete/${id}`);
export const updateReview = (id, reviewData) => apiClient.patch(`/reviews/update/${id}`, reviewData);
export const getAllReviews = () => apiClient.get('/reviews/');
export const getReview = (id) => apiClient.get(`/reviews/${id}`);
