import React, { useState } from 'react';
import { useGetAllProductsQuery, useDeleteProductMutation } from '../../store/api/productApi';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { toast } from 'sonner';
import { Trash2, Search, PackageSearch, Package } from 'lucide-react';

const formatCurrency = (value) => `₹${new Intl.NumberFormat('en-US').format(Math.round(value))}`;

const ProductsPage = () => {
  const { data: productsData, isLoading } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [search, setSearch] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-amber-600" />
      </div>
    );
  }

  const products = productsData?.data || [];

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteProduct(deleteTargetId).unwrap();
      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete product');
    } finally {
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Products</h2>
          <p className="text-muted-foreground">Catalog across every vendor</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center">
          <PackageSearch className="h-10 w-10 text-zinc-300" strokeWidth={1.5} />
          <h3 className="mt-4 text-lg font-semibold text-zinc-900">No products found</h3>
          <p className="text-muted-foreground mt-1">Try a different search term.</p>
        </div>
      ) : (
        <Card className="overflow-hidden py-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b bg-zinc-50 text-left text-xs font-medium text-zinc-500 uppercase">
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-100">
                          {product.images?.[0]?.url ? (
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package className="h-4 w-4 text-zinc-400" />
                          )}
                        </div>
                        <span className="line-clamp-1 font-medium text-zinc-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-muted-foreground px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 tabular-nums">{formatCurrency(product.price)}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{product.inStock}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => setDeleteTargetId(product._id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CardContent className="border-t px-6 py-3">
            <p className="text-muted-foreground text-sm">
              {filteredProducts.length} of {products.length} products
            </p>
          </CardContent>
        </Card>
      )}

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
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductsPage;
