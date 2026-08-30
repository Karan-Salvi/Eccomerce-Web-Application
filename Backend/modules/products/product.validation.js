import { z } from 'zod';

// MongoDB ObjectId validator
export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

// Price / stock helpers
// z.coerce.number() (not z.number()) because createProduct arrives as
// multipart/form-data (multer) — every field lands in req.body as a string,
// even numeric ones. Coercion is a no-op for callers that already send real
// numbers (e.g. updateProduct's JSON body), so this is safe both ways.
export const priceSchema = z.coerce
  .number()
  .positive()
  .max(99999999, 'Price cannot exceed 8 digits');

export const stockSchema = z.coerce
  .number()
  .int()
  .nonnegative()
  .max(9999, 'Stock cannot exceed 4 digits');

// multipart/form-data collapses a single repeated field (e.g. one `sizes`
// entry) down to a bare string instead of a 1-element array — normalize
// before validating so both single- and multi-value submissions work.
const stringListSchema = z.preprocess(
  (v) => (v === undefined ? v : Array.isArray(v) ? v : [v]),
  z.array(z.string())
);

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Product name is required'),
    description: z.string().min(1, 'Product description is required'),

    price: priceSchema,
    originalPrice: priceSchema,

    ratings: z.coerce.number().min(0).max(5).optional(),

    sizes: stringListSchema.optional(),
    colors: stringListSchema.optional(),

    brand: z.string().optional(),

    category: z.string().min(1, 'Category is required'),

    inStock: stockSchema.optional(), // default exists in schema
    featured: z
      .union([z.boolean(), z.enum(['true', 'false'])])
      .transform((v) => v === true || v === 'true')
      .optional(),
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

    ratings: z.coerce.number().min(0).max(5).optional(),

    sizes: stringListSchema.optional(),
    colors: stringListSchema.optional(),

    brand: z.string().optional(),
    category: z.string().optional(),

    inStock: stockSchema.optional(),
    featured: z
      .union([z.boolean(), z.enum(['true', 'false'])])
      .transform((v) => v === true || v === 'true')
      .optional(),

    // manageImages is an explicit flag (not just existingImages' presence)
    // because a multipart submit that removes every image sends zero
    // `existingImages` entries — indistinguishable from "field absent"
    // otherwise. See updateProduct's handling of these two fields.
    manageImages: z
      .union([z.boolean(), z.enum(['true', 'false'])])
      .transform((v) => v === true || v === 'true')
      .optional(),
    existingImages: stringListSchema.optional(),
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
