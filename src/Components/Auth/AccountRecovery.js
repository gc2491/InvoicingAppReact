import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";

import { defaultTheme } from "../../Constants/colorSchemes";

const AccountRecovery = () => {
  const [user, setUser] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    axios.post("/api/account/recovery", user, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  };

  return (
    <Jumbotron style={jumbotronStyle}>
      <Form className="form" onSubmit={(e) => onSubmit(e)}>
        <Form.Label style={titleStyle} className="large text-primary">
          <strong style={{ color: defaultTheme.color8 }}>
            Recupera account
          </strong>
        </Form.Label>
        <div className="form-group">
          <Form.Label style={elementStyle}>Username:</Form.Label>
          <Form.Control
            style={inputStyle}
            type="text"
            name="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <input
          style={submitStyle}
          type="submit"
          className="btn btn-primary"
          value="Invia"
        />
      </Form>
      <Link
        style={{ display: "block", textAlign: "center", marginTop: "0.5rem" }}
        to={{ pathname: "/signin" }}
      >
        Accedi
      </Link>
    </Jumbotron>
  );
};

export default AccountRecovery;

let elementStyle = {
  textAlign: "center",
  width: "50%",
  maxWidth: "300px",
  marginTop: "20px",
  marginLeft: "auto",
  marginRight: "auto",
  display: "block",
};

let titleStyle = {
  position: "relative",
  left: "50%",
  transform: "translate(-50%, 0)",
  fontSize: "2.5rem",
};

let inputStyle = {
  textAlign: "center",
  width: "50%",
  margin: "0 auto",
  maxWidth: "300px",
  display: "block",
};

let submitStyle = {
  textAlign: "center",
  width: "50%",
  margin: "0 auto",
  maxWidth: "300px",
  display: "block",
  backgroundColor: defaultTheme.color8,
  borderColor: defaultTheme.color8,
};

let jumbotronStyle = {
  backgroundColor: "#ebf5ff",
  height: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "0px",
  paddingTop: "6.5%",
  minHeight: "100vh",
  width: "90%",
};
