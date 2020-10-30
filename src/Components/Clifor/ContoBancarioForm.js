import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";

import InputWithTooltip from "../Reusables/Inputs/InputWithTooltip";
import DeleteButton from "../Reusables/Inputs/DeleteButton";

const ContoBancarioForm = ({ contoBancario, updateClifor, action }) => {
  const [contoForm, setContoForm] = useState(contoBancario);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!contoForm) {
      setContoForm({ ...contoBancario });
    }
  }, [contoBancario, contoForm]);

  const onSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    switch (action) {
      case "create":
        formErrors = await createContoBancario(contoForm);
        break;

      case "update":
        formErrors = await updateContoBancario(contoForm);
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
          label="Istituto finanziario:"
          value={contoForm.istitutoFinanziario}
          errors={errors.istitutoFinanziario}
          onChange={(e) =>
            setContoForm({
              ...contoForm,
              istitutoFinanziario: e.target.value,
            })
          }
        />
        <InputWithTooltip
          formGroupStyle={{ marginBottom: "0.5rem" }}
          md="6"
          label="IBAN:"
          value={contoForm.iban}
          errors={errors.iban}
          onChange={(e) =>
            setContoForm({
              ...contoForm,
              iban: e.target.value,
            })
          }
        />
      </Form.Row>
      <Form.Row>
        <InputWithTooltip
          formGroupStyle={{ marginBottom: "0.5rem" }}
          md="4"
          label="ABI:"
          value={contoForm.abi}
          errors={errors.abi}
          onChange={(e) =>
            setContoForm({
              ...contoForm,
              abi: e.target.value,
            })
          }
        />
        <InputWithTooltip
          formGroupStyle={{ marginBottom: "0.5rem" }}
          md="4"
          label="CAB:"
          value={contoForm.cab}
          errors={errors.cab}
          onChange={(e) =>
            setContoForm({
              ...contoForm,
              cab: e.target.value,
            })
          }
        />
        <InputWithTooltip
          formGroupStyle={{ marginBottom: "0.5rem" }}
          md="4"
          label="BIC:"
          value={contoForm.bic}
          errors={errors.bic}
          onChange={(e) =>
            setContoForm({
              ...contoForm,
              bic: e.target.value,
            })
          }
        />
      </Form.Row>
      <Form.Row>
        {action === "update" ? (
          <Form.Group as={Col} style={{ marginBottom: "0" }}>
            <DeleteButton
              deleteElement={() => {
                deleteContoBancario(contoForm.id, updateClifor);
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

ContoBancarioForm.propTypes = {
  contoBancario: PropTypes.object.isRequired,
};

export default ContoBancarioForm;

const updateContoBancario = async (contoForm) => {
  try {
    let res = await axios.put(`/api/invoice/contibancari/`, contoForm);

    if (res.response.status === 400) return res.response.data.errors;

    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

const createContoBancario = async (contoForm) => {
  try {
    let res = await axios.post(`/api/invoice/contibancari/`, contoForm);

    if (res.response) return res.response.data.errors;

    return {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

const deleteContoBancario = async (id, updateClifor) => {
  try {
    await axios.delete(`/api/invoice/contibancari/${id}`);
    updateClifor();
  } catch (error) {
    console.log(error);
  }
};
