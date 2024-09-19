import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './OrderSummary.css';

const OrderSummary = () => {
  const { productId } = useParams();
  const { cart } = useCart();

  // Find the ordered product based on the productId from URL
  const orderedProduct = cart.find(item => item.id === parseInt(productId));

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      {orderedProduct ? (
        <div className="order-details">
          <img src={orderedProduct.imageUrl} alt={orderedProduct.name} className="order-image" />
          <div className="order-info">
            <h3>{orderedProduct.name}</h3>
            <p>Price: {orderedProduct.price}</p>
            <p>Quantity: {orderedProduct.quantity || 1}</p> {/* Adjust according to your data */}
            <p>Status: {orderedProduct.status || 'Pending'}</p> {/* Adjust according to your data */}
          </div>
        </div>
      ) : (
        <p>No order found.</p>
      )}
    </div>
  );
};

export default OrderSummary;
