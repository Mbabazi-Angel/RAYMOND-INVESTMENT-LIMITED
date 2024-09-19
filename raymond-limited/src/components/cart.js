import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './Cart.css'

// Import product images
import productImage1 from '../assets/denim.webp';
import productImage2 from '../assets/satin3.jpg';
import productImage3 from '../assets/cotton4.webp';
import productImage4 from '../assets/silk3.jpg';
import productImage5 from '../assets/cotton towels.webp';
import productImage6 from '../assets/nylon.jpg';
import productImage7 from '../assets/cotton.jpg';
import productImage8 from '../assets/satin3.jpg';
import productImage9 from '../assets/denim.webp';

// Map product IDs to images
const imageMap = {
  1: productImage1,
  2: productImage2,
  3: productImage3,
  4: productImage4,
  5: productImage5,
  6: productImage6,
  7: productImage7,
  8: productImage8,
  9: productImage9,
};

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={imageMap[item.id]} alt={item.name} style={{
                    width: '100px',  // Adjust width as needed
                    height: '100px', // Adjust height as needed
                    objectFit: 'cover', // Maintain aspect ratio and cover the element
                    borderRadius: '4px', // Optional: round the corners of the image
                    }}/>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
                <div className="cart-item-actions">
                <Link to={`/order/${item.id}`} className="order-now-button">Order Now</Link>
                  <button 
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                  </div>
              </li>
            ))}
          </ul>
          <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;



