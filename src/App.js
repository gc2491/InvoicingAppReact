import React, { useState, Fragment } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

import Jumbotron from "react-bootstrap/Jumbotron";

import Header from "./Components/Header";
import Profile from "./Components/Profile";
import SignIn from "./Components/Auth/SignIn";
import AccountRecovery from "./Components/Auth/AccountRecovery";
import ResetPassword from "./Components/Auth/ResetPassword";
import Invoices from "./Components/Invoices/Invoices";
import Payments from "./Components/Payments/Payments";
import Home from "./Components/Home";
import Queries from "./Components/Queries/Queries";
import Clifor from "./Components/Clifor/Clifor";
import CliforForm from "./Components/Clifor/CliforForm";

import { loadUser } from "./actions/auth";
import setAuthToken from "./Utils/SetAuthToken";
import setAxiosDefaults from "./Utils/SetAxiosDefaults";
import { defaultTheme } from "./Constants/colorSchemes";

import "./index.css";

setAxiosDefaults();

const App = ({ loadUser, isAuthenticated, userRole }) => {
  const location = useLocation();
  const [checkAuth, setCheckAuth] = useState(true);

  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  if (localStorage.getItem("token") && location.pathname === "/signin") {
    return <Redirect to="/" />;
  }

  if (!isAuthenticated) {
    loadUser();
  }

  // if (window.location.pathname !== "/signin") {
  //   checkAuthentication(checkAuth, setCheckAuth);
  // }

  const redirectToSignIn = () => {
    if (
      location.pathname !== "/signin" &&
      location.pathname !== "/accountrecovery" &&
      !location.pathname.includes("/resetpassword")
    )
      return true;
    else return false;
  };

  if (!localStorage.getItem("token")) {
    return (
      <Fragment>
        {redirectToSignIn() ? <Redirect to="/signin" /> : null}
        <Route path="/signin" exact component={SignIn} />
        <Route path="/accountrecovery" exact component={AccountRecovery} />
        <Route path="/resetpassword" component={ResetPassword} />
      </Fragment>
    );
  }

  if (location.pathname === "/registrazione" && userRole !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div style={containerDivStyle} />
      <Route path="/" component={Header} />
      <Jumbotron className="pageWidth" style={jumbotronStyle}>
        <Route path="/" exact component={Home} />
        <Route path="/profilo" component={Profile} />
        <Route path="/fatture" exact component={Invoices} />
        <Route path="/scadenze" component={Payments} />
        <Route path="/queries" component={Queries} />
        <Route path="/clifor" component={CliforForm} />
        <Route path="/clifor/:id" exact component={Clifor} />
      </Jumbotron>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.role,
});

export default connect(mapStateToProps, { loadUser })(App);

const checkAuthentication = async (checkAuth, setCheckAuth) => {
  setTimeout(async () => {
    await axios.post("/api/account/checkauth");
    setCheckAuth(!checkAuth);
  }, 5000);
};

const containerDivStyle = {
  width: "100vw",
  height: "100vh",
  display: "inline",
  position: "fixed",
  zIndex: "-1",
  backgroundColor: defaultTheme.color8,
};

let jumbotronStyle = {
  backgroundColor: defaultTheme.color1,
  minHeight: "93.5vh",
  overflow: "auto",
  margin: "auto",
  borderRadius: "0",
};
