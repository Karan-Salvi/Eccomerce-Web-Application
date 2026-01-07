export const PRODUCT_SORT = {
  FEATURED: "featured",
  NEWEST: "newest",
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
  RATING: "rating",
};

export const PRODUCT_SORT_OPTIONS = {
  [PRODUCT_SORT.FEATURED]: { featured: -1, createdAt: -1 },
  [PRODUCT_SORT.NEWEST]: { createdAt: -1 },
  [PRODUCT_SORT.PRICE_ASC]: { price: 1 },
  [PRODUCT_SORT.PRICE_DESC]: { price: -1 },
  [PRODUCT_SORT.RATING]: { ratings: -1 },
};
