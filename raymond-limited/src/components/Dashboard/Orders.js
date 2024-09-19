import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMjQzNDc3MSwianRpIjoiNDE5MmI3MTItM2QxMi00OWU4LWJmNDctMDZjYThmMzZjMTI2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzIyNDM0NzcxLCJjc3JmIjoiZjNkYTJlNmUtYWY0Ny00NTNmLWI1MmYtOGZmYWNmYWIxYjc2IiwiZXhwIjoxNzIyNDM1NjcxfQ.-7KCeo5ZM-44EmRQHOc-TfDx2mtgtk79agqHtAFlEOU';
        const response = await axios.get('http://127.0.0.1:5000/api/v1/orders/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('API Response:', response.data); // Log the response data

        // Handle different response structures
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else if (response.data.orders && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          throw new Error('API response is not an array');
        }
      } catch (error) {
        console.error('Error fetching orders:', error); // Log the error
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders: {error.message}</p>;

  return (
    <div>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ProductID</th>
            <th>UserID</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product_id}</td>
              <td>{order.user_id}</td>
              <td>{order.quantity}</td>
              <td>{order.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;



