import React from "react";

import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdAutoDelete } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { MdOutlinePreview } from "react-icons/md";
import { FaUserAltSlash } from "react-icons/fa";
import { MdBrowserUpdated } from "react-icons/md";

const AdminDashboard = () => {
  return (
    <>
      {" "}
      <div className="w-full h-auto p-3 border-b-2 bg-white hidden md:block">
        <p className="text-base font-bold text-gray-800">Profile Details</p>
      </div>
      <div className="w-full h-auto flex flex-col items-center gap-2 pb-2 bg-gray-200 md:grid md:grid-cols-3 md:p-3 md:pb-96">
        <div className="w-full h-auto p-3 border-b-2 bg-white md:hidden">
          <p className="text-base font-bold text-gray-800">Admin Dashboard</p>
        </div>

        <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-auto h-full overflow-hidden object-center">
              <MdCreateNewFolder className="text-9xl text-green-900" />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <p className="font-semibold text-lg">Create Product</p>
            <p className="text-sm ">
              Create new Product only admin is authorised for this role.
            </p>
            <Link
              to={
                "/admin/admin345/4c3a5b2d9f1e6g8h7j0kmpnqrs5tuvwx2ybz3c4d9e8fghjklmnoiq6p7s9tvywzx1ab2c3de8fgh5jklmno6pq7rs9tuwvyzxc4e6g8hjkmnpqrs2tuvwxyzb3c5d9efghjklmno6iq7p8s9tvwxy/create-post"
              }
              type="button"
              className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <MdCreateNewFolder className="text-lg " />
              Create
            </Link>
          </div>
        </div>

        <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-auto h-full overflow-hidden object-center">
              <MdAutoDelete className="text-9xl text-red-900" />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <p className="font-semibold text-lg">Delete Some Product</p>
            <p className="text-sm ">
              Delete Product only admin is authorised for this role.
            </p>
            <Link
              to={
                "/admin/admin345/4c3a5b2d9f1e6g8h7j0kmpnqrs5tuvwx2ybz3c4d9e8fghjklmnoiq6p7s9tvywzx1ab2c3de8fgh5jklmno6pq7rs9tuwvyzxc4e6g8hjkmnpqrs2tuvwxyzb3c5d9efghjklmno6iq7p8s9tvwxy/delete-product"
              }
              type="button"
              className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <MdDelete className="text-lg " />
              Delete
            </Link>
          </div>
        </div>

        <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-auto h-full overflow-hidden object-center">
              <GrDocumentUpdate className="text-9xl text-blue-700" />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <p className="font-semibold text-lg">Update Some Product</p>
            <p className="text-sm ">
              Update Product Details only admin is authorised for this role.
            </p>
            <Link
              to={
                "/admin/admin345/4c3a5b2d9f1e6g8h7j0kmpnqrs5tuvwx2ybz3c4d9e8fghjklmnoiq6p7s9tvywzx1ab2c3de8fgh5jklmno6pq7rs9tuwvyzxc4e6g8hjkmnpqrs2tuvwxyzb3c5d9efghjklmno6iq7p8s9tvwxy/update-product"
              }
              type="button"
              className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <RxUpdate className="text-lg " />
              Update
            </Link>
          </div>
        </div>

        <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-auto h-full overflow-hidden object-center">
              <MdOutlinePreview className="text-9xl text-black" />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <p className="font-semibold text-lg">Get Products All Reviews</p>
            <p className="text-sm ">Get products all Reviews</p>
            <Link
              to={
                "/admin/admin345/4c3a5b2d9f1e6g8h7j0kmpnqrs5tuvwx2ybz3c4d9e8fghjklmnoiq6p7s9tvywzx1ab2c3de8fgh5jklmno6pq7rs9tuwvyzxc4e6g8hjkmnpqrs2tuvwxyzb3c5d9efghjklmno6iq7p8s9tvwxy/get-review"
              }
              type="button"
              className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <MdOutlinePreview className="text-lg " />
              Check Reviews
            </Link>
          </div>
        </div>

        <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-auto h-full overflow-hidden object-center">
              <FaUserAltSlash className="text-9xl text-red-500" />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <p className="font-semibold text-lg">Delete User</p>
            <p className="text-sm ">Delete user this is authorised task any one can not do it </p>
            <Link
              to={
                "/admin/admin345/4c3a5b2d9f1e6g8h7j0kmpnqrs5tuvwx2ybz3c4d9e8fghjklmnoiq6p7s9tvywzx1ab2c3de8fgh5jklmno6pq7rs9tuwvyzxc4e6g8hjkmnpqrs2tuvwxyzb3c5d9efghjklmno6iq7p8s9tvwxy/delete-user"
              }
              type="button"
              className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <FaUserAltSlash className="text-lg " />
              Delete User
            </Link>
          </div>
        </div>

        <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-auto h-full overflow-hidden object-center">
              <MdBrowserUpdated className="text-9xl text-gray-600" />
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <p className="font-semibold text-lg">Update User Role</p>
            <p className="text-sm ">Update the user role this is also a authorised task only admin can do this </p>
            <Link
              to={
                "/admin/admin345/4c3a5b2d9f1e6g8h7j0kmpnqrs5tuvwx2ybz3c4d9e8fghjklmnoiq6p7s9tvywzx1ab2c3de8fgh5jklmno6pq7rs9tuwvyzxc4e6g8hjkmnpqrs2tuvwxyzb3c5d9efghjklmno6iq7p8s9tvwxy/update-user-role"
              }
              type="button"
              className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <MdBrowserUpdated className="text-lg " />
              Update User role
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
