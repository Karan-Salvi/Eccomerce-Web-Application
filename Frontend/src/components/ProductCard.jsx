import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, description, price, _id } = product;

  const navigate = useNavigate();

  const getProductDetails = async (_id) => {
    localStorage.setItem("productId", String(_id));
    navigate("/productdetails");
  };

  return (
    <>
      <a
        // href="/productdetails"

        className="w-full h-68 flex flex-col justify-between border-[1px] border-gray-300"
        onClick={() => {
          getProductDetails(_id);
        }}
      >
        <div className="w-full h-[76%] overflow-hidden object-center">
          <img
            src="./images/product1.jpg"
            className="w-full h-full"
            alt="Product Image"
          />
        </div>
        <div className="w-full h-[24%] flex flex-col justify-evenly p-1">
          <p className=" text-sm font-medium poppins ">{name}</p>
          <p className=" text-xs text-gray-500">
            {description.substring(0, 38)}...
          </p>
          <p>
            <span className="text-sm font-bold">{price}</span>{" "}
            <span className="text-xs font-semibold text-gray-500 line-through">
              {price * 2}
            </span>{" "}
            <span className="text-sm font-semibold text-red-600">
              (50% OFF)
            </span>
          </p>
        </div>
      </a>
    </>
  );
};

export default ProductCard;
