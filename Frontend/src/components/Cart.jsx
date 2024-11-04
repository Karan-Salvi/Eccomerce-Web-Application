import React, { useEffect, useState } from "react";
import Cartcard from "./Cartcard";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsActions } from "../store/cartSlice";
import Address from "./Address";
import PaymentInfo from "./PaymentInfo";
import { stepSliceActions } from "../store/stepSlice";
import { BACKEND_URL } from "../constants";

const Cart = () => {
  const cartItems = useSelector((store) => store.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    async function use() {
      const localItems = JSON.parse(localStorage.getItem("cartItems"));
      if (cartItems.length === 0 && localItems !== undefined) {
        dispatch(cartItemsActions.addInitialItems(localItems));
      } else if (localItems === null) {
        cartItems = cartItems;
      }
    }
    use();
  }, []);

  const createOrder = async (price) => {
    const key = await fetch(`${BACKEND_URL}/api/v1/order/new/getkey`, {
      method: "GET",
      credentials: "include",
    });
    const keyValue = await key.json();

    console.log("KeyValue", keyValue);

    const responce = await fetch(`${BACKEND_URL}/api/v1/order/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: price,
      }),
      credentials: "include",
    });
    const value = await responce.json();

    console.log(value);
    var options = {
      key: keyValue.key,
      amount: value.data.amount,
      currency: "INR",
      name: "TrendyCart",
      description: "Test Transaction",
      image:
        "https://t3.ftcdn.net/jpg/03/14/85/06/360_F_314850659_2aQLerz30kWj78tqpaGSbzYD6sAUmuDf.jpg",
      order_id: value.data.id,
      callback_url: `${BACKEND_URL}/api/v1/order/new/verified`,
      prefill: {
        name: keyValue.user.name,
        email: keyValue.user.email,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log(window);

    const razor = new window.Razorpay(options);
    razor.open();
  };

  // let cartItems;

  // cartItems = JSON.parse(localStorage.getItem("cartItems"));
  // useEffect(() => {
  //   if (cartItems === undefined) {
  //     console.log("CartItems Are : ", cartItems);
  //     localStorage.setItem("cartItems", JSON.stringify([]));
  //     cartItems = JSON.parse(localStorage.getItem("cartItems"));
  //   }

  // }, [cartItemInData]);
  let Totalamount = 0;
  cartItems?.forEach((cartItem) => {
    Totalamount = Totalamount + cartItem.price;
  });
  //const [stepList, setStepList] = useState([1]);
  const stepList = useSelector((store) => store.stepList);
  const [selectedStep, setSelectedStep] = useState(1);
  const [payment, setPayment] = useState("COD");

  return (
    <>
      <div className="w-full h-auto flex justify-between p-5">
        <div className="w-full h-auto flex flex-col items-center">
          <button
            type="button"
            className={`rounded-full border-gray-300 border-2 w-10 h-10 ${
              stepList.includes(1) && "bg-black text-white"
            }`}
            onClick={() => setSelectedStep(1)}
          >
            1
          </button>
          <p className="text-sm text-gray-500">Shoping Cart</p>
        </div>
        <div className="w-full h-auto flex flex-col items-center">
          <button
            type="button"
            className={`rounded-full border-gray-300 border-2 w-10 h-10 ${
              stepList.includes(2) && "bg-black text-white"
            }`}
            onClick={() => setSelectedStep(2)}
          >
            2
          </button>
          <p className="text-sm text-gray-500">Address</p>
        </div>
        <div className="w-full h-auto flex flex-col items-center">
          <button
            type="button"
            className={`rounded-full border-gray-300 border-2 w-10 h-10 ${
              stepList.includes(3) && "bg-black text-white"
            }`}
            onClick={() => setSelectedStep(3)}
          >
            3
          </button>
          <p className="text-sm text-gray-500">Payment Info</p>
        </div>
      </div>
      <div className="w-full h-auto mx-auto flex flex-col bg-white gap-2 items-center lg:flex-row lg:items-start p-2 lg:pt-3 md:px-3 md:w-10/12 px-4 py-5 md:py-10">
        <div className="w-full h-auto flex flex-col items-center gap-2">
          <div
            className={`w-full h-full 
            flex flex-col items-center gap-2 ${selectedStep !== 1 && "hidden"}`}
          >
            {cartItems?.map((cartItem) => (
              <Cartcard cartItem={cartItem} key={cartItem._id} />
            ))}
          </div>

          <Address
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
          />
          <PaymentInfo
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
            payment={payment}
            setPayment={setPayment}
          />
        </div>
        <div className="w-full h-auto bg-white p-2 border-t-2 md:border-t-0 md:border-l-2">
          <p className="flex justify-between">
            <p className="text-sm font-semibold py-4">
              PRICE DETAILS{" "}
              <span>{`(${cartItems ? cartItems?.length : 0} Items)`}</span>
            </p>
          </p>

          <div className="w-full h-auto flex flex-col items-center gap-2 ">
            <div className="w-full flex justify-between px-1">
              <p className="text-sm text-gray-500">Total MRP</p>
              <p className="text-sm text-black">₹{`${Totalamount * 1.7}`}</p>
            </div>

            <div className="w-full flex justify-between px-1">
              <p className="text-sm text-gray-500">Discount on MRP</p>
              <p className="text-sm text-green-600">
                - ₹{`${Totalamount * 1.7 - Totalamount}`}
              </p>
            </div>

            <div className="w-full flex justify-between px-1">
              <p className="text-sm text-gray-500">Platform Fee</p>
              <p className="text-sm text-green-600">FREE</p>
            </div>

            <div className="w-full flex justify-between px-1">
              <p className="text-sm text-gray-500">Shipping Fee</p>
              <p className="text-sm text-green-600">
                <span className="text-xs text-black line-through">₹79</span>
                FREE
              </p>
            </div>

            <div className="w-full flex justify-between border-t-2 border-gray-400 px-1">
              <p className="text-sm text-gray-700 font-bold">Total Amount</p>
              <p className="text-sm text-green-600">₹{`${Totalamount}`}</p>
            </div>
          </div>
          <div
            className={`flex justify-center items-center w-full py-3 ${
              stepList.length < 2 && "hidden"
            }`}
          >
            <button
              className="w-full h-auto bg-gray-600 py-2 text-white rounded-lg hover:bg-gray-700"
              onClick={() => {
                payment === "ONLINE" && createOrder(Totalamount);
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
