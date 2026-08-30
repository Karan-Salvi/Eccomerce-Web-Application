import { useMemo, useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from '../../store/api/authApi';
import { Reveal } from '../Home/Reveal';
import AddAddressDialog from '../Product/AddAddressDialog';
import PlaceOrderButton from '../Product/PlaceOrderButton';

const formatPrice = (amount) => `₹${Number(amount ?? 0).toFixed(2)}`;

const CartPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [addToCart, { isLoading: isUpdatingQuantity }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  const [pendingAddress, setPendingAddress] = useState(null);
  const [showAddressDialog, setShowAddressDialog] = useState(false);

  const cartItems = useMemo(
    () => (user?.data?.cart ?? []).filter((item) => item.productId),
    [user]
  );

  const { subtotal, savings } = useMemo(() => {
    let subtotal = 0;
    let original = 0;
    cartItems.forEach((item) => {
      const qty = item.quantity || 1;
      subtotal += item.productId.price * qty;
      original += (item.productId.originalPrice || item.productId.price) * qty;
    });
    return { subtotal, savings: original - subtotal };
  }, [cartItems]);

  const savedAddress = user?.data?.addressInfo?.[0];
  const shippingAddress = pendingAddress || savedAddress;

  const order = shippingAddress
    ? {
        shippingInfo: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          country: shippingAddress.country,
          pinCode: Number(shippingAddress.pinCode),
          phoneNo: Number(shippingAddress.phoneNo),
        },
        orderItems: cartItems.map((item) => ({
          price: item.productId.price,
          quantity: item.quantity || 1,
          product: item.productId._id,
        })),
        itemsPrice: Number(subtotal.toFixed(2)),
        taxPrice: 0,
        shippingPrice: 0,
        paymentMethod: 'stripe',
      }
    : null;

  const handleQuantityChange = (item, nextQuantity) => {
    if (nextQuantity < 1) {
      removeFromCart({ productId: item._id });
      return;
    }
    addToCart({
      productId: item.productId._id,
      quantity: nextQuantity,
      size: item.variant?.size,
      color: item.variant?.color,
    });
  };

  const isBusy = isUpdatingQuantity || isRemoving;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
          <ShoppingBag className="h-16 w-16 text-zinc-300" />
          <h2 className="mt-6 text-2xl font-bold text-zinc-900">Your cart is empty</h2>
          <p className="mt-2 text-zinc-600">Browse the catalog and add something you like.</p>
          <Link
            to="/products"
            className="mt-6 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Shopping Cart</h1>

        <Reveal className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200">
              {cartItems.map((item) => {
                const qty = item.quantity || 1;
                return (
                  <div key={item._id} className="flex gap-4 p-5 sm:p-6">
                    <img
                      src={item.productId.images?.[0]?.url}
                      alt={item.productId.name}
                      className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-zinc-900">
                          {item.productId.name}
                        </h3>
                        <p className="text-sm text-zinc-500">{item.productId.category}</p>
                        <p className="mt-1 text-lg font-bold text-zinc-900 tabular-nums">
                          {formatPrice(item.productId.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-zinc-300">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item, qty - 1)}
                            disabled={isBusy}
                            aria-label="Decrease quantity"
                            className="cursor-pointer rounded-l-full p-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[2rem] px-1 text-center font-medium text-zinc-900">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item, qty + 1)}
                            disabled={isBusy}
                            aria-label="Increase quantity"
                            className="cursor-pointer rounded-r-full p-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart({ productId: item._id })}
                          disabled={isBusy}
                          aria-label={`Remove ${item.productId.name} from cart`}
                          className="cursor-pointer rounded-full p-2.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
                <h2 className="mb-5 text-lg font-bold text-zinc-900">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Subtotal</span>
                    <span className="font-semibold text-zinc-900 tabular-nums">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-600">You're saving</span>
                      <span className="font-semibold text-emerald-600 tabular-nums">
                        {formatPrice(savings)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Shipping</span>
                    <span className="font-semibold text-zinc-900">Free</span>
                  </div>
                  <div className="border-t border-zinc-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-zinc-900">Total</span>
                      <span className="text-lg font-bold text-zinc-900 tabular-nums">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {order ? (
                    <PlaceOrderButton order={order} />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAddressDialog(true)}
                      className="h-11 w-full cursor-pointer rounded-full bg-amber-600 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
                    >
                      Add shipping address to check out
                    </button>
                  )}
                </div>
              </div>

              {shippingAddress && (
                <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-zinc-900">Shipping to</h3>
                    <button
                      type="button"
                      onClick={() => setShowAddressDialog(true)}
                      className="cursor-pointer text-sm font-medium text-amber-600 hover:text-amber-700"
                    >
                      Change
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">
                    {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state}{' '}
                    {shippingAddress.pinCode}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      <AddAddressDialog
        open={showAddressDialog}
        onOpenChange={setShowAddressDialog}
        addressId={savedAddress?._id}
        initialValues={savedAddress}
        onSaved={(address) => {
          setPendingAddress(address);
          setShowAddressDialog(false);
        }}
      />
    </div>
  );
};

export default CartPage;
