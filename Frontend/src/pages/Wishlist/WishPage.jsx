import React from "react";
import Navbar from "../../components/Home/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WishPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log("User is : ", isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated || !user || isAuthenticated == undefined) {
    navigate("/login", { replace: true });
    return <LoginPage />;
  }
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="bg-white rounded-md overflow-hidden">
          <div className="p-6  border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Wishlist</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* <!-- Wishlist Item 1 --> */}
              {user?.data?.wishlist?.map((product, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition duration-100"
                >
                  <div className="h-70 mb-3 rounded-lg overflow-hidden">
                    <img
                      src={
                        product?.images[0]?.url || `https://placehold.co/400`
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
    </>
  );
};

export default WishPage;
