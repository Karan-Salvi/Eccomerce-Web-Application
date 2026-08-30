import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
import { StatCard } from '@/components/ui/stat-card';
import { useGetMyProductsQuery } from '@/store/api/vendorApi';
import { useDeleteProductMutation } from '@/store/api/productApi';
import { Search, Plus, Package, PackageSearch } from 'lucide-react';
import { toast } from 'sonner';

const ProductsPage = ({ onAddProduct, onEditProduct, onViewProduct }) => {
  const { data, isLoading } = useGetMyProductsQuery(
    { page: 1, limit: 100 },
    { pollingInterval: 30000, refetchOnFocus: true, refetchOnReconnect: true }
  );
  const products = useMemo(() => data?.data || [], [data]);
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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-amber-600" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Product Management</h2>
          <p className="text-muted-foreground">
            Manage your product inventory and track performance
          </p>
        </div>
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <PackageSearch className="h-7 w-7" strokeWidth={2} />
          </div>
          <h3 className="mt-6 text-xl font-bold text-zinc-900">No products yet</h3>
          <p className="mt-2 max-w-sm text-zinc-600">
            Get started by listing your first product — it'll show up here for buyers to find.
          </p>
          <Button
            onClick={onAddProduct}
            className="mt-6 rounded-full bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add your first product
          </Button>
        </div>
      </div>
    );
  }

  const handleDeleteProduct = (product) => {
    setDeleteProductId(product._id);
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
    onViewProduct(product);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Product Management</h2>
          <p className="text-muted-foreground">
            Manage your product inventory and track performance
          </p>
        </div>
        <Button
          onClick={onAddProduct}
          className="rounded-full bg-amber-600 hover:bg-amber-700 md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Stats */}
      <StatCard
        title="Total Products"
        value={products.length}
        icon={Package}
        className="max-w-xs"
      />

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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
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
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={onEditProduct}
              onView={handleViewProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center">
          <PackageSearch className="h-10 w-10 text-zinc-300" strokeWidth={1.5} />
          <h3 className="mt-4 text-lg font-semibold text-zinc-900">No matches</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or category filter.
          </p>
        </div>
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
