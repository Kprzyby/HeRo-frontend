import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

import AuthService from "./services/auth.service";
import Home from "./components/Home";
import Login from "./components/Login";
import { Container } from "react-bootstrap";
import SkillsComponent from "./components/SkillsComponent/SkillsComponent";
import RecruitmentsComponent from "./components/RecruitmentsComponent/RecruitmentsComponent.js"
import CreateRecruitmentComponent from "./components/CreateRecruitmentComponent/CreateRecruitmentComponent";
import CandidateComponent from "./components/Candidate/CandidateComponent";
import AdminComponent from "./components/Admin/AdminComponent";
import CreateNewUserComponent from "./components/Admin/CreateNewUserComponent/CreateNewUserComponent";
import ReportsComponent from "./components/ReportsComponent/ReportsComponent"
import AddSmtpAccount from "./components/Admin/AddSmtpAccountComponent/AddSmtpAccountComponent";
import AddImapAccount from "./components/Admin/AddImapAccountComponent/AddImapAccountComponent";
import UserComponent from "./components/User/UserComponent";
import ShowCandidatesComponent from "./components/Candidate/ShowCandidatesComponent/ShowCandidatesComponent";
import InterviewComponent from "./components/Interview/InterviewComponent";
import ShowMailsComponent from "./components/Admin/ShowMailsComponent";



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
              <Link to={"/admin"} className="nav-link">
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/skills"} className="nav-link">
                Skills
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/reports"} className="nav-link">
                Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
            <li className="nav-item">
            <Link to={"/interview"} className="nav-link">
              Interview
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
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/recruitments"} className="nav-link">
              Recruitments
            </Link>
          </li>
        </div>
      </nav>

      <Container className="mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/candidate"} element={<CandidateComponent />} />
          <Route exact path={"/skills"} element={<SkillsComponent />} />
          <Route exact path={"/recruitments"} element={<RecruitmentsComponent />} />
          <Route path={'recruitments/showCandidates/:id'} element={<ShowCandidatesComponent />} />
          <Route exact path={'/createRecruitment'} element={<CreateRecruitmentComponent />} />
          <Route exact path={"/reports"} element={<ReportsComponent />} />
          <Route exact path={"/admin"} element={<AdminComponent />} />
          <Route exact path={"/admin/createNewUser"} element={<CreateNewUserComponent />} />
          <Route exact path={"/admin/addSmtpAccount"} element={<AddSmtpAccount />} />
          <Route exact path={"/admin/addImapAccount"} element={<AddImapAccount />} />
          <Route exact path={"/user"} element={<UserComponent />} />
          <Route exact path={"/interview"} element={<InterviewComponent />} />
          <Route exact path={"/admin/showAllMails"} element={<ShowMailsComponent />} />

        </Routes>
      </Container>
    </div>
  );
}

export default App;
