import React, { useState } from 'react';
import { VendorProvider } from '@/contexts/VendorContext';
import Layout from '../../components/Vendor/Layout';
import Dashboard from '../../components/Vendor/Dashboard';
import ProductsPage from '../../components/Vendor/ProductsPage';
import AddProductPage from '../../components/Vendor/AddProductPage';
import { Toaster } from '@/components/ui/sonner';

function Vendor() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view !== 'add-product') {
      setEditingProduct(null);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setCurrentView('add-product');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setCurrentView('add-product');
  };

  const handleBackToProducts = () => {
    setEditingProduct(null);
    setCurrentView('products');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return (
          <ProductsPage
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
          />
        );
      case 'add-product':
        return (
          <AddProductPage
            onBack={handleBackToProducts}
            editProduct={editingProduct}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <VendorProvider>
      <Layout currentView={currentView} onViewChange={handleViewChange}>
        {renderCurrentView()}
      </Layout>
      <Toaster />
    </VendorProvider>
  );
}

export default Vendor;
