export const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    description:
      'High-quality wireless headphones with noise cancellation and premium sound quality.',
    category: 'Electronics',
    rating: 4.8,
    reviews: 1243,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image:
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    description:
      'Advanced fitness tracking with heart rate monitoring and GPS capabilities.',
    category: 'Wearables',
    rating: 4.6,
    reviews: 892,
  },
  {
    id: '3',
    name: 'Professional Camera Lens',
    price: 599.99,
    image:
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    description:
      'Professional-grade camera lens for stunning photography and videography.',
    category: 'Photography',
    rating: 4.9,
    reviews: 456,
  },
  {
    id: '4',
    name: 'Designer Sunglasses',
    price: 159.99,
    image:
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=500',
    description:
      'Stylish designer sunglasses with UV protection and premium materials.',
    category: 'Fashion',
    rating: 4.4,
    reviews: 678,
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    image:
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=500',
    description:
      'Comfortable ergonomic office chair with lumbar support and adjustable features.',
    category: 'Furniture',
    rating: 4.7,
    reviews: 234,
  },
];

export const mockAddresses = [
  {
    id: '1',
    name: 'Home',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Work',
    street: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    country: 'United States',
    isDefault: false,
  },
];

export const mockPaymentMethods = [
  {
    id: '1',
    type: 'credit',
    name: 'Visa ending in 4242',
    details: '**** **** **** 4242',
    isDefault: true,
  },
  {
    id: '2',
    type: 'paypal',
    name: 'PayPal',
    details: 'user@example.com',
    isDefault: false,
  },
];
