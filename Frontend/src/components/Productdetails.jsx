import React, { useEffect, useRef, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../store/messageSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cartItemsActions } from "../store/cartSlice";
import Container from "./Container";

const Productdetails = () => {
  const reviewElement = useRef();
  const ratingElement = useRef();

  const [sizeElement, setSizeElement] = useState("");

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cartItems);

  const [currentProduct, setCurrentProduct] = useState({});
  const url = `${BACKEND_URL}/api/v1/product`;

  const handleOnsubmit = async (event) => {
    event.preventDefault();
    const url = `${BACKEND_URL}/api/v1/review`;
    const responce = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: ratingElement.current.value,
        comment: reviewElement.current.value,
        productId: String(localStorage.getItem("productId")),
      }),
    });

    const value = await responce.json();

    if ((value.success = true)) {
      reviewElement.current.value = "";
      dispatch(
        messageActions.setMessage({ success: true, message: value.message })
      );
    }
  };

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

  const handleAddToBag = async (
    _id,
    description,
    name,
    price,
    images,
    sizeElement
  ) => {
    const cartItem = {
      _id,
      description,
      name,
      price,
      images,
      sizeElement,
    };

    dispatch(cartItemsActions.addNewItem(cartItem));
    if (cartItems.length === 0) {
      localStorage.setItem("cartItems", JSON.stringify([cartItem]));
    } else {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([cartItem, ...cartItems])
      );
    }
    dispatch(
      messageActions.setMessage({
        success: true,
        message: "Product added in bag successfully..",
      })
    );
  };

  useEffect(() => {
    async function getProductDetail() {
      const responce = await fetch(
        `${url}/${String(localStorage.getItem("productId"))}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const value = await responce.json();

      setCurrentProduct(value.data);
    }
    getProductDetail();
  }, []);

  const { name, description, price, ratings, images, reviews, _id } =
    currentProduct;

  const sizeList = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <>
      <div className="w-full h-auto flex flex-col gap-2 bg-gray-300 md:flex-row md:bg-white md:mt-4 ">
        <div className="w-full md:max-w-[50vw] md:max-h-96 h-96 flex flex-col bg-white md:sticky mx-auto">
          <div className="flex overflow-x-auto overflow-y-hidden gap-5  mx-5 no-scrollbar m-2 ">
            {images?.map((image) => (
              <div className="h-full min-w-56 bg-slate-300 text-center object-contain flex justify-center items-center">
                <img
                  src={`${image.url}`}
                  className="w-auto h-full"
                  alt="Product Image"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-auto md:hidden bg-white flex-col p-4 gap-4">
          <p className="text-xl font-bold poppins py-2">{name}</p>
          <p className=" text-xs text-gray-400">
            <span className="text-base font-bold text-black">{price}</span> MRP
            <span className="text-xs font-bold line-through">
              {" "}
              {price * 2}{" "}
            </span>
            <span className="text-lg font-bold text-red-600">
              {" "}
              {`    (${50}% OFF )`}
            </span>
          </p>
        </div>

        <div className="w-full h-auto flex flex-col md:overflow-y-scroll md:h-[100vh] md:no-scrollbar">
          <div className="w-full h-auto hidden md:flex flex-col p-4 gap-4">
            <p className="text-3xl font-bold poppins py-2">{name}</p>
            <p className=" text-sm text-gray-400">
              <span className="text-lg font-bold text-black">{price}</span> MRP
              <span className="text-sm font-bold line-through">
                {" "}
                {price * 2}{" "}
              </span>
              <span className="text-lg font-bold text-red-600">
                {" "}
                {`    (${50}% OFF )`}
              </span>
            </p>
          </div>
          <div className="w-full h-auto bg-white">
            <p className="flex justify-between  p-2">
              <p className="text-sm font-semibold">Select Size</p>
              <p className="text-sm font-semibold text-red-600">SIZE CHART</p>
            </p>
            <div className="grid grid-cols-6 content-center place-self-center p-3">
              {sizeList.map((size) => (
                <p
                  onClick={() => {
                    setSizeElement(size);
                  }}
                  key={size}
                  className={`rounded-lg border-2 border-gray-300 w-12 h-12 flex justify-center items-center text-sm font-bold cursor-pointer ${
                    size === sizeElement
                      ? "bg-gray-400 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {size}
                </p>
              ))}
            </div>

            <div className="flex justify-between items-center p-4">
              <Link
                type="button"
                className=" w-1/2 bg-white border-2 text-black hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center justify-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={() => createOrder(price)}
              >
                <FaShoppingCart className="text-lg m-1" />
                Buy Now
              </Link>
              <button
                type="button"
                className=" w-1/2 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex justify-center items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={() =>
                  handleAddToBag(
                    _id,
                    description,
                    name,
                    price,
                    images,
                    sizeElement
                  )
                }
              >
                <FaShoppingBag className="text-lg m-1" />
                Add to bag
              </button>
            </div>
          </div>

          <div className="w-full h-auto bg-white">
            <p className="flex justify-between  p-2">
              <p className="text-sm font-semibold">Product Details</p>
            </p>
            <p className="text-sm  text-gray-700 p-2">{description}</p>
          </div>

          <div className="w-full h-auto bg-white flex justify-between p-3">
            <p className="flex justify-between">
              <p className="text-sm font-semibold">Rating</p>
            </p>
            <div className="flex items-center">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                {ratings || 4.5}
              </span>
            </div>
          </div>

          <div className="w-full h-auto bg-white">
            <p className="flex justify-between  p-2">
              <p className="text-sm font-semibold">Reviews</p>
            </p>
            {reviews &&
              reviews.map((review) => (
                <Container key={review.createdBy}>
                  <div className="flex-flex-col p-3 border-2 border-gray-300 m-2 rounded-lg">
                    <p className="text-sm  text-gray-700 text-start">
                      {review.comment}
                    </p>
                    <p className="text-xs text-end font-bold text-gray-600 poppins">
                      : {review.createdBy}
                    </p>
                  </div>
                </Container>
              ))}

            <div className="flex-flex-col p-3 border-2 border-gray-300 m-2 rounded-lg">
              <form onSubmit={handleOnsubmit}>
                <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label for="comment" class="sr-only">
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      rows="4"
                      class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      placeholder="Write a Review..."
                      required
                      ref={reviewElement}
                    ></textarea>
                  </div>
                  <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button
                      type="submit"
                      class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                      Post Review
                    </button>

                    <form class="max-w-xs">
                      <label
                        for="bedrooms-input"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Give Rating (0-5) :
                      </label>
                      <div class="relative flex items-center max-w-[11rem]">
                        <button
                          type="button"
                          id="decrement-button"
                          data-input-counter-decrement="bedrooms-input"
                          class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            class="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="bedrooms-input"
                          data-input-counter
                          data-input-counter-min="1"
                          data-input-counter-max="5"
                          aria-describedby="helper-text-explanation"
                          class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-4"
                          placeholder=""
                          value="5"
                          required
                          ref={ratingElement}
                        />
                        <button
                          type="button"
                          id="increment-button"
                          data-input-counter-increment="bedrooms-input"
                          class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <svg
                            class="w-3 h-3 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <p className="text-sm font-medium m-4">Product Code : {_id}</p>
        </div>
      </div>
    </>
  );
};

export default Productdetails;
