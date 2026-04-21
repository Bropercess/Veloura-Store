'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!user) {
      const localCart = localStorage.getItem('cart');
      if (localCart) setCartItems(JSON.parse(localCart));
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.get('/api/cart');
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product, quantity = 1) => {
    if (user) {
      try {
        const { data } = await api.post('/api/cart', { productId: product._id, quantity });
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.product._id === product._id);
        if (existing) {
          return prev.map((item) =>
            item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prev, { product, quantity, price: product.price }];
      });
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    if (user) {
      try {
        const { data } = await api.put(`/api/cart/${itemId}`, { quantity });
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.product._id === itemId ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = async (itemId) => {
    if (user) {
      try {
        const { data } = await api.delete(`/api/cart/${itemId}`);
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      setCartItems((prev) => prev.filter((item) => item.product._id !== itemId));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (!user) localStorage.removeItem('cart');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);