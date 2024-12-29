import { FaBagShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosLogIn } from "react-icons/io";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logActions } from "../store/logSlice";
import { BACKEND_URL } from "../constants";
import IsloggedIn from "./IsloggedIn";
import LoggedIn from "./LoggedIn";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    alert("HandleLogout");
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center items-center">
        <div className="flex h-16 w-full items-center justify-between md:w-11/12 mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <GiShoppingCart className="h-6 w-6" />
            <span className="text-xl font-bold">TrendyCart</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to={"/women"}
              className="text-sm font-medium transition-colors hover:text-primary  "
            >
              Products
            </Link>
            <Link
              to={"/women"}
              className="text-sm font-medium transition-colors hover:text-primary "
            >
              Mens
            </Link>
            <Link
              to={"/women"}
              className="text-sm font-medium transition-colors hover:text-primary "
            >
              Womens
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary "
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4 p-2 md:p-0">
            <Link to={"/cart"}>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
            <IsloggedIn>
              <Link
                to={"/profile"}
                className="dark:border-white border-gray-500 border-2 rounded-full w-8 h-8 flex justify-center items-center overflow-hidden"
              >
                <img
                  src="/images/default1.png"
                  className="h-auto w-14"
                  alt=""
                />
              </Link>
            </IsloggedIn>
            <LoggedIn>
              <Link
                to={"/user/login"}
                className="bg-black text-white p-2 rounded-md font-semibold px-3"
              >
                Sign In
              </Link>
            </LoggedIn>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
