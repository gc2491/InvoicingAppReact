import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";

import InputWithTooltip from "../Reusables/Inputs/InputWithTooltip";
import DeleteButton from "../Reusables/Inputs/DeleteButton";

const ContattoForm = ({ contatto, action, updateClifor }) => {
  const [contattoForm, setForm] = useState(contatto);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!contattoForm) {
      setForm({ ...contatto });
    }
  }, [contatto, contattoForm]);

  const onSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    switch (action) {
      case "create":
        formErrors = await createContatto(contattoForm);
        break;

      case "update":
        formErrors = await updateContatto(contattoForm);
        break;

      default:
        break;
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
    }

    updateClifor();
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Row>
        <InputWithTooltip
          formGroupStyle={{ marginBottom: "0.5rem" }}
          md="6"
          label="Descrizione:"
          value={contattoForm.description}
          errors={errors.description}
          onChange={(e) =>
            setForm({
              ...contattoForm,
              description: e.target.value,
            })
          }
        />
        <InputWithTooltip
          formGroupStyle={{ marginBottom: "0.5rem" }}
          md="6"
          label="Email:"
          value={contattoForm.email}
          errors={errors.email ? errors.email : errors.generale}
          onChange={(e) =>
            setForm({
              ...contattoForm,
              email: e.target.value,
            })
          }
        />
      </Form.Row>
      <Form.Row>
        <InputWithTooltip
          formGroupStyle={{ marginBottom: "0.5rem" }}
          md="6"
          label="Telefono:"
          value={contattoForm.telefono}
          errors={errors.telefono ? errors.telefono : errors.generale}
          onChange={(e) =>
            setForm({
              ...contattoForm,
              telefono: e.target.value,
            })
          }
        />
        <InputWithTooltip
          formGroupStyle={{ marginBottom: "0.5rem" }}
          md="6"
          label="Fax:"
          value={contattoForm.fax}
          errors={errors.fax ? errors.fax : errors.generale}
          onChange={(e) =>
            setForm({
              ...contattoForm,
              fax: e.target.value,
            })
          }
        />
      </Form.Row>
      <Form.Row>
        {action === "update" ? (
          <Form.Group as={Col} style={{ marginBottom: "0" }}>
            <DeleteButton
              deleteElement={() => {
                deleteContatto(contattoForm.id, updateClifor);
              }}
              updateClifor={updateClifor}
            />
          </Form.Group>
        ) : null}

        <Form.Group as={Col} style={{ marginBottom: "0" }}>
          <Button type="submit" variant="success" style={{ float: "right" }}>
            {action === "update" ? "Aggiorna" : "Crea"}
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

ContattoForm.propTypes = {
  contatto: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  updateClifor: PropTypes.func.isRequired,
};

export default ContattoForm;

const updateContatto = async (contattoForm) => {
  try {
    let res = await axios.put(`/api/invoice/contatti/`, contattoForm);
    if (res.response.status === 400) return res.response.data.errors;

    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

const createContatto = async (contattoForm) => {
  try {
    let res = await axios.post(`/api/invoice/contatti/`, contattoForm);

    if (res.response) return res.response.data.errors;

    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

const deleteContatto = async (id, updateClifor) => {
  try {
    await axios.delete(`/api/invoice/contatti/${id}`);
    updateClifor();
  } catch (error) {
    console.log(error);
  }
};
