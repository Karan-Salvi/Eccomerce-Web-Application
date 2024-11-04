import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../store/messageSlice";

const CreateProduct = () => {
  const message = useSelector((store) => store.message);

  const dispatch = useDispatch();
  const nameElement = useRef();
  const descriptionElement = useRef();
  const priceElement = useRef();
  const stockElement = useRef();
  const categoryElement = useRef();

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [image5, setImage5] = useState();

  const UploadProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const name = nameElement.current.value;
    const description = descriptionElement.current.value;
    const price = priceElement.current.value;
    const stock = stockElement.current.value;
    const category = categoryElement.current.value;

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("image", image1);
    formData.append("image", image2);
    formData.append("image", image3);
    formData.append("image", image4);
    formData.append("image", image5);

    console.log("FormData is : ", formData);
    const responce = await fetch(`${BACKEND_URL}/api/v1/product/new`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const data = await responce.json();

    console.log("Data is after  :", data);

    if (data.success === true) {
      dispatch(
        messageActions.setMessage({
          success: data.success,
          message: data.message,
        })
      );
      nameElement.current.value = "";
      descriptionElement.current.value = "";
      priceElement.current.value = "";
      stockElement.current.value = "";
      categoryElement.current.value = "";
      setImage1();
      setImage2();
      setImage3();
      setImage4();
      setImage5();
    }
  };

  return (
    <>
      <form className="w-10/12 mx-auto md:w-4/6 my-5" onSubmit={UploadProduct}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Product Name:
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter product name..."
            required
            ref={nameElement}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Product Description :
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Product Description.."
            ref={descriptionElement}
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Product Price:
          </label>
          <input
            type="text"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter product price..."
            required
            ref={priceElement}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="stock"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Stock Available :
          </label>
          <input
            type="text"
            id="stock"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=" Enter Stock Available..."
            required
            ref={stockElement}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Category :
          </label>
          <input
            type="text"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Category..."
            required
            ref={categoryElement}
          />
        </div>

        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload Images: (Please upload 5 images)
          </label>
          <div className="grid grid-cols-1 gap-1">
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="user_avatar"
              type="file"
              required
              onChange={(e) => {
                setImage1(e.target.files[0]);
              }}
            />
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="user_avatar"
              type="file"
              required
              onChange={(e) => {
                setImage2(e.target.files[0]);
              }}
            />
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="user_avatar"
              type="file"
              required
              onChange={(e) => {
                setImage3(e.target.files[0]);
              }}
            />
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="user_avatar"
              type="file"
              required
              onChange={(e) => {
                setImage4(e.target.files[0]);
              }}
            />
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="user_avatar"
              type="file"
              required
              onChange={(e) => {
                setImage5(e.target.files[0]);
              }}
            />
          </div>

          <div className="mb-5 my-3">
            <button
              type="submit"
              className=" w-full text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex justify-center items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
