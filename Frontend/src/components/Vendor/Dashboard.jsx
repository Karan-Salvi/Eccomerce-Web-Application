import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { StatCard } from '../../components/ui/stat-card';
import { useGetMyAnalyticsQuery } from '../../store/api/vendorApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Award,
} from 'lucide-react';

const COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#06B6D4',
];

const Dashboard = () => {
  const { data, isLoading } = useGetMyAnalyticsQuery();
  const analytics = data?.data;

  if (isLoading || !analytics) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-blue-500" />
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Products"
          value={formatNumber(analytics.totalProducts)}
          icon={Package}
        />
        <StatCard
          title="Total Sales"
          value={formatNumber(analytics.totalSales)}
          icon={ShoppingCart}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(analytics.totalRevenue)}
          icon={DollarSign}
        />
        <StatCard
          title="Avg. Order Value"
          value={formatCurrency(analytics.averageOrderValue)}
          icon={TrendingUp}
        />
        <StatCard
          title="Top Product"
          value={analytics.topSellingProduct}
          icon={Award}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>
              Monthly sales and revenue over the past year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'sales'
                      ? formatNumber(Number(value))
                      : formatCurrency(Number(value)),
                    name === 'sales' ? 'Sales' : 'Revenue',
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>
              Distribution of products across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) =>
                    `${category} (${percentage.toFixed(1)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.categoryDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    formatNumber(Number(value)),
                    'Products',
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Category</CardTitle>
          <CardDescription>
            Total revenue generated by each product category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.revenueByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(Number(value)),
                  'Revenue',
                ]}
              />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
};

export default Dashboard;
