import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { useGetAllUsersQuery } from '../../store/api/adminApi';
import { useGetAllProductsQuery } from '../../store/api/productApi';
import { useGetAllOrdersQuery } from '../../store/api/orderApi';
import { Users, Package, ShoppingCart, IndianRupee, UserRound } from 'lucide-react';
import { USER_ROLES } from '../../constants/roles.constants';

const formatCurrency = (value) => `₹${new Intl.NumberFormat('en-US').format(Math.round(value))}`;

const Dashboard = () => {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: productsData, isLoading: productsLoading } = useGetAllProductsQuery();
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery();

  if (usersLoading || productsLoading || ordersLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-amber-600" />
      </div>
    );
  }

  const users = usersData?.data || [];
  const products = productsData?.data || [];
  const orders = ordersData?.data || [];

  const totalUsers = users.length;
  const vendorsCount = users.filter((u) => u.role === USER_ROLES.VENDER).length;
  const totalProducts = products.length;
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((sum, order) => {
    if (order.orderStatus !== 'cancelled') {
      return sum + (order.totalPrice || 0);
    }
    return sum;
  }, 0);

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      description: `${vendorsCount} registered vendors`,
      icon: Users,
    },
    {
      title: 'Total Products',
      value: totalProducts,
      description: 'Across all vendors',
      icon: Package,
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      description: 'Placed storewide',
      icon: ShoppingCart,
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      description: 'Excludes cancelled orders',
      icon: IndianRupee,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-muted-foreground py-6 text-center text-sm">No users yet.</p>
            ) : (
              <div className="space-y-4">
                {users.slice(0, 5).map((u) => (
                  <div key={u._id} className="flex items-center gap-3 border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-900">{u.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0 capitalize">
                      {u.role === USER_ROLES.VENDER ? 'vendor' : u.role}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-muted-foreground py-6 text-center text-sm">No products yet.</p>
            ) : (
              <div className="space-y-4">
                {products.slice(0, 5).map((p) => (
                  <div key={p._id} className="flex items-center gap-3 border-b pb-3 last:border-0 last:pb-0">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                      {p.images?.[0]?.url && (
                        <img
                          src={p.images[0].url}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-900">{p.name}</p>
                      <p className="text-xs text-muted-foreground tabular-nums">
                        {formatCurrency(p.price)}
                      </p>
                    </div>
                    <Badge className="shrink-0 border-none bg-amber-50 text-amber-700">
                      {p.inStock} in stock
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
