import React from 'react';
import { useGetAllOrdersQuery } from '../../store/api/orderApi';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ClipboardList } from 'lucide-react';

const formatCurrency = (value) => `₹${new Intl.NumberFormat('en-US').format(Math.round(value || 0))}`;

const STATUS_STYLES = {
  delivered: 'bg-green-50 text-green-700',
  processing: 'bg-blue-50 text-blue-700',
  shipped: 'bg-amber-50 text-amber-700',
  out_for_delivery: 'bg-amber-50 text-amber-700',
  cancelled: 'bg-red-50 text-red-700',
};

const getStatusStyle = (status) => STATUS_STYLES[status] || 'bg-zinc-100 text-zinc-700';

const OrdersPage = () => {
  const { data: ordersData, isLoading } = useGetAllOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-amber-600" />
      </div>
    );
  }

  const orders = ordersData?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900">Orders</h2>
        <p className="text-muted-foreground">Every order placed storewide</p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center">
          <ClipboardList className="h-10 w-10 text-zinc-300" strokeWidth={1.5} />
          <h3 className="mt-4 text-lg font-semibold text-zinc-900">No orders yet</h3>
          <p className="text-muted-foreground mt-1">Orders will show up here once placed.</p>
        </div>
      ) : (
        <Card className="overflow-hidden py-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b bg-zinc-50 text-left text-xs font-medium text-zinc-500 uppercase">
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="text-muted-foreground px-6 py-4 font-mono text-xs">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-900 tabular-nums">
                      {formatCurrency(order.totalPrice)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={cn('border-none capitalize', getStatusStyle(order.orderStatus))}>
                        {order.orderStatus?.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="text-muted-foreground px-6 py-4 capitalize">
                      {order.paymentInfo?.status || 'Unknown'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CardContent className="border-t px-6 py-3">
            <p className="text-muted-foreground text-sm">{orders.length} orders</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersPage;
