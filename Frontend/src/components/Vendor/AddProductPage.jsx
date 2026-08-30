import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
import { PRODUCT_COLOR_SWATCHES, getProductColorHex, isLightColor } from '@/constants/productColors.constants';
import { ArrowLeft, Eye, ImagePlus, Star, X, Check, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const splitToList = (value) =>
  value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

const AddProductPage = ({ onBack, editProduct }) => {
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const isSubmitting = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    brand: '',
    sizes: '',
    colors: [],
    featured: false,
  });
  const [existingImages, setExistingImages] = useState([]); // urls already on the product (edit mode)
  const [imageFiles, setImageFiles] = useState([]); // newly added local files
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]); // blob previews for imageFiles

  const [errors, setErrors] = useState({});
  const totalImages = existingImages.length + imageFiles.length;

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price.toString(),
        originalPrice:
          editProduct.originalPrice && editProduct.originalPrice !== editProduct.price
            ? editProduct.originalPrice.toString()
            : '',
        category: editProduct.category,
        stock: String(editProduct.inStock ?? ''),
        brand: editProduct.brand || '',
        sizes: (editProduct.sizes || []).join(', '),
        colors: editProduct.colors || [],
        featured: !!editProduct.featured,
      });
      setExistingImages((editProduct.images || []).map((img) => img.url));
      setImageFiles([]);
      setImagePreviewUrls([]);
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
    if (
      formData.originalPrice &&
      parseFloat(formData.originalPrice) < parseFloat(formData.price || 0)
    ) {
      newErrors.originalPrice = 'Original price must be at or above the selling price';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.stock || parseInt(formData.stock, 10) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    if (totalImages === 0) {
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

    const price = parseFloat(formData.price);
    const originalPrice = formData.originalPrice ? parseFloat(formData.originalPrice) : price;

    try {
      const body = new FormData();
      body.append('name', formData.name.trim());
      body.append('description', formData.description.trim());
      body.append('price', price);
      body.append('originalPrice', originalPrice);
      body.append('category', formData.category);
      body.append('inStock', formData.stock);
      body.append('brand', formData.brand.trim());
      body.append('featured', formData.featured);
      splitToList(formData.sizes).forEach((size) => body.append('sizes', size));
      formData.colors.forEach((color) => body.append('colors', color));
      imageFiles.forEach((file) => body.append('image', file));

      if (editProduct) {
        body.append('manageImages', 'true');
        existingImages.forEach((url) => body.append('existingImages', url));

        await updateProduct({ id: editProduct._id, data: body }).unwrap();
        toast.success('Product updated successfully');
      } else {
        await createProduct(body).unwrap();
        toast.success('Product added successfully');
      }

      onBack();
    } catch (error) {
      toast.error(
        error?.data?.message || 'There was an error saving your product. Please try again.'
      );
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const toggleColor = (colorName) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter((c) => c !== colorName)
        : [...prev.colors, colorName],
    }));
  };

  const addCustomColor = (hex) => {
    const alreadyAdded = formData.colors.some((c) => c.toLowerCase() === hex.toLowerCase());
    if (!alreadyAdded) {
      setFormData((prev) => ({ ...prev, colors: [...prev.colors, hex] }));
    }
  };

  const removeColor = (colorName) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== colorName),
    }));
  };

  const handleImageFilesChange = (e) => {
    const newFiles = Array.from(e.target.files || []);
    e.target.value = ''; // allow re-selecting the same file after removal
    const remainingSlots = 5 - existingImages.length - imageFiles.length;

    setImageFiles((prev) => {
      const combined = [...prev, ...newFiles.slice(0, remainingSlots)];
      setImagePreviewUrls(combined.map((file) => URL.createObjectURL(file)));
      return combined;
    });
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const handleRemoveNewImage = (index) => {
    setImageFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setImagePreviewUrls(next.map((file) => URL.createObjectURL(file)));
      return next;
    });
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const previewHasDiscount =
    formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price || 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-zinc-600 hover:text-amber-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-zinc-900">
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        <p className="text-muted-foreground">
          {editProduct ? 'Update your product information' : 'Create a new product for your store'}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              {/*
                Deliberately a <div>, not a <form>: Radix's <Select> mounts a
                hidden native <select> to bubble form events ONLY when it
                detects a <form> ancestor. That hidden select starts with no
                <option>s (they only register once the dropdown has been
                opened at least once), so when we set its value
                programmatically here (editing a product), the browser can't
                match it, and Radix's own change-event sync bounces the
                controlled value back to "" — wiping the category we just
                set. Submission is handled entirely through handleSubmit via
                the button below; no native form serialization is used.
              */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="mb-2">
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter product name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="description" className="mb-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Enter product description"
                      rows={4}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">{errors.description}</p>
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
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="0.00"
                        className={errors.price ? 'border-red-500' : ''}
                      />
                      {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                    </div>

                    <div>
                      <Label htmlFor="originalPrice" className="mb-2">
                        Original Price (₹){' '}
                        <span className="text-muted-foreground font-normal">
                          — optional, shows a discount
                        </span>
                      </Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                        placeholder="Same as price"
                        className={errors.originalPrice ? 'border-red-500' : ''}
                      />
                      {errors.originalPrice && (
                        <p className="mt-1 text-sm text-red-500">{errors.originalPrice}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="stock" className="mb-2">
                        Stock Quantity
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => handleInputChange('stock', e.target.value)}
                        placeholder="0"
                        className={errors.stock ? 'border-red-500' : ''}
                      />
                      {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                    </div>

                    <div>
                      <Label htmlFor="category" className="mb-2">
                        Category
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select category">
                            {PRODUCT_CATEGORY_OPTIONS.find((c) => c.value === formData.category)
                              ?.label}
                          </SelectValue>
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
                        <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="brand" className="mb-2">
                      Brand <span className="text-muted-foreground font-normal">— optional</span>
                    </Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="e.g. CartLoop Basics"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sizes" className="mb-2">
                      Sizes{' '}
                      <span className="text-muted-foreground font-normal">
                        — optional, comma separated
                      </span>
                    </Label>
                    <Input
                      id="sizes"
                      value={formData.sizes}
                      onChange={(e) => handleInputChange('sizes', e.target.value)}
                      placeholder="S, M, L, XL"
                    />
                  </div>

                  <div>
                    <Label className="mb-2">
                      Colors{' '}
                      <span className="text-muted-foreground font-normal">— optional</span>
                    </Label>
                    <div className="flex flex-wrap items-center gap-3">
                      {PRODUCT_COLOR_SWATCHES.map((swatch) => {
                        const isSelected = formData.colors.includes(swatch.name);
                        return (
                          <button
                            key={swatch.name}
                            type="button"
                            onClick={() => toggleColor(swatch.name)}
                            title={swatch.name}
                            aria-label={swatch.name}
                            aria-pressed={isSelected}
                            className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                              isSelected
                                ? 'border-amber-600 ring-2 ring-amber-100'
                                : 'border-zinc-300 hover:border-zinc-400'
                            )}
                            style={{ backgroundColor: swatch.hex }}
                          >
                            {swatch.name.toLowerCase() === 'white' && (
                              <div className="h-full w-full rounded-full border border-zinc-200" />
                            )}
                            {isSelected && (
                              <Check
                                className={cn(
                                  'h-4 w-4',
                                  isLightColor(swatch.hex) ? 'text-zinc-900' : 'text-white'
                                )}
                              />
                            )}
                          </button>
                        );
                      })}

                      {formData.colors
                        .filter((color) => color.startsWith('#'))
                        .map((hex) => (
                          <button
                            key={hex}
                            type="button"
                            onClick={() => removeColor(hex)}
                            title={`${hex} — click to remove`}
                            aria-label={`Remove custom color ${hex}`}
                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-600 ring-2 ring-amber-100"
                            style={{ backgroundColor: hex }}
                          >
                            <X className={cn('h-4 w-4', isLightColor(hex) ? 'text-zinc-900' : 'text-white')} />
                          </button>
                        ))}

                      <label
                        title="Pick a custom color"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-zinc-300 text-zinc-400 hover:border-amber-400 hover:text-amber-600"
                      >
                        <Plus className="pointer-events-none h-4 w-4" />
                        <input
                          type="color"
                          aria-label="Pick a custom color"
                          defaultValue="#000000"
                          onChange={(e) => addCustomColor(e.target.value)}
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                      </label>
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Not seeing the right shade? Use the + to pick any color.
                    </p>
                    {formData.colors.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.colors.map((color) => (
                          <span
                            key={color}
                            className="flex items-center gap-1.5 rounded-full bg-zinc-100 py-1 pr-1.5 pl-2 text-sm text-zinc-700"
                          >
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-zinc-300"
                              style={{ backgroundColor: getProductColorHex(color) }}
                            />
                            {color}
                            <button
                              type="button"
                              onClick={() => removeColor(color)}
                              className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-zinc-300"
                              aria-label={`Remove ${color}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <label
                    htmlFor="featured"
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 p-4"
                  >
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange('featured', checked === true)}
                    />
                    <span>
                      <span className="block text-sm font-medium text-zinc-900">
                        Feature this product
                      </span>
                      <span className="text-muted-foreground text-sm">
                        Featured products get priority placement on the storefront.
                      </span>
                    </span>
                  </label>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label htmlFor="images">Product Images (up to 5)</Label>
                  {totalImages < 5 ? (
                    <label
                      htmlFor="images"
                      className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 px-6 py-8 text-center hover:border-amber-400 hover:bg-amber-50/40"
                    >
                      <ImagePlus className="h-6 w-6 text-zinc-400" />
                      <span className="text-sm font-medium text-zinc-700">
                        Click to choose images
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {5 - totalImages} more allowed — JPG or PNG
                      </span>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageFilesChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      5 image limit reached — remove one below to add another.
                    </p>
                  )}
                  {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                  {totalImages > 0 && (
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                      {existingImages.map((url, index) => (
                        <div key={url} className="group relative">
                          <img
                            src={url}
                            alt={`Product image ${index + 1}`}
                            className="h-20 w-full rounded-lg border object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(index)}
                            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {imagePreviewUrls.map((url, index) => (
                        <div key={url} className="group relative">
                          <img
                            src={url}
                            alt={`New image ${index + 1}`}
                            className="h-20 w-full rounded-lg border object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(index)}
                            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label={`Remove new image ${index + 1}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 rounded-full bg-amber-600 hover:bg-amber-700"
                  >
                    {isSubmitting
                      ? 'Saving…'
                      : editProduct
                        ? 'Update Product'
                        : 'Add Product'}
                  </Button>
                  <Button type="button" variant="outline" className="rounded-full" onClick={onBack}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div>
          <Card className="sticky top-6 overflow-hidden py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="flex items-center gap-2 text-base">
                <Eye className="h-4 w-4" />
                Product Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-100">
                {existingImages[0] || imagePreviewUrls[0] ? (
                  <img
                    src={existingImages[0] || imagePreviewUrls[0]}
                    alt="Product preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImagePlus className="h-8 w-8 text-zinc-300" />
                )}
              </div>

              <div className="space-y-2">
                {formData.brand && (
                  <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                    {formData.brand}
                  </p>
                )}
                <h3 className="font-semibold text-zinc-900">{formData.name || 'Product Name'}</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {formData.description || 'Product description will appear here...'}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-zinc-900 tabular-nums">
                      ₹{formData.price || '0.00'}
                    </span>
                    {previewHasDiscount && (
                      <span className="text-muted-foreground text-sm line-through tabular-nums">
                        ₹{formData.originalPrice}
                      </span>
                    )}
                  </div>
                  {formData.category && (
                    <Badge variant="outline" className="text-xs">
                      {formData.category}
                    </Badge>
                  )}
                </div>

                <div className="text-muted-foreground text-sm">Stock: {formData.stock || '0'}</div>

                {formData.featured && (
                  <div className="flex items-center gap-1 text-sm font-medium text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    Featured
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
