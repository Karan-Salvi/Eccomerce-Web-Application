import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentDone = () => {
  const searchQuery = useSearchParams()[0];
  const reference = searchQuery.get("reference");

  console.log(reference);
  return (
    <div>
      <div className="w-full h-[85vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Order Payment Done Successfully</h1>
        <p className="text-base font-medium m-5">Payment ID:{reference}</p>
      </div>
    </div>
  );
};

export default PaymentDone;
