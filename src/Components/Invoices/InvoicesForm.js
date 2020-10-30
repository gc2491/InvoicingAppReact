import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import { defaultTheme } from "../../Constants/colorSchemes";

import {
  getInvoices,
  getCPId,
  checkNewInvoices,
  clearInvoices,
  clearStoringResult,
  updateInvoicesForm,
} from "../../actions/invoices";

const InvoicesForm = ({
  clifors,
  getCPId,
  invoicesForm,
  updateInvoicesForm,
  getInvoices,
  checkNewInvoices,
  clearInvoices,
  clearStoringResult,
  status,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();

    clearStoringResult();
    getInvoices(invoicesForm);
  };

  return (
    <Form style={{ marginBottom: "0.5rem" }} onSubmit={(e) => onSubmit(e)}>
      <h3 style={{ color: defaultTheme.color2 }}>Cerca fatture</h3>
      <Form.Row>
        <Form.Group md="3" as={Col}>
          <Form.Label style={labelStyle}>
            {invoicesForm.emitted ? "Cliente:" : "Fornitore:"}
          </Form.Label>
          <Form.Control
            type="text"
            list="clifor"
            value={invoicesForm.name}
            onChange={(e) => {
              getCPId(e.target.value);
              updateInvoicesForm({ ...invoicesForm, name: e.target.value });
            }}
          />
          <datalist id="clifor">
            {clifors !== undefined
              ? Object.keys(clifors).map((cf) => (
                  <option key={clifors[cf]} value={cf}>
                    Id: {clifors[cf]}
                  </option>
                ))
              : null}
          </datalist>
        </Form.Group>
        <Form.Group md="3" as={Col}>
          <Form.Label style={labelStyle}>Numero:</Form.Label>
          <Form.Control
            type="text"
            value={invoicesForm.number}
            onChange={(e) => {
              getCPId(e.target.value);
              updateInvoicesForm({ ...invoicesForm, number: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group md="3" as={Col}>
          <Form.Label style={labelStyle}>Dal: </Form.Label>
          <Form.Control
            type="date"
            value={invoicesForm.begin}
            onChange={(e) =>
              updateInvoicesForm({ ...invoicesForm, begin: e.target.value })
            }
            defaultValue={invoicesForm.begin}
          />
        </Form.Group>
        <Form.Group md="3" as={Col}>
          <Form.Label style={labelStyle}>Al: </Form.Label>
          <Form.Control
            type="date"
            value={invoicesForm.end}
            onChange={(e) =>
              updateInvoicesForm({ ...invoicesForm, end: e.target.value })
            }
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group
          md="3"
          as={Col}
          onClick={(e) =>
            updateInvoicesForm({
              ...invoicesForm,
              emitted: !invoicesForm.emitted,
            })
          }
        >
          <Form.Check
            type="checkbox"
            label="Emesse:"
            checked={invoicesForm.emitted}
            onClick={(e) =>
              updateInvoicesForm({
                ...invoicesForm,
                emitted: !invoicesForm.emitted,
              })
            }
          />
        </Form.Group>
        <Form.Group
          md="3"
          as={Col}
          onClick={(e) =>
            updateInvoicesForm({
              ...invoicesForm,
              ascending: !invoicesForm.ascending,
            })
          }
        >
          <Form.Check
            type="checkbox"
            label="Ascendente:"
            checked={invoicesForm.ascending}
            onClick={(e) =>
              updateInvoicesForm({
                ...invoicesForm,
                ascending: !invoicesForm.ascending,
              })
            }
          />
        </Form.Group>
      </Form.Row>

      <Button className="noShadow" type="submit" style={submitStyle}>
        {status.loadingInvoices ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : null}
        Cerca
      </Button>

      <Button
        style={{ float: "right", width: "180px" }}
        variant="danger"
        onClick={() => {
          clearInvoices();
          checkNewInvoices();
        }}
      >
        {status.loadingNewInv ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : null}
        Registra fatture
      </Button>
    </Form>
  );
};

InvoicesForm.propTypes = {
  clifors: PropTypes.object.isRequired,
  stauts: PropTypes.object,
  invoicesForm: PropTypes.object.isRequired,
  getCPId: PropTypes.func.isRequired,
  getInvoices: PropTypes.func.isRequired,
  updateInvoicesForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clifors: state.invoices.data.clifors,
  status: state.invoices.status.invoices,
  invoicesForm: state.invoices.forms.invoices,
});

export default connect(mapStateToProps, {
  getCPId,
  getInvoices,
  updateInvoicesForm,
  checkNewInvoices,
  clearInvoices,
  clearStoringResult,
})(InvoicesForm);

const labelStyle = {
  color: defaultTheme.color5,
};

const submitStyle = {
  width: "100px",
  backgroundColor: defaultTheme.color8,
  borderColor: defaultTheme.color8,
};
