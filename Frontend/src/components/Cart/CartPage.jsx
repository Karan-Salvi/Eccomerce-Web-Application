import React, { useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from '../../store/api/authApi';

const CartPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [disPrice, setDisPrice] = useState(0);
  const [change, setChange] = useState(false);

  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const updateQuantity = async (productId, quantity, size, color) => {
    if (quantity < 0) {
      return;
    }
    await addToCart({
      productId,
      quantity,
      size,
      color,
    });
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity };
      }

      return item;
    });

    setCart(updatedCart);
  };

  const TotalPrice = () => {
    let total = 0;
    user.data.cart.forEach((item) => {
      total += item.productId.originalPrice * (item.quantity || 1);
    });

    return total;
  };

  const discountPrice = () => {
    let total = 0;
    user.data.cart.forEach((item) => {
      total += item.productId.price * (item.quantity || 1);
    });

    return total;
  };

  useEffect(() => {
    setCart(user?.data?.cart);
    setTotalPrice(TotalPrice());
    setDisPrice(discountPrice());
  }, [user, user?.data?.cart]);

  useEffect(() => {
    setTotalPrice(TotalPrice());
    setDisPrice(discountPrice());
  }, [user, user?.data?.cart, change]);

  if (user?.data?.cart?.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-gray-300" />
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Your cart is empty
          </h2>
          <p className="mb-8 text-gray-600">
            Start shopping to add items to your cart
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
            {cart?.map((item, index) => (
              <div
                key={index}
                className={`p-6 ${
                  index !== cart.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item?.productId?.images[0]?.url}
                    alt={item?.productId?.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-gray-800">
                      {item?.productId?.name}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">
                      {item?.productId?.category}
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{item?.productId?.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center rounded-lg bg-gray-100">
                      <button
                        onClick={() => {
                          // setChange(!change),
                          updateQuantity(
                            item.productId._id,
                            item.quantity - 1,
                            item.variant.size,
                            item.variant.color
                          );
                        }}
                        className="cursor-pointer rounded-l-lg p-2 transition-colors hover:bg-gray-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          (setChange(!change),
                            updateQuantity(
                              item.productId._id,
                              item.quantity + 1,
                              item.variant.size,
                              item.variant.color
                            ));
                        }}
                        className="cursor-pointer rounded-r-lg p-2 transition-colors hover:bg-gray-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        (setChange(!change),
                          removeFromCart({ productId: item._id }));
                      }}
                      className="cursor-pointer rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 rounded-sm border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Order Summary
            </h2>

            <div className="mb-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Price</span>
                <span className="font-semibold line-through">
                  ₹ {totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discounted Price</span>
                <span className="font-semibold">₹ {disPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">
                  ₹ {(disPrice * 0.08).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-orange-600">
                    ₹{(disPrice + disPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full cursor-pointer rounded-lg bg-orange-600 py-3 font-semibold text-white transition-colors hover:bg-orange-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
