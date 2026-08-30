import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useGetMyOrdersQuery } from '../../store/api/orderApi';

const formatPrice = (amount) => `₹${Number(amount ?? 0).toFixed(2)}`;
const primaryImage = (product) => product?.images?.[0]?.url;

const STATUS_STYLES = {
  processing: 'bg-amber-50 text-amber-700',
  shipped: 'bg-blue-50 text-blue-700',
  out_for_delivery: 'bg-blue-50 text-blue-700',
  delivered: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-700',
};

const STATUS_LABELS = {
  processing: 'Processing',
  shipped: 'Shipped',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const OrdersCard = () => {
  const { data, isLoading } = useGetMyOrdersQuery();
  const orders = data?.data ?? [];

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200">
      <div className="border-b border-zinc-200 p-6">
        <h3 className="text-base font-semibold text-zinc-900">Recent orders</h3>
      </div>

      {isLoading && (
        <div className="space-y-4 p-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-zinc-100" />
          ))}
        </div>
      )}

      {!isLoading && orders.length === 0 && (
        <div className="flex flex-col items-center gap-3 p-10 text-center">
          <Package className="h-8 w-8 text-zinc-300" />
          <p className="text-sm text-zinc-500">No orders yet.</p>
          <Link to="/products" className="text-sm font-semibold text-amber-600 hover:text-amber-700">
            Start shopping
          </Link>
        </div>
      )}

      {!isLoading && orders.length > 0 && (
        <div className="max-h-[480px] divide-y divide-zinc-100 overflow-y-auto">
          {orders.map((order) => (
            <div key={order._id} className="p-6">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-zinc-500">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-zinc-500">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[order.orderStatus] ?? 'bg-zinc-100 text-zinc-700'}`}
                >
                  {STATUS_LABELS[order.orderStatus] ?? order.orderStatus}
                </span>
              </div>

              <div className="space-y-3">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                      {item.product && (
                        <img
                          src={primaryImage(item.product)}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      {item.product ? (
                        <Link to={`/product/${item.product._id}`} className="truncate font-medium text-zinc-900 hover:text-amber-600">
                          {item.product.name}
                        </Link>
                      ) : (
                        <p className="text-zinc-500 italic">Product no longer available</p>
                      )}
                      <p className="text-zinc-500">
                        Qty {item.quantity} &middot; {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-right text-sm font-semibold text-zinc-900">
                Total {formatPrice(order.totalPrice)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersCard;
