import React, { useRef, useState } from "react";
import { MdOutlinePreview } from "react-icons/md";
import { useDispatch } from "react-redux";
import { messageActions } from "../store/messageSlice";
import { MdDelete } from "react-icons/md";

const GetReview = () => {
  const [reviews, setReviews] = useState([]);
  const productCodeElement = useRef();
  const dispatch = useDispatch();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const url = `${BACKEND_URL}/api/v1/reviews`;
    const responce = await fetch(`${url}/${productCodeElement.current.value}`, {
      method: "GET",

      credentials: "include",
    });

    const value = await responce.json();

    setReviews(value.data);

    if (value.success === true) {
      dispatch(
        messageActions.setMessage({ success: true, message: value.message })
      );
    }
  };

  const handleDelete = async (productId) => {
    const url = `${BACKEND_URL}/api/v1/review/delete`;
    const responce = await fetch(`${url}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId: productCodeElement.current.value }),
    });
    const value = await responce.json();
    console.log(productCodeElement.current.value);
    console.log(value);
    if (value.success === true) {
      dispatch(
        messageActions.setMessage({ success: true, message: value.message })
      );
    }
  };
  return (
    <>
      <form className="w-10/12 mx-auto md:w-4/6 my-5" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Product Code:
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Product Code.."
            required
            ref={productCodeElement}
          />
        </div>
        <div className="mb-5 my-3">
          <button
            type="submit"
            className=" w-full text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex justify-center items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <MdOutlinePreview /> Get All Reviews
          </button>
        </div>
      </form>
      <div className="w-10/12 mx-auto h-auto bg-white">
        <p className="flex justify-between  p-2">
          <p
            className={`text-sm font-semibold ${
              reviews.length === 0 && "hidden"
            }`}
          >
            Reviews
          </p>
        </p>

        {reviews &&
          reviews.map((review) => (
            <button type="button" className="relative w-full" key={review._id}>
              <div
                className="flex-flex-col p-3 border-2 border-gray-300 m-2 rounded-lg"
                // key={review.createdBy}
              >
                <p className="text-sm  text-gray-700 text-start">
                  {review.comment}
                </p>
                <p className="text-xs text-end font-bold text-gray-600 poppins">
                  : {review.createdBy}
                </p>
              </div>
              <span className="sr-only">Notifications</span>
              <div
                className="absolute inline-flex items-center justify-center w-8 h-8 text-lg font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0 -end-0 dark:border-gray-900"
                onClick={() => {
                  handleDelete(review._id);
                }}
              >
                <MdDelete />
              </div>
            </button>
          ))}
      </div>
    </>
  );
};

export default GetReview;
