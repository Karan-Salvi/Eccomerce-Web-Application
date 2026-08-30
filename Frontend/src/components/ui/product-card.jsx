import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MoreHorizontal, Edit, Eye, Trash2, Package } from 'lucide-react';

export const ProductCard = ({ product, onEdit, onView, onDelete }) => {
  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of stock', dot: 'bg-red-500', text: 'text-red-600' };
    if (stock <= 10) return { label: 'Low stock', dot: 'bg-amber-500', text: 'text-amber-600' };
    return { label: 'In stock', dot: 'bg-green-500', text: 'text-green-600' };
  };

  const stockStatus = getStockStatus(product.inStock);

  return (
    <Card className="group overflow-hidden py-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
        <Badge className="absolute top-3 left-3 border-none bg-white/90 text-zinc-700 backdrop-blur-sm">
          {product.category}
        </Badge>
      </div>

      <CardContent className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-zinc-900">{product.name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">{product.description}</p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xl font-bold text-zinc-900 tabular-nums">
            ₹{product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1.5 text-sm">
            <span className={cn('h-1.5 w-1.5 rounded-full', stockStatus.dot)} />
            <span className={stockStatus.text}>
              {stockStatus.label} ({product.inStock})
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => onView(product)}
          >
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
