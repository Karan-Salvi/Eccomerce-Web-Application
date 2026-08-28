import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCreateProductMutation, useUpdateProductMutation } from '@/store/api/productApi';
import { PRODUCT_CATEGORY_OPTIONS } from '@/constants/productCategories.constants';
import { ArrowLeft, Eye } from 'lucide-react';
import { toast } from 'sonner';

const AddProductPage = ({ onBack, editProduct }) => {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price.toString(),
        category: editProduct.category,
        stock: String(editProduct.inStock ?? ''),
      });
      setImagePreviewUrls((editProduct.images || []).map((img) => img.url));
    }
  }, [editProduct]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    if (!editProduct && imageFiles.length === 0) {
      newErrors.image = 'At least one product image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (editProduct) {
        await updateProduct({
          id: editProduct._id,
          data: {
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: parseFloat(formData.price),
            originalPrice: parseFloat(formData.price),
            category: formData.category,
            inStock: parseInt(formData.stock, 10),
          },
        }).unwrap();
        toast.success('Product updated successfully');
      } else {
        const body = new FormData();
        body.append('name', formData.name.trim());
        body.append('description', formData.description.trim());
        body.append('price', formData.price);
        body.append('originalPrice', formData.price);
        body.append('category', formData.category);
        body.append('inStock', formData.stock);
        imageFiles.forEach((file) => body.append('image', file));

        await createProduct(body).unwrap();
        toast.success('Product added successfully');
      }

      onBack();
    } catch (error) {
      toast.error(error?.data?.message || 'There was an error saving your product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageFilesChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setImageFiles(files);
    setImagePreviewUrls(files.map((file) => URL.createObjectURL(file)));
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <div>
          <h2 className="text-2xl font-bold">
            {editProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-muted-foreground">
            {editProduct
              ? 'Update your product information'
              : 'Create a new product for your store'}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="mb-2">
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      placeholder="Enter product name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description" className="mb-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange('description', e.target.value)
                      }
                      placeholder="Enter product description"
                      rows={4}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="price" className="mb-2">
                        Price (₹)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange('price', e.target.value)
                        }
                        placeholder="0.00"
                        className={errors.price ? 'border-red-500' : ''}
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="stock" className="mb-2">
                        Stock Quantity
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          handleInputChange('stock', e.target.value)
                        }
                        placeholder="0"
                        className={errors.stock ? 'border-red-500' : ''}
                      />
                      {errors.stock && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.stock}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="category" className="mb-2">
                        Category
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange('category', value)
                        }
                      >
                        <SelectTrigger
                          className={errors.category ? 'border-red-500' : ''}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRODUCT_CATEGORY_OPTIONS.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.category}
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label htmlFor="images">Product Images (up to 5)</Label>
                  {editProduct ? (
                    <p className="text-muted-foreground text-sm">
                      Images can&apos;t be changed when editing yet — the current images stay as-is.
                    </p>
                  ) : (
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFilesChange}
                      className={errors.image ? 'border-red-500' : ''}
                    />
                  )}
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                  )}
                  {imagePreviewUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {imagePreviewUrls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="h-20 w-full rounded-lg border object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting
                      ? 'Saving...'
                      : editProduct
                        ? 'Update Product'
                        : 'Add Product'}
                  </Button>
                  <Button type="button" variant="outline" onClick={onBack}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Product Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {imagePreviewUrls[0] && (
                  <img
                    src={imagePreviewUrls[0]}
                    alt="Product preview"
                    className="h-40 w-full rounded-lg object-cover"
                  />
                )}

                <div className="space-y-2">
                  <h3 className="font-semibold">
                    {formData.name || 'Product Name'}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {formData.description ||
                      'Product description will appear here...'}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-primary text-lg font-bold">
                      ₹{formData.price || '0.00'}
                    </span>
                    {formData.category && (
                      <Badge variant="outline">{formData.category}</Badge>
                    )}
                  </div>

                  <div className="text-muted-foreground text-sm">
                    Stock: {formData.stock || '0'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
