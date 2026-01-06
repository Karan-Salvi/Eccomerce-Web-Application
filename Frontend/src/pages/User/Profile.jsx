import React from "react";
import "../User/Profile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginPage from "../Auth/Login";
import Navbar from "../../components/Home/Navbar";

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log("User is : ", isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated || !user || isAuthenticated == undefined) {
    navigate("/login", { replace: true });
    return <LoginPage />;
  }
  return (
    <section className="bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        {/* <!-- Header --> */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Profile
          </h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m4 0v1a3 003 003h0a3 3 0 003-3v-1m-4 0h4m-8-4h.01"
                />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
              <img
                src="./images/profile.png"
                alt="Detailed user profile showing a professional headshot with warm smile and business casual attire"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* <!-- Main Content --> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* <!-- Left Column --> */}
          <div className="lg:col-span-1">
            {/* <!-- Profile Card --> */}
            <div className="bg-white rounded-md shadow-md overflow-hidden p-6 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100 ">
                    <img
                      src="./images/profile.png"
                      alt="Detailed user profile showing a professional headshot with warm smile and business casual attire"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user?.data?.name}
                </h2>
                <p className="text-gray-500 mb-2">{user?.data?.role}</p>
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-700">4.8</span>
                  <span className="mx-1 text-gray-400">|</span>
                  <span className="text-gray-500">Member since 2021</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-orange-600 h-2.5 rounded-full w-3/4"></div>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  75% profile complete
                </p>
                <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>

            {/* <!-- Account Details --> */}
            <div className="bg-white rounded-md shadow-md overflow-hidden p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Account Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 block">
                    Full Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {user?.data?.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">Email</label>
                  <p className="text-gray-800 font-medium">
                    {user?.data?.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">Phone</label>
                  <p className="text-gray-800 font-medium">
                    {user?.data?.addressInfo[0]?.phoneNo || "No phone number"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">
                    Shipping Address
                  </label>
                  <p className="text-gray-800 font-medium">
                    {user?.data?.addressInfo[0]?.address || "No address"}
                  </p>
                  <p className="text-gray-800 font-medium">
                    {user?.data?.addressInfo[0]?.city}{" "}
                    {user?.data?.addressInfo[0]?.pinCode}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block">
                    Billing Address
                  </label>
                  <p className="text-gray-800 font-medium">Same as shipping</p>
                </div>
              </div>
              <button className="mt-4 text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Details
              </button>
            </div>
          </div>

          {/* <!-- Right Column --> */}
          <div className="lg:col-span-2 space-y-6">
            {/* <!-- Order History --> */}
            <div className="bg-white rounded-md shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Orders
                </h3>
              </div>
              <div className="overflow-y-auto max-h-[400px]">
                <div className="divide-y divide-gray-200">
                  {/* <!-- Order Item 1 --> */}
                  <div className="p-6 hover:bg-gray-50 transition duration-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-gray-500 text-sm">Order #45829</p>
                        <p className="font-medium text-gray-800">
                          Wireless Headphones Pro
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Delivered
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img
                          src="https://placehold.co/100"
                          alt="Premium wireless headphones with noise cancellation feature hanging on a stand"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-800">Quantity: 1</p>
                        <p className="text-gray-600">₹249.99</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-500">Placed on May 12, 2023</p>
                      <div className="flex space-x-3">
                        <button className="text-orange-600 hover:text-orange-800 font-medium">
                          Track
                        </button>
                        <button className="text-orange-600 hover:text-orange-800 font-medium">
                          Reorder
                        </button>
                        <button className="text-orange-600 hover:text-orange-800 font-medium">
                          Review
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Order Item 2 --> */}
                  <div className="p-6 hover:bg-gray-50 transition duration-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-gray-500 text-sm">Order #45731</p>
                        <p className="font-medium text-gray-800">
                          Smart Watch Series 5
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Shipped
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img
                          src="https://placehold.co/100"
                          alt="Modern smartwatch with fitness tracking capabilities displayed on a black background"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-800">Quantity: 2</p>
                        <p className="text-gray-600">₹179.99 each</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-500">Placed on May 5, 2023</p>
                      <div className="flex space-x-3">
                        <button className="text-orange-600 hover:text-orange-800 font-medium">
                          Track
                        </button>
                        <button className="text-orange-600 hover:text-orange-800 font-medium">
                          Return
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Order Item 3 --> */}
                  <div className="p-6 hover:bg-gray-50 transition duration-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-gray-500 text-sm">Order #45562</p>
                        <p className="font-medium text-gray-800">
                          Leather Wallet & Keychain
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Processing
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img
                          src="https://placehold.co/100"
                          alt="Brown genuine leather wallet with multiple card slots lying on wooden table"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-800">Quantity: 1</p>
                        <p className="text-gray-600">₹34.99</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-500">Placed on April 28, 2023</p>
                      <div className="flex space-x-3">
                        <button className="text-orange-600 hover:text-orange-800 font-medium">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 text-center">
                <button className="text-orange-600 hover:text-orange-800 font-medium">
                  View All Orders
                </button>
              </div>
            </div>

            {/* <!-- Wishlist --> */}
            <div className="bg-white rounded-md shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Wishlist
                  </h3>
                  <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* <!-- Wishlist Item 1 --> */}
                  {user?.data?.wishlist?.slice(0, 3).map((product, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition duration-100"
                    >
                      <div className="h-40 mb-3 rounded-lg overflow-hidden">
                        <img
                          src={
                            product?.images[0]?.url ||
                            `https://placehold.co/400`
                          }
                          alt="Apple iPad Pro 12.9-inch with Magic Keyboard on a desk with coffee cup"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-gray-800 font-medium text-sm mb-1">
                        {product?.name}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        ₹{product?.price}
                      </p>
                      <div className="flex justify-between items-center">
                        <button className="text-red-500 hover:text-red-700 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <button className="bg-orange-600 text-white text-xs px-2 py-1 rounded hover:bg-orange-700 transition duration-100">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* <!-- Wishlist Item 2 --> */}
                  {/* <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition duration-100">
                    <div className="h-40 mb-3 rounded-lg overflow-hidden">
                      <img
                        src="https://placehold.co/400"
                        alt="White wireless charging stand compatible with multiple devices in modern setup"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-800 font-medium text-sm mb-1">
                      Wireless Charger
                    </p>
                    <p className="text-gray-600 text-sm mb-2">$29.99</p>
                    <div className="flex justify-between items-center">
                      <button className="text-red-500 hover:text-red-700 text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button className="bg-orange-600 text-white text-xs px-2 py-1 rounded hover:bg-orange-700 transition duration-100">
                        Add to Cart
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
