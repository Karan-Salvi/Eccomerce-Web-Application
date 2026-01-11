// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProtectedProfile = ({ children }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   console.log("user : ", user?.data?.role);
//   console.log("isAuthenticated : ", isAuthenticated);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login"); // programmatic redirect to login page
//     }

//     if (user?.data?.role.toLowerCase() == "vendor") {
//       navigate("/vendor"); // programmatic redirect to login page
//     }
//   }, [isAuthenticated, navigate, user?.data?.role]);

//   if (!isAuthenticated) return null; // prevent rendering until redirect

//   if (user?.data?.role.toLowerCase() == "vendor") return null;

//   return <>{children}</>;
// };

// export default ProtectedProfile;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedProfile = ({ children }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   // If not logged in, redirect to login
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // If user is a vendor, redirect to vendor page
//   if (user?.data?.role?.toLowerCase() === "vendor") {
//     return <Navigate to="/vendor" replace />;
//   }

//   // Otherwise render protected children
//   return <>{children}</>;
// };

// export default ProtectedProfile;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedProfile = ({ children }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const location = useLocation();

//   // Not logged in? Redirect to login
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   // Role check: vendor should go to /vendor
//   if (
//     user?.data?.role?.toLowerCase() === "vendor" &&
//     location.pathname !== "/vendor"
//   ) {
//     return <Navigate to="/vendor" replace />;
//   }

//   // Role check: non-vendor should not access /vendor
//   if (
//     user?.data?.role?.toLowerCase() !== "vendor" &&
//     location.pathname === "/vendor"
//   ) {
//     return <Navigate to="/profile" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedProfile;

// import React from "react";
// import { useSelector } from "react-redux";
// import { useLocation, Navigate } from "react-router-dom";

// const ProtectedProfile = ({ children }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const location = useLocation();

//   // If authentication is not known yet, show loader
//   if (user === null || isAuthenticated === undefined) {
//     return <div>Loading...</div>; // Or your custom spinner
//   }

//   // Not logged in? Redirect to login with original path
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   const role = user?.data?.role?.toLowerCase();

//   // Vendor accessing non-vendor page (like /profile)
//   if (role === "vendor" && location.pathname !== "/vendor") {
//     return <Navigate to="/vendor" replace />;
//   }

//   // Non-vendor trying to access /vendor
//   if (role === "user" && location.pathname === "/profile") {
//     return <Navigate to="/profile" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedProfile;

import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

const ProtectedProfile = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // If authentication is not known yet, show loader
  // if (!user || isAuthenticated === false) {
  //   return <div>Loading...</div>;
  // }

  // Not logged in? Redirect to login with original path
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const role = user?.data?.role?.toLowerCase();

  // Vendor accessing non-vendor pages like /profile
  if (role === 'vendor' && location.pathname !== '/vendor') {
    return <Navigate to="/vendor" replace />;
  }

  return <>{children}</>;
};

export default ProtectedProfile;
