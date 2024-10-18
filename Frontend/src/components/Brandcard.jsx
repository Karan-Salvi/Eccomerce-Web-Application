import React from "react";

const Brandcard = ({ product }) => {
  const { name, imagePath, minDiscount, maxDiscount } = product;
  return (
    <>
      <div className="w-full h-72 md:h-96 flex flex-col justify-between bg-blue-700 p-3">
        <div className="w-full h-2/3 overflow-hidden object-cover object-center">
          <img src={imagePath} className="w-full h-auto" alt="" />
        </div>
        <div className="w-full h-1/3 flex flex-col items-center">
          <h1 className="text-[1.1rem] text-white font-light">{name}</h1>
          <p className="text-2xl font-extrabold text-white">{`${minDiscount}-${maxDiscount}% OFF`}</p>
          <p className="text-[1rem] text-white font-light">Shop Now </p>
        </div>
      </div>
    </>
  );
};

export default Brandcard;
