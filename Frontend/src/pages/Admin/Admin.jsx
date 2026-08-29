import React, { useState } from 'react';
import Layout from '../../components/Admin/Layout';
import Dashboard from '../../components/Admin/Dashboard';
import UsersPage from '../../components/Admin/UsersPage';
import ProductsPage from '../../components/Admin/ProductsPage';
import OrdersPage from '../../components/Admin/OrdersPage';
import { Toaster } from '@/components/ui/sonner';

function Admin() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersPage />;
      case 'products':
        return <ProductsPage />;
      case 'orders':
        return <OrdersPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout currentView={currentView} onViewChange={setCurrentView}>
        {renderCurrentView()}
      </Layout>
      <Toaster />
    </>
  );
}

export default Admin;
