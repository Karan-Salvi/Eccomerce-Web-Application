// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const location = useLocation();

//   if (!isAuthenticated || !user || isAuthenticated == undefined) {
//     //return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   const role = user?.data?.role?.toLowerCase();

//   console.log("role: ", user);
//   console.log("allowedRoles: ", allowedRoles);

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     // Role not allowed for this route
//     //return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
//   const location = useLocation();

//   const isDataNotReady =
//     loading ||
//     isAuthenticated === undefined ||
//     !user ||
//     !user.data ||
//     !user.data.role;

//   if (isDataNotReady) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   const role = user.data.role?.toLowerCase();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Redirect immediately if not authenticated (don't show loader)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Show loader only when authenticated but data (like role) is still not available
  const role = user?.data?.role?.toLowerCase();
  if (loading || !user || !user.data || !role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
