import { Outlet } from "react-router-dom";
import Header from "./Header";
import LoginCard from "./LoginCard";
import Popup from "./Popup";

const Login = () => {
  return (
    <>
      <Header />
      <Popup />
      <Outlet />
    </>
  );
};

export default Login;
