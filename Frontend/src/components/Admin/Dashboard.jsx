import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllUsersQuery } from '../../store/api/adminApi';
import { useGetAllProductsQuery } from '../../store/api/productApi';
import { useGetAllOrdersQuery } from '../../store/api/orderApi';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { USER_ROLES } from '../../constants/roles.constants';

const Dashboard = () => {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: productsData, isLoading: productsLoading } = useGetAllProductsQuery();
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery();

  if (usersLoading || productsLoading || ordersLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading dashboard metrics...</div>;
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
      value: totalUsers.toString(),
      description: `${vendorsCount} registered vendors`,
      icon: Users,
    },
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      description: 'Active products in catalog',
      icon: Package,
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      description: 'Across all vendors',
      icon: ShoppingCart,
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      description: 'Excludes cancelled orders',
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.slice(0, 5).map((u) => (
                <div key={u._id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="text-xs font-semibold capitalize bg-secondary px-2 py-1 rounded">
                    {u.role === USER_ROLES.VENDER ? 'vendor' : u.role}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((p) => (
                <div key={p._id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded bg-secondary">
                      {p.images?.[0]?.url && (
                        <img src={p.images[0].url} alt={p.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                      <p className="text-xs text-muted-foreground">${p.price}</p>
                    </div>
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {p.inStock} in stock
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
