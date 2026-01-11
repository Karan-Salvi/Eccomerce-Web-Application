import { z } from 'zod';

// MongoDB ObjectId validator
export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

// Price / stock helpers
export const priceSchema = z.number().positive().max(99999999, 'Price cannot exceed 8 digits');

export const stockSchema = z.number().int().nonnegative().max(9999, 'Stock cannot exceed 4 digits');

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Product name is required'),
    description: z.string().min(1, 'Product description is required'),

    price: priceSchema,
    originalPrice: priceSchema,

    ratings: z.number().min(0).max(5).optional(),

    sizes: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),

    brand: z.string().optional(),

    category: z.string().min(1, 'Category is required'),

    inStock: stockSchema.optional(), // default exists in schema
    featured: z.boolean().optional(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z.object({
    name: z.string().trim().min(1).optional(),
    description: z.string().min(1).optional(),

    price: priceSchema.optional(),
    originalPrice: priceSchema.optional(),

    ratings: z.number().min(0).max(5).optional(),

    sizes: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),

    brand: z.string().optional(),
    category: z.string().optional(),

    inStock: stockSchema.optional(),
    featured: z.boolean().optional(),
  }),
});

export const productIdParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const paginationSchema = z.object({
  query: z.object({
    page: z
      .string()
      .transform(Number)
      .refine((v) => v > 0, 'Page must be > 0')
      .optional(),

    limit: z
      .string()
      .transform(Number)
      .refine((v) => v > 0 && v <= 100, 'Limit must be 1–100')
      .optional(),

    sort: z.string().optional(),

    category: z.string().optional(), // electronics,clothing

    minPrice: z
      .string()
      .transform(Number)
      .refine((v) => v >= 0, 'minPrice must be >= 0')
      .optional(),

    maxPrice: z
      .string()
      .transform(Number)
      .refine((v) => v >= 0, 'maxPrice must be >= 0')
      .optional(),

    minRating: z
      .string()
      .transform(Number)
      .refine((v) => v >= 0 && v <= 5, 'Rating must be 0–5')
      .optional(),

    inStock: z
      .enum(['true', 'false'])
      .transform((v) => v === 'true')
      .optional(),

    search: z.string().optional(),
  }),
});

export const createReviewSchema = z.object({
  body: z.object({
    productId: objectIdSchema,
    rating: z.number().min(1).max(5),
    comment: z.string().min(1, 'Comment is required'),
  }),
});

export const getReviewsSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const deleteReviewSchema = z.object({
  params: z.object({
    id: objectIdSchema, // reviewId
  }),
  body: z.object({
    productId: objectIdSchema,
  }),
});
