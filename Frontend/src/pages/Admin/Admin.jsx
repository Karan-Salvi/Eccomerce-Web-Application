import React, { useState } from 'react';
import Layout from '../../components/Admin/Layout';
import Dashboard from '../../components/Admin/Dashboard';
import UsersPage from '../../components/Admin/UsersPage';
import ProductsPage from '../../components/Admin/ProductsPage';
import OrdersPage from '../../components/Admin/OrdersPage';
import ProductDetailView from '../../components/Vendor/ProductDetailView';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteProductMutation } from '../../store/api/productApi';
import { Toaster } from '@/components/ui/sonner';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

function Admin() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [viewingProduct, setViewingProduct] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view !== 'view-product') {
      setViewingProduct(null);
    }
  };

  const handleViewProduct = (product) => {
    setViewingProduct(product);
    setCurrentView('view-product');
  };

  const handleBackToProducts = () => {
    setViewingProduct(null);
    setCurrentView('products');
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteProduct(deleteTargetId).unwrap();
      toast.success('Product deleted successfully');
      handleBackToProducts();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete product');
    } finally {
      setDeleteTargetId(null);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersPage />;
      case 'products':
        return <ProductsPage onViewProduct={handleViewProduct} />;
      case 'orders':
        return <OrdersPage />;
      case 'view-product':
        return (
          <ProductDetailView
            product={viewingProduct}
            onBack={handleBackToProducts}
            actions={
              <Button
                variant="outline"
                onClick={() => setDeleteTargetId(viewingProduct._id)}
                className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Product
              </Button>
            }
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

      <AlertDialog open={!!deleteTargetId} onOpenChange={() => setDeleteTargetId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product and remove
              all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Admin;
