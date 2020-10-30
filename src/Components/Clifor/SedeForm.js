import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";

import InputWithTooltip from "../Reusables/Inputs/InputWithTooltip";
import DeleteButton from "../Reusables/Inputs/DeleteButton";

const SedeForm = ({ sede, action, updateClifor }) => {
  const [sedeForm, setSedeForm] = useState(sede);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!sedeForm) {
      setSedeForm({ ...sede });
    }
  }, [sede, sedeForm]);

  const onSubmit = async (e) => {
    e.preventDefault();

    let submitForm = {
      ...sedeForm,
    };

    if (submitForm.nazione) {
      submitForm.nazione = submitForm.nazione.toUpperCase();
    }
    if (submitForm.provincia) {
      submitForm.provincia = submitForm.provincia.toUpperCase();
    }

    let formErrors = {};

    switch (action) {
      case "create":
        formErrors = await createSede(submitForm);
        break;

      case "update":
        formErrors = await updateSede(submitForm);
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
          md="4"
          label="Descrizione:"
          value={sedeForm.description}
          errors={errors.description}
          onChange={(e) =>
            setSedeForm({
              ...sedeForm,
              description: e.target.value,
            })
          }
        />
        <InputWithTooltip
          md="4"
          label="Indirizzo:"
          value={sedeForm.indirizzo}
          errors={errors.indirizzo}
          onChange={(e) =>
            setSedeForm({
              ...sedeForm,
              indirizzo: e.target.value,
            })
          }
        />
        <InputWithTooltip
          md="4"
          label="Numero civico:"
          value={sedeForm.numeroCivico}
          errors={errors.numeroCivico}
          onChange={(e) =>
            setSedeForm({
              ...sedeForm,
              numeroCivico: e.target.value,
            })
          }
        />
      </Form.Row>
      <Form.Row>
        <InputWithTooltip
          md="4"
          label="Comune:"
          value={sedeForm.comune}
          errors={errors.comune}
          onChange={(e) =>
            setSedeForm({
              ...sedeForm,
              comune: e.target.value,
            })
          }
        />
        <InputWithTooltip
          md="3"
          label="CAP:"
          value={sedeForm.cap}
          errors={errors.cap}
          onChange={(e) =>
            setSedeForm({
              ...sedeForm,
              cap: e.target.value,
            })
          }
        />
        <InputWithTooltip
          md="3"
          label="Provincia:"
          value={sedeForm.provincia}
          errors={errors.provincia}
          onChange={(e) =>
            setSedeForm({
              ...sedeForm,
              provincia: e.target.value,
            })
          }
        />
        <InputWithTooltip
          md="2"
          label="Nazione:"
          value={sedeForm.nazione}
          errors={errors.nazione}
          onChange={(e) =>
            setSedeForm({
              ...sedeForm,
              nazione: e.target.value,
            })
          }
        />
      </Form.Row>
      <Form.Row>
        {action === "update" ? (
          <Form.Group as={Col} style={{ marginBottom: "0" }}>
            <DeleteButton
              deleteElement={() => {
                deleteSede(sedeForm.id, updateClifor);
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

SedeForm.propTypes = {
  sede: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  updateClifor: PropTypes.func.isRequired,
};

export default SedeForm;

const updateSede = async (sede) => {
  try {
    let res = await axios.put(`/api/invoice/sedi/`, sede);

    if (res.response.status === 400) return res.response.data.errors;

    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

const createSede = async (sede) => {
  try {
    let res = await axios.post(`/api/invoice/sedi/`, sede);

    if (res.response.status === 400) return res.response.data.errors;

    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

const deleteSede = async (id, updateClifor) => {
  try {
    await axios.delete(`/api/invoice/sedi/${id}`);
    updateClifor();
  } catch (error) {
    console.log(error);
  }
};
