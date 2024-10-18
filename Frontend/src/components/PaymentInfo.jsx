import React from "react";
import { SiRazorpay } from "react-icons/si";
import { FcMoneyTransfer } from "react-icons/fc";

const PaymentInfo = ({
  selectedStep,
  setSelectedStep,
  payment,
  setPayment,
}) => {
  return (
    <>
      <div
        className={`w-full h-auto flex flex-col gap-3  ${
          selectedStep !== 3 && "hidden"
        }`}
      >
        <button
          className="flex items-center gap-3 border-2 border-gray-200 p-2 rounded-lg"
          onClick={() => {
            setPayment("ONLINE");
          }}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 border-black ${
              payment === "ONLINE" && "bg-blue-500"
            }`}
          ></div>
          <div className="rounded-full w-10 h-10 bg-gray-200 p-3 ">
            <SiRazorpay className="text-blue-600 w-full h-full" />
          </div>
          <p className="text-base font-semibold">Pay Online </p>
        </button>

        <button
          className="flex items-center gap-3 border-2 border-gray-200 p-2 rounded-lg"
          onClick={() => {
            setPayment("COD");
          }}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 border-black ${
              payment === "COD" && "bg-blue-500"
            }`}
          ></div>
          <div className="rounded-full w-10 h-10 bg-gray-200 p-3 ">
            <FcMoneyTransfer className="text-blue-600 w-full h-full" />
          </div>
          <p className="text-base font-semibold">Cash On Delivery</p>
        </button>
      </div>
    </>
  );
};

export default PaymentInfo;
