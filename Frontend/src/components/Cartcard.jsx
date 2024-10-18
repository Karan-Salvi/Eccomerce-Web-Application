import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsActions } from "../store/cartSlice";
import { messageActions } from "../store/messageSlice";

const Cartcard = ({ cartItem }) => {
  const { _id, description, name, price, images, sizeElement } = cartItem;

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cartItems);

  const handleOnDelete = async () => {
    dispatch(cartItemsActions.deleteItem(_id));

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item._id !== _id))
    );
    dispatch(
      messageActions.setMessage({
        success: true,
        message: "Product removed From bag successfully..",
      })
    );
  };

  return (
    <>
      <div className="w-full h-64 flex justify-between bg-white border-2 border-gray-200 p-2">
        <div className="w-1/2 h-full overflow-hidden object-center">
          <img src="./images/product2.jpg" className=" w-auto h-auto" alt="" />
        </div>
        <div className="w-1/2 h-full flex flex-col p-2">
          <p className="font-medium">{name}</p>
          <p className="flex items-start font-semibold text-sm">
            ₹<span className=" text-xl font-bold poppins">{price}</span>
          </p>
          <p className="text-sm my-2 text-gray-500">
            {description.substring(0, 20)}....
          </p>
          <p className="text-sm text-blue-800">10 days Return & Exchange</p>
          <p className="text-base font-semibold text-gray-600">
            Size : {sizeElement || "Please Select the size"}
          </p>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md px-2 py-1 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 inline-flex items-center text-base my-1"
              onClick={() => handleOnDelete(_id)}
            >
              <MdDelete className="text-lg text-white" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartcard;
