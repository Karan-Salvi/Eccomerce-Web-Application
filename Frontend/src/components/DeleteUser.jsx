import React, { useRef } from "react";
import { FaUserAltSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { messageActions } from "../store/messageSlice";

const DeleteUser = () => {
  const productCodeElement = useRef();
  const dispatch = useDispatch();
  const handleOnDelete = async (event) => {
    event.preventDefault();
    const url = `${BACKEND_URL}/api/v1/user/delete`;
    const responce = await fetch(`${url}/${productCodeElement.current.value}`, {
      method: "DELETE",
      credentials: "include",
    });
    const value = await responce.json();

    if (value.success === true) {
      dispatch(
        messageActions.setMessage({ success: true, message: value.message })
      );
    }
  };
  return (
    <>
      <form className="w-10/12 mx-auto md:w-4/6 my-5" onSubmit={handleOnDelete}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter User ID:
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter User ID to be deleted..."
            required
            ref={productCodeElement}
          />
        </div>
        <div className="mb-5 my-3">
          <button
            type="submit"
            className=" w-full text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex justify-center items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <FaUserAltSlash /> Delete
          </button>
        </div>
      </form>
    </>
  );
};

export default DeleteUser;
