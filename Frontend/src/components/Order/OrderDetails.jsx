import { Link } from 'react-router-dom';

const formatPrice = (amount) => `₹${Number(amount ?? 0).toFixed(2)}`;

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

const PAYMENT_LABELS = {
  stripe: 'Card',
  cod: 'Cash on delivery',
};

export const OrderDetailsSkeleton = () => (
  <div className="mx-auto max-w-3xl animate-pulse space-y-6 px-4 py-10">
    <div className="h-40 rounded-2xl bg-zinc-100" />
    <div className="h-48 rounded-2xl bg-zinc-100" />
  </div>
);

export const OrderNotFound = () => (
  <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
    <h1 className="text-xl font-bold text-zinc-900">Couldn&apos;t find this order</h1>
    <p className="mt-2 text-sm text-zinc-600">
      It may not exist, or it belongs to a different account.
    </p>
    <Link
      to="/profile"
      className="mt-6 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
    >
      View your orders
    </Link>
  </div>
);

export const OrderDetails = ({ order }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200 sm:p-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <p className="mb-1 text-sm text-zinc-500">Order number</p>
            <p className="font-medium text-zinc-900">#{order._id.slice(-8).toUpperCase()}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-zinc-500">Date</p>
            <p className="font-medium text-zinc-900">
              {new Date(order.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div>
            <p className="mb-1 text-sm text-zinc-500">Payment method</p>
            <p className="font-medium text-zinc-900">
              {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
            </p>
          </div>
          <div>
            <p className="mb-1 text-sm text-zinc-500">Total amount</p>
            <p className="font-medium text-zinc-900 tabular-nums">{formatPrice(order.totalPrice)}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[order.orderStatus] ?? 'bg-zinc-100 text-zinc-700'}`}
          >
            {STATUS_LABELS[order.orderStatus] ?? order.orderStatus}
          </span>
          {order.shippingInfo && (
            <span className="text-sm text-zinc-500">
              Shipping to {order.shippingInfo.city}, {order.shippingInfo.state}
            </span>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200 sm:p-8">
        <h2 className="mb-5 text-lg font-semibold text-zinc-900">Items ordered</h2>
        <div className="space-y-4">
          {order.orderItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                {item.product && (
                  <img
                    src={item.product.images?.[0]?.url}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                {item.product ? (
                  <Link
                    to={`/product/${item.product._id}`}
                    className="truncate font-medium text-zinc-900 hover:text-amber-600"
                  >
                    {item.product.name}
                  </Link>
                ) : (
                  <p className="text-zinc-500 italic">Product no longer available</p>
                )}
                <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
              </div>
              <div className="font-medium text-zinc-900 tabular-nums">{formatPrice(item.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
