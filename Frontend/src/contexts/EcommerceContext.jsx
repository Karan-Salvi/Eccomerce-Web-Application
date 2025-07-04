import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  mockProducts,
  mockAddresses,
  mockPaymentMethods,
} from "../data/mockData1";

const EcommerceContext = createContext(undefined);

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error("useEcommerce must be used within an EcommerceProvider");
  }
  return context;
};

export const EcommerceProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [addresses, setAddresses] = useState(mockAddresses);
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [currentPage, setCurrentPage] = useState("cart");

  // Cart functions
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // Address functions
  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: Date.now().toString(),
    };
    setAddresses((prev) => [...prev, newAddress]);
  };

  const updateAddress = (address) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === address.id ? address : addr))
    );
  };

  const deleteAddress = (addressId) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
  };

  const setDefaultAddress = (addressId) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === addressId }))
    );
  };

  // Payment method functions
  const addPaymentMethod = (method) => {
    const newMethod = {
      ...method,
      id: Date.now().toString(),
    };
    setPaymentMethods((prev) => [...prev, newMethod]);
  };

  const deletePaymentMethod = (methodId) => {
    setPaymentMethods((prev) =>
      prev.filter((method) => method.id !== methodId)
    );
  };

  const setDefaultPaymentMethod = (methodId) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({ ...method, isDefault: method.id === methodId }))
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    paymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    currentPage,
    setCurrentPage,
  };

  return (
    <EcommerceContext.Provider value={value}>
      {children}
    </EcommerceContext.Provider>
  );
};
