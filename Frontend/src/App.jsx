import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Vendor from "./pages/Vendor/Vendor";
import Cart from "./pages/Cart/Cart";
import { appStore } from "./store/store";
import { Provider } from "react-redux";
import LoginPage from "./pages/Auth/Login";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<Products />}></Route>
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
