import React, { useState } from 'react';
import Layout from '../../components/Vendor/Layout';
import Dashboard from '../../components/Vendor/Dashboard';
import ProductsPage from '../../components/Vendor/ProductsPage';
import AddProductPage from '../../components/Vendor/AddProductPage';
import ProductDetailView from '../../components/Vendor/ProductDetailView';
import { Toaster } from '@/components/ui/sonner';

function Vendor() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view !== 'add-product') {
      setEditingProduct(null);
    }
    if (view !== 'view-product') {
      setViewingProduct(null);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setCurrentView('add-product');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setViewingProduct(null);
    setCurrentView('add-product');
  };

  const handleViewProduct = (product) => {
    setViewingProduct(product);
    setCurrentView('view-product');
  };

  const handleBackToProducts = () => {
    setEditingProduct(null);
    setViewingProduct(null);
    setCurrentView('products');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onAddProduct={handleAddProduct} />;
      case 'products':
        return (
          <ProductsPage
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onViewProduct={handleViewProduct}
          />
        );
      case 'add-product':
        return (
          <AddProductPage
            onBack={handleBackToProducts}
            editProduct={editingProduct}
          />
        );
      case 'view-product':
        return (
          <ProductDetailView
            product={viewingProduct}
            onBack={handleBackToProducts}
            onEdit={handleEditProduct}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout currentView={currentView} onViewChange={handleViewChange}>
        {renderCurrentView()}
      </Layout>
      <Toaster />
    </>
  );
}

export default Vendor;
