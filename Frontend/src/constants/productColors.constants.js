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

export const getProductColorHex = (color) => {
  if (color.startsWith('#')) return color;
  return (
    PRODUCT_COLOR_SWATCHES.find((swatch) => swatch.name.toLowerCase() === color.toLowerCase())
      ?.hex || '#9ca3af'
  );
};

// Perceived-brightness check so a checkmark/label placed on an arbitrary
// swatch (predefined or a custom hex picked via the color input) stays legible.
export const isLightColor = (hex) => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
};
