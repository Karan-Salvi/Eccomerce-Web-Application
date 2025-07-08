import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Vendor from "./pages/Vendor/Vendor";
import Cart from "./pages/Cart/Cart";
import { appStore } from "./store/store";
import { Provider } from "react-redux";
import LoginPage from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";
import Product from "./pages/Product/Product";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
