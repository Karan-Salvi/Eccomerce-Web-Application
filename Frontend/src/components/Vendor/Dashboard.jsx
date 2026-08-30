import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
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
  PackagePlus,
  PieChart as PieChartIcon,
} from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const ChartEmptyState = ({ label }) => (
  <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-center">
    <PieChartIcon className="h-8 w-8 text-zinc-300" />
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const Dashboard = ({ onAddProduct }) => {
  const { data, isLoading, isFetching, refetch, fulfilledTimeStamp } = useGetMyAnalyticsQuery(
    undefined,
    {
      pollingInterval: 30000, // 30s — analytics don't need faster than this
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const analytics = data?.data;

  if (isLoading || !analytics) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-amber-600" />
      </div>
    );
  }

  const formatCurrency = (value) => `₹${new Intl.NumberFormat('en-US').format(Math.round(value))}`;
  const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

  if (analytics.totalProducts === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <PackagePlus className="h-7 w-7" strokeWidth={2} />
        </div>
        <h2 className="mt-6 text-xl font-bold text-zinc-900">List your first product</h2>
        <p className="mt-2 max-w-sm text-zinc-600">
          Your analytics, sales trend, and revenue breakdown will show up here as soon as you
          have something for sale.
        </p>
        <Button onClick={onAddProduct} className="mt-6 rounded-full bg-amber-600 hover:bg-amber-700">
          <PackagePlus className="mr-2 h-4 w-4" />
          Add a product
        </Button>
      </div>
    );
  }

  const lastUpdatedLabel = fulfilledTimeStamp
    ? new Date(fulfilledTimeStamp).toLocaleTimeString()
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Live{lastUpdatedLabel ? ` · updated ${lastUpdatedLabel}` : ''}
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="text-sm font-medium text-amber-600 hover:text-amber-700 disabled:opacity-50"
        >
          {isFetching ? 'Refreshing…' : 'Refresh now'}
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Total Products" value={formatNumber(analytics.totalProducts)} icon={Package} />
        <StatCard title="Total Sales" value={formatNumber(analytics.totalSales)} icon={ShoppingCart} />
        <StatCard title="Total Revenue" value={formatCurrency(analytics.totalRevenue)} icon={DollarSign} />
        <StatCard title="Avg. Order Value" value={formatCurrency(analytics.averageOrderValue)} icon={TrendingUp} />
        <StatCard title="Top Product" value={analytics.topSellingProduct} icon={Award} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly sales and revenue over the past year</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.totalSales === 0 ? (
              <ChartEmptyState label="No sales yet — this fills in once your first order comes through." />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.salesTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === 'sales' ? formatNumber(Number(value)) : formatCurrency(Number(value)),
                      name === 'sales' ? 'Sales' : 'Revenue',
                    ]}
                  />
                  <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Distribution of products across categories</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.categoryDistribution.length === 0 ? (
              <ChartEmptyState label="No categories yet." />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} (${percentage.toFixed(1)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analytics.categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatNumber(Number(value)), 'Products']} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Category</CardTitle>
          <CardDescription>Total revenue generated by each product category</CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.revenueByCategory.length === 0 ? (
            <ChartEmptyState label="No revenue yet — this fills in once your first order comes through." />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.revenueByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Revenue']} />
                <Bar dataKey="revenue" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
