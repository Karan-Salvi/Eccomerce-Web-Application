import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container.jsx";
import Hero from "./components/Hero.jsx";
import Product from "./components/Product.jsx";
import Festival from "./components/Festival.jsx";
import Products from "./components/Products.jsx";
import Login from "./components/Login.jsx";
import LoginCard from "./components/LoginCard.jsx";
import Signup from "./components/Signup.jsx";
import Productdetails from "./components/Productdetails.jsx";
import Cart from "./components/Cart.jsx";
import Profile from "./components/Profile.jsx";
import { Provider } from "react-redux";
import TrendyCartStore from "./store/index.js";
import CreateProduct from "./components/CreateProduct.jsx";
import Admin from "./components/Admin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import DeleteProduct from "./components/DeleteProduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import GetReview from "./components/GetReview.jsx";
import DeleteUser from "./components/DeleteUser.jsx";
import UpdateUserRole from "./components/UpdateUserRole.jsx";
import BuyNow from "./components/BuyNow.jsx";
import PaymentDone from "./components/PaymentDone.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Container>
            <Hero />
            <Product />
            <Festival />
          </Container>
        ),
      },
      {
        path: "/home",
        element: (
          <Container>
            <Hero />
            <Product />
            <Festival />
          </Container>
        ),
      },
      {
        path: "/women",
        element: <Products />,
      },
      {
        path: "/productdetails",
        element: <Productdetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/buy-now",
        element: <BuyNow />,
      },
      {
        path: "/paymentdone",
        element: <PaymentDone />,
      },
    ],
  },
  {
    path: "/user",
    element: <Login />,
    children: [
      {
        path: "/user/login",
        element: <LoginCard />,
      },
      {
        path: "/user/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        path: "/admin",
        element: <CreateProduct />,
      },
      {
        path: "/admin/create-product",
        element: <CreateProduct />,
      },
      {
        path: "/admin/delete-product",
        element: <DeleteProduct />,
      },
      {
        path: "admin/update-product",
        element: <UpdateProduct />,
      },
      {
        path: "admin/check-reviews",
        element: <GetReview />,
      },
      {
        path: "admin/delete-user",
        element: <DeleteUser />,
      },
      {
        path: "admin/update-role",
        element: <UpdateUserRole />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={TrendyCartStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
