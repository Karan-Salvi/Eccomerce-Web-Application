import { FaBagShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosLogIn } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logActions } from "../store/logSlice";

const Header = () => {
  const logStatus = useSelector((store) => store.logStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const responce = await fetch(`${BACKEND_URL}/api/v1/logout`, {
      method: "Get",
      credentials: "include",
    });

    const data = await responce.json();

    if (data.success == true) {
      dispatch(logActions.changeStatus());
      navigate("/user/login");
    }
  };

  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <Link
              to={"#"}
              className="flex items-center space-x-0 sm:space-x-1 rtl:space-x-reverse"
            >
              <GiShoppingCart className="h-6 w-6 dark:text-white" />
              <span className="self-center text-lg  font-bold  whitespace-nowrap sm:font-extrabold sm:text-xl  dark:text-white">
                TrendyCart
              </span>
            </Link>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <form className="">
                <label
                  htmlFor="search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative w-36 sm:w-96 ">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
              <Link
                onClick={() => {
                  if (logStatus) {
                    handleLogOut();
                  } else {
                    navigate("/user/login");
                  }
                }}
                className="text-sm bg-blue-600 text-white rounded-md p-1 font-semibold hover:border-white hover:border-2 hover:ease-linear hover:duration-100"
              >
                {logStatus ? (
                  <RiLogoutBoxLine className="sm:hidden" />
                ) : (
                  <IoIosLogIn className="sm:hidden" />
                )}

                <p className="text-sm hidden sm:block sm:px-2">
                  {logStatus ? "Logout" : "Login"}
                </p>
              </Link>
            </div>
          </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700">
          <div className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center justify-between gap-4">
              <ul className="flex flex-row font-medium mt-0 space-x-2 sm:space-x-5  rtl:space-x-reverse text-sm">
                <li>
                  <Link
                    to={"/home"}
                    className="text-gray-900 font-semibold dark:text-white duration-100 hover:text-blue-600 hover:ease-in text-sm sm:font-extrabold sm:text-lg"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/women"}
                    className="font-semibold text-gray-900 dark:text-white duration-100 hover:ease-in hover:text-blue-600 text-sm sm:font-extrabold sm:text-lg "
                  >
                    Mens
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/women"}
                    className="font-semibold text-gray-900 dark:text-white duration-100 hover:ease-in hover:text-blue-600 text-sm sm:font-extrabold sm:text-lg"
                  >
                    Womens
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/women"}
                    className=" font-semibold text-gray-900 dark:text-white duration-100 hover:ease-in hover:text-blue-600 text-s sm:font-extrabold sm:text-lg"
                  >
                    Kids
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/women"}
                    className=" font-semibold text-gray-900 dark:text-white duration-100 hover:ease-in hover:text-blue-600 text-s sm:font-extrabold sm:text-lg"
                  >
                    Beauty
                  </Link>
                </li>
              </ul>
              <ul className="flex justify-between gap-1 text-sm items-center">
                <li className="flex flex-col items-center">
                  <Link
                    to={"/profile"}
                    className="dark:border-white border-gray-500 border-2 rounded-full"
                  >
                    <IoMdPerson className="dark:text-green-200 w-6 h-6 p-1" />
                  </Link>
                </li>
                {/* <li className="flex flex-col items-center">
                  <Link
                    to={"#"}
                    className="dark:border-white border-gray-500 border-2 rounded-full"
                  >
                    <FaRegHeart className="dark:text-green-200 w-6 h-6 p-1" />
                  </Link>
                </li> */}
                <li className="flex flex-col items-center">
                  <Link
                    to={"/cart"}
                    className="dark:border-white border-gray-500 border-2 rounded-full"
                  >
                    <FaBagShopping className="dark:text-green-200 w-6 h-6 p-1" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
