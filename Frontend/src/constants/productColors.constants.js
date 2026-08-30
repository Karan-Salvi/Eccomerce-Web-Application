export const PRODUCT_COLOR_SWATCHES = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#000000' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Gray', hex: '#6b7280' },
  { name: 'Brown', hex: '#92400e' },
  { name: 'Tan', hex: '#d2b48c' },
  { name: 'Silver', hex: '#c0c0c0' },
  { name: 'Gold', hex: '#ffd700' },
  { name: 'Rose Gold', hex: '#e8b4b8' },
  { name: 'Tortoise', hex: '#8b4513' },
];

export const getProductColorHex = (color) =>
  PRODUCT_COLOR_SWATCHES.find((swatch) => swatch.name.toLowerCase() === color.toLowerCase())
    ?.hex || '#9ca3af';
