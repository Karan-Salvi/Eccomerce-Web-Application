import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { StatCard } from '../../components/ui/stat-card';
import { useVendor } from '../../contexts/VendorContext';
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
  Target,
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
  const { analytics } = useVendor();

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
          change="+12% from last month"
          changeType="positive"
          icon={Package}
        />
        <StatCard
          title="Total Sales"
          value={formatNumber(analytics.totalSales)}
          change="+18% from last month"
          changeType="positive"
          icon={ShoppingCart}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(analytics.totalRevenue)}
          change="+22% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Avg. Order Value"
          value={formatCurrency(analytics.averageOrderValue)}
          change="+5% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Conversion Rate"
          value={`${analytics.conversionRate}%`}
          change="+2.1% from last month"
          changeType="positive"
          icon={Target}
        />
        <StatCard
          title="Top Product"
          value={analytics.topSellingProduct}
          change="127 units sold"
          changeType="neutral"
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and activities in your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: 'Product Updated',
                description:
                  'Wireless Bluetooth Headphones stock updated to 45 units',
                time: '2 minutes ago',
                type: 'update',
              },
              {
                action: 'New Sale',
                description: 'Smart Fitness Watch sold for $299.99',
                time: '15 minutes ago',
                type: 'sale',
              },
              {
                action: 'Low Stock Alert',
                description: 'Ergonomic Office Chair has only 3 units left',
                time: '1 hour ago',
                type: 'alert',
              },
              {
                action: 'Product Added',
                description: 'Gaming Mechanical Keyboard added to draft',
                time: '2 hours ago',
                type: 'add',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="bg-muted/50 flex items-start space-x-3 rounded-lg p-3"
              >
                <div
                  className={`mt-2 h-2 w-2 rounded-full ${
                    activity.type === 'sale'
                      ? 'bg-green-500'
                      : activity.type === 'alert'
                        ? 'bg-yellow-500'
                        : activity.type === 'add'
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-muted-foreground text-sm">
                    {activity.description}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
