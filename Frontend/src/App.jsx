import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Popup from "./components/Popup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "./constants";
import { userSliceActions } from "./store/userSlice";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user.role === "UnloggedUser") {
      fetch(`${BACKEND_URL}/api/v1/me`, {
        credentials: "include",
        method: "GET",
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          dispatch(userSliceActions.initializeUser(data.data));
        })
        .catch((err) => {
          console.log("Error occured", err);
        });
    }
  }, [user]);
  return (
    <>
      <Header />
      <Outlet />
      <Popup />
      <Toaster />
      <Footer />
    </>
  );
}

export default App;
