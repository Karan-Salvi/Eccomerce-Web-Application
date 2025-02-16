import React from "react";
import { useSelector } from "react-redux";

const LoggedIn = ({ children }) => {
  const user = useSelector((store) => store.user);

  if (user.role === "UnloggedUser") return <>{children}</>;
  else {
    return <></>;
  }
};

export default LoggedIn;
