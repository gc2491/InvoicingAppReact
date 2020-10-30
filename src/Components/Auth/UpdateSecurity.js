import React, { useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import InputWithTooltip from "../Reusables/Inputs/InputWithTooltip";

import { defaultTheme } from "../../Constants/colorSchemes";

const UpdateSecurity = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const { username, oldPassword, password, confirmPassword, role } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let formdata = new FormData();
    formdata.set("username", username);
    formdata.set("oldPassword", oldPassword);
    formdata.set("password", password);
    formdata.set("confirmPassword", confirmPassword);

    try {
      let res = await axios.put(
        "/api/account/updatesecurity",
        formdata,
        config
      );

      if (res.response.data.errors) {
        return res.response.data.errors;
      } else {
        console.log(res.response.data);
        setErrors({});
      }
    } catch (error) {
      setErrors({});
    }
  };

  return (
    <Form className="form" onSubmit={(e) => onSubmit(e)}>
      <h3 style={{ color: defaultTheme.color2 }}>Aggiorna password</h3>
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
          label="Password corrente:"
          placeholder="Vecchia password"
          value={formData.oldPassword}
          errors={errors.oldPassword}
          onChange={(e) => {
            setFormData({ ...formData, oldPassword: e.target.value });
          }}
        />
        <InputWithTooltip
          md="3"
          label="Nuova password:"
          placeholder="Nuova password"
          value={formData.password}
          errors={errors.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <InputWithTooltip
          md="3"
          label="Conferma nuova password:"
          placeholder="Conferma nuova password"
          value={formData.confirmPassword}
          errors={errors.password}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
          }}
        />
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

UpdateSecurity.propTypes = {
  register: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
};

export default UpdateSecurity;
