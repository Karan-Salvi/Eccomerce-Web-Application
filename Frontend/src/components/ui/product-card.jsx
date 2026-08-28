import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MoreHorizontal, Edit, Eye, Trash2, Package } from 'lucide-react';

export const ProductCard = ({ product, onEdit, onView, onDelete }) => {
  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'text-red-600' };
    if (stock <= 10) return { label: 'Low Stock', color: 'text-yellow-600' };
    return { label: 'In Stock', color: 'text-green-600' };
  };

  const stockStatus = getStockStatus(product.inStock);

  return (
    <Card className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="h-48 w-full rounded-t-lg object-cover"
        />
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-lg font-semibold">{product.name}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-primary text-2xl font-bold">
              ₹{product.price.toFixed(2)}
            </span>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span className={stockStatus.color}>
                {stockStatus.label} ({product.inStock})
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex w-full items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => onView(product)}>
            <Eye className="mr-1 h-4 w-4" />
            View
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(product)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onView(product)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(product)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};
