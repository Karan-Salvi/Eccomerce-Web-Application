import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { ProductCard } from '@/components/ui/product-card';
import { useGetMyProductsQuery } from '@/store/api/vendorApi';
import { useDeleteProductMutation } from '@/store/api/productApi';
import { Search, Filter, Plus, Package } from 'lucide-react';
import { toast } from 'sonner';

const ProductsPage = ({ onAddProduct, onEditProduct }) => {
  const { data, isLoading } = useGetMyProductsQuery({ page: 1, limit: 100 });
  const products = data?.data || [];
  const [deleteProduct] = useDeleteProductMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteProduct_id, setDeleteProductId] = useState(null);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return cats.sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-blue-500" />
      </div>
    );
  }

  const handleDeleteProduct = (product) => {
    setDeleteProductId(product.id);
  };

  const confirmDelete = async () => {
    if (!deleteProduct_id) return;
    try {
      await deleteProduct(deleteProduct_id).unwrap();
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete product');
    } finally {
      setDeleteProductId(null);
    }
  };

  const handleViewProduct = (product) => {
    toast({
      title: product.name,
      description: `Price: $${product.price} | Stock: ${product.stock} | Sales: ${product.sales}`,
    });
  };



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-muted-foreground">
            Manage your product inventory and track performance
          </p>
        </div>
        <Button onClick={onAddProduct} className="md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEditProduct}
              onView={handleViewProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="text-muted-foreground mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">No products found</h3>
            <p className="text-muted-foreground mb-4 text-center">
              {searchTerm || categoryFilter !== 'all'
                ? 'Try adjusting your search terms or filters.'
                : 'Get started by adding your first product.'}
            </p>
            {!searchTerm && categoryFilter === 'all' && (
              <Button onClick={onAddProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteProduct_id}
        onOpenChange={() => setDeleteProductId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductsPage;
