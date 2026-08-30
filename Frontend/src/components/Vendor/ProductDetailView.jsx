import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Star, Package, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductDetailView = ({ product, onBack, onEdit }) => {
  const images = product.images?.length ? product.images : [{ url: null }];
  const [activeImage, setActiveImage] = useState(0);

  const hasDiscount = product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const stockStatus =
    product.inStock === 0
      ? { label: 'Out of stock', dot: 'bg-red-500', text: 'text-red-600' }
      : product.inStock <= 10
        ? { label: 'Low stock', dot: 'bg-amber-500', text: 'text-amber-600' }
        : { label: 'In stock', dot: 'bg-green-500', text: 'text-green-600' };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" onClick={onBack} className="w-fit text-zinc-600 hover:text-amber-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <Button
          onClick={() => onEdit(product)}
          className="rounded-full bg-amber-600 hover:bg-amber-700"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Product
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-100">
            {images[activeImage]?.url ? (
              <img
                src={images[activeImage].url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Package className="h-10 w-10 text-zinc-300" />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={img.url || index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    'h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2',
                    activeImage === index ? 'border-amber-600' : 'border-transparent'
                  )}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.featured && (
                <span className="flex items-center gap-1 text-sm font-medium text-amber-600">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  Featured
                </span>
              )}
            </div>
            {product.brand && (
              <p className="mt-2 text-sm font-medium tracking-wide text-zinc-500 uppercase">
                {product.brand}
              </p>
            )}
            <h1 className="mt-1 text-2xl font-bold text-zinc-900">{product.name}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-zinc-900 tabular-nums">
              ₹{product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-muted-foreground text-lg line-through tabular-nums">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
                <Badge className="border-none bg-amber-50 text-amber-700">
                  {discountPercent}% off
                </Badge>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className={cn('h-2 w-2 rounded-full', stockStatus.dot)} />
            <span className={stockStatus.text}>
              {stockStatus.label} — {product.inStock} units
            </span>
          </div>

          <p className="text-zinc-600">{product.description}</p>

          {(product.sizes?.length > 0 || product.colors?.length > 0) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {product.sizes?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-zinc-900">Sizes</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Badge key={size} variant="outline">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {product.colors?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-zinc-900">Colors</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Badge key={color} variant="outline">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                {product.ratings?.toFixed?.(1) ?? product.ratings ?? 0} rating
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <Tag className="h-4 w-4" />
                {product.numOfReviews ?? 0} reviews
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
