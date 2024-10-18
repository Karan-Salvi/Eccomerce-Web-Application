import React from "react";
import { FaCamera } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FaBoxOpen } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { RiContactsBook3Fill } from "react-icons/ri";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <>
      <div className="w-full h-auto p-3 border-b-2 bg-white hidden md:block">
        <p className="text-base font-bold text-gray-800">Profile Details</p>
      </div>
      <div className="w-full h-auto flex flex-col items-center gap-2 pb-2 bg-gray-200 md:grid md:grid-cols-3 md:p-3 md:pb-96">
        <div className="w-full h-auto p-3 border-b-2 bg-white md:hidden">
          <p className="text-base font-bold text-gray-800">Profile Details</p>
        </div>

        <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
          <div className="w-full h-full relative flex justify-center">
            <div className="w-28 h-28 overflow-hidden object-center rounded-full border-4 border-blue-700 ">
              <img
                src="./images/product1.jpg"
                className="w-auto h-auto"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <p className="font-semibold text-lg">Priyanka Chopra</p>
            <p className="text-sm ">Priyanka@gmail.com</p>
            <button
              type="button"
              className=" w-20 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <CiEdit className="text-lg " />
              Edit
            </button>
          </div>
        </div>

        <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-auto h-full overflow-hidden object-center">
              <FaBoxOpen className="text-9xl text-orange-600" />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <p className="font-semibold text-lg">My Orders</p>
            <p className="text-sm ">Track your orders, manage your orders</p>
            <button
              type="button"
              className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <FaArrowAltCircleRight className="text-lg " />
              Go to your orders
            </button>
          </div>
        </div>

        <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-auto h-full overflow-hidden object-center">
              <TfiHeadphoneAlt className="text-9xl text-green-900" />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <p className="font-semibold text-lg">Contact Us</p>
            <p className="text-sm ">
              Contact our customer care and ask anything any time
            </p>
            <button
              type="button"
              className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <RiContactsBook3Fill className="text-lg " />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
