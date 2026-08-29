import React, { useState } from 'react';
import { useGetAllProductsQuery, useDeleteProductMutation } from '../../store/api/productApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Trash2, Search } from 'lucide-react';

const ProductsPage = () => {
  const { data: productsData, isLoading } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [search, setSearch] = useState('');

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading products...</div>;
  }

  const products = productsData?.data || [];
  
  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(productId).unwrap();
      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalog ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
              <div className="col-span-4">Product</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Stock</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredProducts.map((product) => (
                <div key={product._id} className="grid grid-cols-12 items-center gap-4 p-4">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded bg-secondary">
                      {product.images?.[0]?.url && (
                        <img src={product.images[0].url} alt={product.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="font-medium line-clamp-1">{product.name}</div>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground capitalize">{product.category}</div>
                  <div className="col-span-2 text-sm">${product.price}</div>
                  <div className="col-span-2">
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                      {product.inStock}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No products found.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;
