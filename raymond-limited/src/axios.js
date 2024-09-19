// src/api/axios.js
import axios from 'axios';
import store  from './Store'; // Adjust the path to your Redux store

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
apiClient.interceptors.request.use((config) => {
  const token = store.getState().session.token; // Corrected syntax for defining the token variable
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;

