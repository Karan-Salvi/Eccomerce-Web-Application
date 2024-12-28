// import React from "react";
// import { FaCamera } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import { FaBoxOpen } from "react-icons/fa";
// import { FaArrowAltCircleRight } from "react-icons/fa";
// import { TfiHeadphoneAlt } from "react-icons/tfi";
// import { RiContactsBook3Fill } from "react-icons/ri";
// import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";
// const Profile = () => {
//   return (
//     // <>

//     //   <div className="w-full h-auto p-3 border-b-2 bg-white hidden md:block">
//     //     <p className="text-base font-bold text-gray-800">Profile Details</p>
//     //   </div>
//     //   <div className="w-full h-auto flex flex-col items-center gap-2 pb-2 bg-gray-200 md:grid md:grid-cols-3 md:p-3 md:pb-96">
//     //     <div className="w-full h-auto p-3 border-b-2 bg-white md:hidden">
//     //       <p className="text-base font-bold text-gray-800">Profile Details</p>
//     //     </div>

//     //     <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
//     //       <div className="w-full h-full relative flex justify-center">
//     //         <div className="w-28 h-28 overflow-hidden object-center rounded-full border-4 border-blue-700 ">
//     //           <img
//     //             src="./images/product1.jpg"
//     //             className="w-auto h-auto"
//     //             alt=""
//     //           />
//     //         </div>
//     //       </div>
//     //       <div className="w-full h-full flex flex-col">
//     //         <p className="font-semibold text-lg">Priyanka Chopra</p>
//     //         <p className="text-sm ">Priyanka@gmail.com</p>
//     //         <button
//     //           type="button"
//     //           className=" w-20 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
//     //         >
//     //           <CiEdit className="text-lg " />
//     //           Edit
//     //         </button>
//     //       </div>
//     //     </div>

//     //     <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
//     //       <div className="w-full h-full relative flex justify-center items-center">
//     //         <div className="w-auto h-full overflow-hidden object-center">
//     //           <FaBoxOpen className="text-9xl text-orange-600" />
//     //         </div>
//     //       </div>
//     //       <div className="w-full h-full flex flex-col">
//     //         <p className="font-semibold text-lg">My Orders</p>
//     //         <p className="text-sm ">Track your orders, manage your orders</p>
//     //         <button
//     //           type="button"
//     //           className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
//     //         >
//     //           <FaArrowAltCircleRight className="text-lg " />
//     //           Go to your orders
//     //         </button>
//     //       </div>
//     //     </div>

//     //     <div className="w-full h-auto md:h-full flex items-center p-2 bg-white">
//     //       <div className="w-full h-full relative flex justify-center items-center">
//     //         <div className="w-auto h-full overflow-hidden object-center">
//     //           <TfiHeadphoneAlt className="text-9xl text-green-900" />
//     //         </div>
//     //       </div>
//     //       <div className="w-full h-full flex flex-col">
//     //         <p className="font-semibold text-lg">Contact Us</p>
//     //         <p className="text-sm ">
//     //           Contact our customer care and ask anything any time
//     //         </p>
//     //         <button
//     //           type="button"
//     //           className=" w-36 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm text-center flex justify-center items-center gap-1 my-3 py-1 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
//     //         >
//     //           <RiContactsBook3Fill className="text-lg " />
//     //           Contact Us
//     //         </button>
//     //       </div>
//     //     </div>
//     //   </div>
//     </>
//   );
// };

// export default Profile;

import React, { useRef, useState } from "react";
import { FaUserAltSlash } from "react-icons/fa";
import { GrDocumentUpdate, GrLogout, GrSettingsOption } from "react-icons/gr";
import {
  MdAutoDelete,
  MdBrowserUpdated,
  MdCreateNewFolder,
  MdOutlinePreview,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxFill, RiLogoutBoxLine } from "react-icons/ri";

const Profile = () => {
  const nameElement = useRef();
  const emailElement = useRef();
  const passwordElement = useRef();
  const confirmPassElement = useRef();

  const user = useSelector((store) => store.user);

  //console.log(user);

  const formData = new FormData();

  const [avatar, setAvatar] = useState();

  const dispatch = useDispatch();

  // Optimise the call for the database here you are refreshing the page again and again which makes read and write operation
  const handleAvatar = async (event) => {
    event.preventDefault();
    formData.append("avatar", avatar);

    if (avatar) {
      dispatch(loaderSliceActions.showLoader());

      const responce = await fetch("http://localhost:8000/api/v1/user/avatar", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const finalResponce = await responce.json();

      if (finalResponce.success) {
        dispatch(loaderSliceActions.hideLoader());

        dispatch(userSliceActions.addUser(finalResponce.data));

        window.location.reload();
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const responce = await fetch("http://localhost:8000/api/v1/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailElement.current.value,
        password: passwordElement.current.value,
      }),
    });

    const user = await responce.json();

    dispatch(userSliceActions.addUser(user.data));

    emailElement.current.value = "";
    passwordElement.current.value = "";

    if (user.success == true) {
      navigate("/");
    }
  };
  const adminOptionsList = [
    {
      id: 1,
      icon: <GrSettingsOption className="text-lg" />,
      option: "Settings",
      link: "/profile",
    },
    {
      id: 2,
      icon: <RiLogoutBoxLine className="text-lg" />,
      option: "Logout",
      link: "/",
    },
  ];
  const [option, setOption] = useState(1);
  return (
    <>
      <>
        <section className="w-full h-[86.1vh]  flex justify-between">
          <aside className="flex flex-col w-2/12 justify-start items-center p-2 border-r-2 gap-2">
            <h3 className="text-2xl p-3 font-extrabold font-sans text-start">
              Dashboard
            </h3>
            {adminOptionsList.map((Element) => (
              <Link
                to={Element.link}
                className={`hover:bg-gray-600  hover:text-white w-full h-10 rounded-md ${
                  Element.id === option
                    ? "bg-gray-600 text-white"
                    : "bg-gray-300"
                } font-semibold flex justify-start items-center p-3 gap-3`}
                onClick={() => {
                  setOption(Element.id);
                }}
              >
                {Element.icon} {Element.option}
              </Link>
            ))}
          </aside>
          <div className="dashboard w-10/12 overflow-y-scroll no-scrollbar flex flex-col h-full items-center py-5">
            <div className="w-full md:w-10/12 bg-white rounded-lg shadow p-4 h-auto">
              <div className="flex flex-col justify-center items-center mb-4">
                <h2 className="text-2xl font-bold font-sans border-b-2 py-2">
                  Update Your Avatar
                </h2>

                <div className="w-full h-auto flex items-center justify-center py-7">
                  <div className="w-[9rem] h-[9rem] overflow-hidden rounded-full object-center">
                    <img src={`${user.avatar}`} alt="Avatar" />
                  </div>
                </div>
              </div>
              <form onSubmit={handleAvatar}>
                <div className="flex items-center justify-center w-full">
                  <img src={formData.avatar && `${formData.avatar}`} alt="" />
                  <label
                    for="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        {avatar ? (
                          <span className="font-semibold">
                            Avatar uploaded successfulky
                          </span>
                        ) : (
                          <span className="font-semibold">
                            Click to upload and press Upload button
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                      <button
                        type="submit"
                        className="bg-gray-600 px-4 py-1 rounded-lg text-white font-semibold my-4"
                      >
                        Upload
                      </button>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        setAvatar(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
              </form>

              <div className="flex flex-col justify-center items-center mb-4">
                <h2 className="text-2xl font-bold font-sans border-b-2 py-2">
                  Update Your Details
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name :
                  </label>
                  <input
                    type="text"
                    id="password"
                    ref={nameElement}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Updated Name here.."
                    required
                  />
                </div>
                <div>
                  <label
                    for="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email :
                  </label>
                  <input
                    type="email"
                    id="username"
                    ref={emailElement}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Updated Email here.."
                    required
                  />
                </div>
                {/* <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={passwordElement}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********"
                required
              />
            </div> */}
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="hover:bg-gray-700  w-full h-10 rounded-md  bg-gray-600 text-white"
                  >
                    Change the Details
                  </button>
                </div>
              </form>

              <div className="flex flex-col justify-center items-center my-10">
                <h2 className="text-2xl font-bold font-sans border-b-2 py-2">
                  Update Your Password
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password :
                  </label>
                  <input
                    type="password"
                    id="password"
                    ref={passwordElement}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your New Password to update.."
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password :
                  </label>
                  <input
                    type="password"
                    id="password"
                    ref={confirmPassElement}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your New Password to update.."
                    required
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="hover:bg-gray-700  w-full h-10 rounded-md  bg-gray-600 text-white"
                  >
                    Change the Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default Profile;
