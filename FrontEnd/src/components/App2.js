import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import AuthService from "./services/auth.service";

import Register from "./components/Register2";
import Home from "./components/Home2";
import Profile from "./components/Profile2";
import OwnerHome from "./components/OwnerHome";
import ManagerHome from "./components/ManagerHome";
import ReceptionistHome from "./components/ReceptionistHome";
import Login from "./components/Login2";


const App = () => {
  const [showManagerHome, setShowManagerHome] = useState(false);
  const [showOwnerHome, setShowOwnerHome] = useState(false);
  const [showReceptionistHome, setShowReceptionistHome] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowOwnerHome(user.roles.includes("ROLE_OWNER"))
      setShowManagerHome(user.roles.includes("ROLE_MANAGER"));
      setShowReceptionistHome(user.roles.includes("ROLE_RECEPTIONIST"));
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          {showManagerHome && (
            <li className="nav-item">
              <Link to={"/manager"} className="nav-link">
                Home
              </Link>
            </li>
          )}
          {showOwnerHome && (
            <li className="nav-item">
              <Link to={"/owner"} className="nav-link">
                Home
              </Link>
            </li>
          )}
          {showReceptionistHome && (
            <li className="nav-item">
              <Link to={"/receptionist"} className="nav-link">
                Home
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route path="/owner" element={<OwnerHome/>} />
          <Route path="/manager" element={<ManagerHome/>} />
          <Route path="/receptionist" element={<ReceptionistHome/>} />
        </Routes>
      </div>
    </div>
  );
};
export default App;