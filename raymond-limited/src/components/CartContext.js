import React, { createContext, useState, useEffect } from 'react';

// Create a CartContext
export const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  // Retrieve cart data from localStorage or initialize as an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart data to localStorage whenever cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  return React.useContext(CartContext);
};

