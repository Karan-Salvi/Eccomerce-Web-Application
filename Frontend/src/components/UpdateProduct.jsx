import React, { useRef } from "react";
import { GrDocumentUpdate } from "react-icons/gr";

const UpdateProduct = () => {
  const productCodeElement = useRef();
  const nameElement = useRef();
  const descriptionElement = useRef();
  const categoryElement = useRef();
  const priceElement = useRef();

  const handleOnUpdate = async (event) => {
    event.preventDefault();
    const url = `${BACKEND_URL}/api/v1/product`;
    const responce = await fetch(`${url}/${productCodeElement.current.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameElement.current.value,
        description: descriptionElement.current.value,
        category: categoryElement.current.value,
        price: priceElement.current.value,
      }),
      credentials: "include",
    });

    const value = await responce.json();

    if (value.success === true) {
      productCodeElement.current.value = "";
      nameElement.current.value = "";
      descriptionElement.current.value = "";
      categoryElement.current.value = "";
      priceElement.current.value = "";
    }
  };

  return (
    <>
      <form className="w-10/12 mx-auto md:w-4/6 my-5" onSubmit={handleOnUpdate}>
        <div className="mb-5">
          <label
            htmlFor="ProductCode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Product Code of the product to be updated:
          </label>
          <input
            type="text"
            id="ProductCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Product Code.."
            required
            ref={productCodeElement}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Product Name :
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter updated Name..."
            ref={nameElement}
            required
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
            placeholder="Enter updated Product Description.."
            ref={descriptionElement}
            required
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Product Category
          </label>
          <input
            type="text"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter updated category..."
            ref={categoryElement}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Product Price
          </label>
          <input
            type="text"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter updated price..."
            ref={priceElement}
            required
          />
        </div>

        <div className="mb-5 my-3">
          <button
            type="submit"
            className=" w-full text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 text-center inline-flex justify-center items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <GrDocumentUpdate /> Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProduct;
