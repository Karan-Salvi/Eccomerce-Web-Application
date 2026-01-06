import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Vendor from "./pages/Vendor/Vendor";
import Cart from "./pages/Cart/Cart";
import { appStore } from "./store/store";
import { Provider, useSelector } from "react-redux";
import LoginPage from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";
import Product from "./pages/Product/Product";
import ProtectedProfile from "./pages/Protected/ProtectedProfile";
import Unauth from "./pages/Unauthorized/Unauth";
import ProtectedRoute from "./pages/Protected/ProtectedRoute";
import WishPage from "./pages/Wishlist/WishPage";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";
import Contact from "./pages/Contact/Contact";
import Success from "./pages/Order/Success";
import Cancel from "./pages/Order/Cancel";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute allowedRoles={["user", "vendor"]}>
                <WishPage />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/order-success/:id" element={<Success />} />
          <Route path="/order-cancel/:id" element={<Cancel />} />
          <Route
            path="/vendor"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <Vendor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["user", "vendor"]}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["user", "vendor"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
