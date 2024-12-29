import { Link } from "react-router-dom";
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
import { BACKEND_URL } from "../constants";
import { logActions } from "../store/logSlice";
import { userSliceActions } from "../store/userSlice";
import { messageActions } from "../store/messageSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const nameElement = useRef();
  const emailElement = useRef();
  const passwordElement = useRef();
  const confirmPassElement = useRef();
  const oldPassElement = useRef();

  const user = useSelector((store) => store.user);

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

  const handleLogOut = async () => {
    const responce = await fetch(`${BACKEND_URL}/api/v1/logout`, {
      method: "Get",
      credentials: "include",
    });

    const data = await responce.json();

    if (data.success == true) {
      dispatch(logActions.changeStatus());
      dispatch(userSliceActions.logoutUser());
      navigate("/user/login");
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

  const handleUpdateDetails = async (event) => {
    event.preventDefault();
    let user = {
      name: nameElement.current.value,
      email: emailElement.current.value,
    };

    fetch(`${BACKEND_URL}/api/v1/me/update`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((responce) => {
        return responce.json();
      })
      .then((responce) => {
        console.log("Responce is : ", responce);
        if (responce.success) {
          toast.success(responce.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log("Some error occured : ", err);
      });
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    let user = {
      password: passwordElement.current.value,
      confirmPassword: confirmPassElement.current.value,
      oldPassword: oldPassElement.current.value,
    };
    if (user.password !== user.confirmPassword) {
      toast.error("Please Enter password and confirm password same..");
      return;
    } else if (
      !passwordElement.current.value ||
      !confirmPassElement.current.value ||
      !oldPassElement.current.value
    ) {
      toast.error("Please Enter all the fields");
      return;
    }
    fetch(`${BACKEND_URL}/api/v1/password/update`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((responce) => {
        return responce.json();
      })
      .then((responce) => {
        if (responce.success) {
          toast.success(responce.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log("Some error occured : ", err);
      });
  };
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
                key={Element.id}
                to={Element.link}
                className={`hover:bg-gray-600  hover:text-white w-full h-10 rounded-md ${
                  Element.id === option
                    ? "bg-gray-600 text-white"
                    : "bg-gray-300"
                } font-semibold flex justify-start items-center p-3 gap-3`}
                onClick={() => {
                  setOption(Element.id);
                  if (Element.id == 2) {
                    handleLogOut();
                  }
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
                  Update Your Details
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleUpdateDetails}>
                <div>
                  <label
                    htmlFor="password"
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
                    htmlFor="username"
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

              <form className="space-y-6" onSubmit={handleUpdatePassword}>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Old Password :
                  </label>
                  <input
                    type="password"
                    id="password"
                    ref={oldPassElement}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your old password.."
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
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
                    htmlFor="password"
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
