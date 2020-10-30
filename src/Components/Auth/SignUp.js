import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { register, getRoles } from "../../actions/auth";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import InputWithTooltip from "../Reusables/Inputs/InputWithTooltip";

import { defaultTheme } from "../../Constants/colorSchemes";

const SignUp = ({ register, getRoles, roles }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const { username, password, confirmPassword, role } = formData;

  useEffect(() => {
    if (roles.length === 0) getRoles();

    setFormData({ ...formData, role: roles[0] });
  }, [roles]);

  if (localStorage.getItem("token") === null) {
    return <Redirect to="/accesso" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let registrationErrors = await register(
      username,
      password,
      confirmPassword,
      role
    );

    if (Object.keys(registrationErrors).length > 0) {
      setErrors(registrationErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <Form className="form" onSubmit={(e) => onSubmit(e)}>
      <h3 style={{ color: defaultTheme.color2 }}>Crea account</h3>
      <Form.Row>
        <InputWithTooltip
          md="3"
          label="Username:"
          placeholder="Username"
          value={formData.username}
          errors={errors.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <InputWithTooltip
          md="3"
          label="Password:"
          placeholder="Password"
          value={formData.password}
          errors={errors.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <InputWithTooltip
          md="3"
          label="Conferma password:"
          placeholder="Conferma password"
          value={formData.confirmPassword}
          errors={errors.password}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
          }}
        />
        <InputWithTooltip
          md="3"
          label="Ruolo:"
          type="select"
          errors={errors.role}
          onChange={(e) => {
            for (let i = 0; i < e.target.options.length; i++) {
              if (e.target.options[i].text === formData.role) {
                e.target.selectIndex = i;
              }
            }
          }}
          onClick={(e) => {
            setFormData({
              ...formData,
              role: e.target.options[e.target.selectedIndex].value,
            });
          }}
        >
          {Array.isArray(roles)
            ? roles.map((r) => <option key={r}>{r}</option>)
            : null}
        </InputWithTooltip>
      </Form.Row>
      <Button
        className="noShadow"
        type="submit"
        style={{
          width: "80px",
          backgroundColor: defaultTheme.color8,
          borderColor: defaultTheme.color8,
        }}
      >
        Crea
      </Button>
    </Form>
  );
};

SignUp.propTypes = {
  roles: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  roles: state.auth.roles,
});

export default connect(mapStateToProps, { register, getRoles })(SignUp);
