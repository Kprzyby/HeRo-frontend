import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

import AuthService from "./services/auth.service";
import Home from "./components/Home";
import Login from "./components/Login";
import { Container } from "react-bootstrap";
import SkillsComponent from "./components/SkillsComponent/SkillsComponent";

const App = () => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user)
    }

  }, [])

  const logOut = (e) => {
    e.preventDefault();

    AuthService.logout();
    setCurrentUser("");
  };

  return (
    <div className="App min-vh-100">
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <Link to={"/"} className="navbar-brand">
          HeRo
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
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
            <li className="nav-item">
              <Link to={"/skills"} className="nav-link">
                Skills
              </Link>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
          
          
        )}
      </nav>

      <Container className="mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/skills"} element={<SkillsComponent/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
