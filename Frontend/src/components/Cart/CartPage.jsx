import React, { useEffect, useMemo } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useRemoveFromCartMutation,
} from "../../store/api/authApi";

const CartPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [disPrice, setDisPrice] = useState(0);
  const [change, setChange] = useState(false);

  const [addToWishlist] = useAddToWishlistMutation();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const updateQuantity = async (productId, quantity, size, color) => {
    console.log("productId : ", productId);
    console.log("quantity : ", quantity);
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
      console.log("Updated item with the quantity : ", item);
      return item;
    });

    console.log("updatedCart : ", updatedCart);
    setCart(updatedCart);
  };

  const TotalPrice = () => {
    let total = 0;
    user.data.cart.forEach((item) => {
      total += item.productId.originalPrice * (item.quantity || 1);
    });
    console.log("total : ", total);

    return total;
  };

  const discountPrice = () => {
    let total = 0;
    user.data.cart.forEach((item) => {
      total += item.productId.price * (item.quantity || 1);
    });
    console.log("total : ", total);

    return total;
  };

  console.log("user : ", user?.data?.cart);

  useEffect(() => {
    setCart(user?.data?.cart);
    setTotalPrice(TotalPrice());
    setDisPrice(discountPrice());
  }, [user, user?.data?.cart]);

  useEffect(() => {
    setTotalPrice(TotalPrice());
    setDisPrice(discountPrice());
  }, [user, user?.data?.cart, change]);

  console.log("cart : ", cart);

  if (user?.data?.cart?.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Start shopping to add items to your cart
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
            {cart?.map((item, index) => (
              <div
                key={index}
                className={`p-6 ${
                  index !== cart.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item?.productId?.images[0]?.url}
                    alt={item?.productId?.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {item?.productId?.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item?.productId?.category}
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{item?.productId?.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-gray-100 rounded-lg">
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
                        className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          setChange(!change),
                            updateQuantity(
                              item.productId._id,
                              item.quantity + 1,
                              item.variant.size,
                              item.variant.color
                            );
                        }}
                        className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setChange(!change),
                          removeFromCart({ productId: item._id });
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
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

            <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors cursor-pointer">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
