import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Popup from "./components/Popup";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Popup/>
      <Footer />
    </>
  );
}

export default App;
