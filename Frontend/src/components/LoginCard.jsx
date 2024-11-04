import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logActions } from "../store/logSlice";
import { messageActions } from "../store/messageSlice";
import { BACKEND_URL } from "../constants";

const LoginCard = () => {
  const logStatus = useSelector((store) => store.logStatus);
  const message = useSelector((store) => store.message);

  const dispatch = useDispatch();

  const emailElement = useRef();
  const passwordElement = useRef();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const responce = await fetch(`${BACKEND_URL}/api/v1/login`, {
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

    const data = await responce.json();

    emailElement.current.value = "";
    passwordElement.current.value = "";

    if (data.success == true) {
      dispatch(logActions.changeStatus());
      dispatch(
        messageActions.setMessage({
          success: data.success,
          message: data.message,
        })
      );
      navigate("/home");
    }
  };

  return (
    <div className="w-full h-[75vh] flex justify-center items-center p-2">
      <form
        className="w-80 h-96 border-2 border-gray-400 p-10 rounded-lg"
        onSubmit={handleLogin}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email.."
            required
            ref={emailElement}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            ref={passwordElement}
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
          <Link className="text-xs m-1 ml-6 underline"> Forget Password</Link>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Log In
        </button>
        <center className="p-4">
          <span className="text-sm">Don't Have an account </span>
          <Link to={"/user/signup"} className="text-sm text-blue-800 underline">
            Sign Up
          </Link>
        </center>
      </form>
    </div>
  );
};

export default LoginCard;
