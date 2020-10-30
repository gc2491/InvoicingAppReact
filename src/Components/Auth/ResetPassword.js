import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";

import InputWithTooltip from "../Reusables/Inputs/InputWithTooltip";

import { defaultTheme } from "../../Constants/colorSchemes";

const ResetPassword = () => {
  const location = useLocation();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fromUrl = location.pathname;
    let getUser = true;
    let user = "";
    let token = "";
    for (var i = 15; i < fromUrl.length; i++) {
      if (getUser && fromUrl[i] !== "/") {
        user += fromUrl[i];
      } else if (getUser && fromUrl[i] === "/") {
        getUser = false;
      } else {
        token += fromUrl[i];
      }
    }
    setForm({ ...form, username: user, token: token });
  }, [location]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let reqForm = new FormData();
    reqForm.set("username", form.username);
    reqForm.set("token", form.token);
    reqForm.set("password", form.password);
    reqForm.set("confirmPassword", form.confirmPassword);

    axios.post("/api/account/resetpassword", reqForm, config);
  };

  return (
    <Jumbotron style={jumbotronStyle}>
      <Form className="form" onSubmit={(e) => onSubmit(e)}>
        <Form.Label style={titleStyle} className="large text-primary">
          <strong style={{ color: defaultTheme.color8 }}>
            Reimposta password
          </strong>
        </Form.Label>
        <InputWithTooltip
          md="3"
          label="Password:"
          formGroupStyle={inputStyle}
          placeholder="Password"
          value={form.password}
          errors={errors.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <InputWithTooltip
          md="3"
          label="Conferma password:"
          formGroupStyle={inputStyle}
          placeholder="Conferma password"
          value={form.confirmPassword}
          errors={errors.password}
          onChange={(e) => {
            setForm({ ...form, confirmPassword: e.target.value });
          }}
        />
        <input
          style={submitStyle}
          type="submit"
          className="btn btn-primary"
          value="Invia"
        />
      </Form>
    </Jumbotron>
  );
};

export default ResetPassword;

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
  margin: "0.5rem auto",
  paddingRight: "0",
  paddingLeft: "0",
  maxWidth: "300px",
  display: "block",
};

let submitStyle = {
  textAlign: "center",
  width: "50%",
  margin: "0 auto",
  marginTop: "0.5rem",
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
