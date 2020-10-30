import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";

import InputWithTooltip from "../Reusables/Inputs/InputWithTooltip";

import { signIn } from "../../actions/auth";
import { defaultTheme } from "../../Constants/colorSchemes";

const SignIn = ({ signIn }) => {
  const [form, setForm] = useState({
    username: "Admin",
    password: "Admin123!",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    signIn(form.username, form.password);
  };

  return (
    <Jumbotron style={jumbotronStyle}>
      <Form className="form" onSubmit={(e) => onSubmit(e)}>
        <Form.Label style={titleStyle} className="large text-primary">
          <strong style={{ color: defaultTheme.color8 }}>Accedi</strong>
        </Form.Label>
        <InputWithTooltip
          md="3"
          label="Username:"
          formGroupStyle={inputStyle}
          placeholder="username"
          value={form.username}
          errors={errors.username}
          onChange={(e) => {
            setForm({ ...form, username: e.target.value });
          }}
          textCenter={true}
        />
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
          textCenter={true}
        />
        <input
          style={submitStyle}
          type="submit"
          className="btn btn-primary"
          value="Invia"
        />
      </Form>
      <Link
        style={{ display: "block", textAlign: "center", marginTop: "0.5rem" }}
        to={{ pathname: "/accountrecovery" }}
      >
        Recupera account
      </Link>
    </Jumbotron>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signIn })(SignIn);

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
  padding: "0",
  maxWidth: "300px",
  display: "block",
};

let submitStyle = {
  textAlign: "center",
  width: "50%",
  margin: "0.5rem auto",
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
