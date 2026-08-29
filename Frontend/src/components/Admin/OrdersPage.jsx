import React from 'react';
import { useGetAllOrdersQuery } from '../../store/api/orderApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrdersPage = () => {
  const { data: ordersData, isLoading } = useGetAllOrdersQuery();

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading orders...</div>;
  }

  const orders = ordersData?.data || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped':
      case 'out_for_delivery': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
              <div className="col-span-3">Order ID</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Payment</div>
            </div>
            <div className="divide-y">
              {orders.map((order) => (
                <div key={order._id} className="grid grid-cols-12 items-center gap-4 p-4 text-sm">
                  <div className="col-span-3 font-mono text-muted-foreground">
                    {order._id.slice(-8)}
                  </div>
                  <div className="col-span-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 font-medium">
                    ${order.totalPrice?.toFixed(2)}
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="col-span-2">
                    {order.paymentInfo?.status || 'Unknown'}
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No orders found.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
