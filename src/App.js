import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Register } from "./components/Register/Register";
import { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Login } from "./components/Login/Login";
import ScrollUp from "./components/ScrollUp/ScrollUp";
import { Welcome } from "./components/Welcome/Welcome";

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem("userLoggedIn")) {
      setUserLoggedIn(true);
    }
  }, []);

  const toggleVisibility = () => {
    let jump = document.querySelector(".jump");
    if (window.scrollY > 200) {
      jump.style.display = "";
    } else {
      jump.style.display = "none";
    }
  };

  const arrowUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <BrowserRouter>
      <div className="Social">
        <div className="jump" style={{ display: "none" }}>
          <button onClick={arrowUp}>
            <i className="fa-solid fa-arrow-up" />
          </button>
        </div>
        <ScrollUp />
        <Routes>
          <Route
            path="/"
            element={
              <Navbar
                setUserLoggedIn={setUserLoggedIn}
                userLoggedIn={userLoggedIn}
              />
            }
          >
            <Route path="/" element={<Welcome />} />
            <Route
              path="/login"
              element={<Login setUserLoggedIn={setUserLoggedIn} />}
            />
            <Route
              path="/register"
              element={
                <Register
                  setUserInfo={setUserInfo}
                  setUserLoggedIn={setUserLoggedIn}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  setUserInfo={setUserInfo}
                  userLoggedIn={userLoggedIn}
                  userInfo={userInfo}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
