import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockProducts, generateAnalytics } from '../data/mockData';

const VendorContext = createContext(undefined);

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
};

export const VendorProvider = ({ children }) => {
  const [products, setProducts] = useState(mockProducts);
  const [analytics, setAnalytics] = useState(() =>
    generateAnalytics(mockProducts)
  );

  const addProduct = useCallback((productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      sales: 0,
      revenue: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProducts((prev) => {
      const updated = [...prev, newProduct];
      setAnalytics(generateAnalytics(updated));
      return updated;
    });
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) => {
      const updated = prev.map((product) =>
        product.id === id
          ? { ...product, ...updates, updatedAt: new Date() }
          : product
      );
      setAnalytics(generateAnalytics(updated));
      return updated;
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => {
      const updated = prev.filter((product) => product.id !== id);
      setAnalytics(generateAnalytics(updated));
      return updated;
    });
  }, []);

  const refreshAnalytics = useCallback(() => {
    setAnalytics(generateAnalytics(products));
  }, [products]);

  const value = {
    products,
    analytics,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshAnalytics,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
};
