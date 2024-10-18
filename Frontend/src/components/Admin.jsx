import React from "react";

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Popup from "./Popup";

const Admin = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Popup/>
      <Footer />
    </>
  );
};

export default Admin;
