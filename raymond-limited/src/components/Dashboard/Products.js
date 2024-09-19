import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMjQzNDc3MSwianRpIjoiNDE5MmI3MTItM2QxMi00OWU4LWJmNDctMDZjYThmMzZjMTI2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzIyNDM0NzcxLCJjc3JmIjoiZjNkYTJlNmUtYWY0Ny00NTNmLWI1MmYtOGZmYWNmYWIxYjc2IiwiZXhwIjoxNzIyNDM1NjcxfQ.-7KCeo5ZM-44EmRQHOc-TfDx2mtgtk79agqHtAFlEOU'; // Replace this with your method of getting the token
        const response = await axios.get('http://127.0.0.1:5000/api/v1/products/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('API Response:', response.data); // Log the response data

        // Handle different response structures
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.data.products && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (error) {
        console.error('Error fetching products:', error); // Log the error
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Material</th>
            <th>Size</th>
            <th>Price</th>
            <th>Color</th>
            <th>UserID</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.material}</td>
              <td>{product.size}</td>
              <td>{product.price ? product.price.toFixed(2) : 'N/A'}</td>
              <td>{product.color}</td>
              <td>{product.user_id}</td>
              <td><img src={product.thumbnail} alt={product.name} className="product-image" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;


