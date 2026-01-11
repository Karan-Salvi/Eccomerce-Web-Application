export const mockProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description:
      'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    stock: 45,
    status: 'active',
    image:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    sales: 127,
    revenue: 25398.73,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 299.99,
    category: 'Electronics',
    stock: 23,
    status: 'active',
    image:
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
    sales: 89,
    revenue: 26699.11,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-11-28'),
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Sustainable, comfortable cotton t-shirt in multiple colors',
    price: 29.99,
    category: 'Clothing',
    stock: 0,
    status: 'active',
    image:
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
    sales: 156,
    revenue: 4678.44,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-11-30'),
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    description: '85mm f/1.4 portrait lens for professional photography',
    price: 849.99,
    category: 'Electronics',
    stock: 8,
    status: 'active',
    image:
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    sales: 34,
    revenue: 28899.66,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-11-25'),
  },
  {
    id: '5',
    name: 'Bestselling Novel Collection',
    description: 'Set of 5 contemporary bestselling novels',
    price: 79.99,
    category: 'Books',
    stock: 67,
    status: 'active',
    image:
      'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    sales: 78,
    revenue: 6239.22,
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-12-02'),
  },
  {
    id: '6',
    name: 'Luxury Skincare Set',
    description:
      'Complete anti-aging skincare routine with premium ingredients',
    price: 159.99,
    category: 'Beauty',
    stock: 12,
    status: 'active',
    image:
      'https://images.pexels.com/photos/3685522/pexels-photo-3685522.jpeg?auto=compress&cs=tinysrgb&w=400',
    sales: 93,
    revenue: 14879.07,
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-11-29'),
  },
  {
    id: '7',
    name: 'Ergonomic Office Chair',
    description: 'Adjustable ergonomic chair with lumbar support',
    price: 399.99,
    category: 'Home',
    stock: 3,
    status: 'active',
    image:
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=400',
    sales: 45,
    revenue: 17999.55,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-11-27'),
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    description: 'Non-slip premium yoga mat with alignment lines',
    price: 49.99,
    category: 'Sports',
    stock: 89,
    status: 'active',
    image:
      'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    sales: 112,
    revenue: 5598.88,
    createdAt: new Date('2024-02-14'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '9',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with custom switches',
    price: 129.99,
    category: 'Electronics',
    stock: 0,
    status: 'draft',
    image:
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    sales: 0,
    revenue: 0,
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-11-20'),
  },
];

export const generateAnalytics = (products) => {
  const totalProducts = products.length;
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
  const conversionRate = 12.4; // Mock conversion rate

  const topSellingProduct =
    products.sort((a, b) => b.sales - a.sales)[0]?.name || 'N/A';

  const salesTrend = [
    { month: 'Jan', sales: 145, revenue: 28400 },
    { month: 'Feb', sales: 167, revenue: 32100 },
    { month: 'Mar', sales: 189, revenue: 35800 },
    { month: 'Apr', sales: 223, revenue: 42300 },
    { month: 'May', sales: 198, revenue: 39600 },
    { month: 'Jun', sales: 234, revenue: 45200 },
    { month: 'Jul', sales: 256, revenue: 48900 },
    { month: 'Aug', sales: 289, revenue: 52400 },
    { month: 'Sep', sales: 267, revenue: 49800 },
    { month: 'Oct', sales: 312, revenue: 58100 },
    { month: 'Nov', sales: 298, revenue: 55300 },
    { month: 'Dec', sales: 334, revenue: 62800 },
  ];

  const categories = [...new Set(products.map((p) => p.category))];
  const categoryDistribution = categories.map((category) => {
    const count = products.filter((p) => p.category === category).length;
    const percentage = (count / totalProducts) * 100;
    return { category, count, percentage };
  });

  const revenueByCategory = categories.map((category) => {
    const revenue = products
      .filter((p) => p.category === category)
      .reduce((sum, p) => sum + p.revenue, 0);
    return { category, revenue };
  });

  return {
    totalProducts,
    totalSales,
    totalRevenue,
    averageOrderValue,
    conversionRate,
    topSellingProduct,
    salesTrend,
    categoryDistribution,
    revenueByCategory,
  };
};
