import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import { getPayments, updatePaymentsForm } from "../../actions/invoices";
import { getCPId } from "../../actions/invoices";

import outputDate from "../../Functions/outputDate";
import { defaultTheme } from "../../Constants/colorSchemes";

const PaymentsForm = ({
  clifors,
  paymentsForm,
  getCPId,
  getPayments,
  updatePaymentsForm,
}) => {
  const [loadingPayments, setLoadingPayments] = useState();

  let useEffectDependency = paymentsForm ? paymentsForm.endDate : null;

  useEffect(() => {
    if (
      paymentsForm.endDate === undefined ||
      (paymentsForm.endDate !== null &&
        paymentsForm.endDate.includes("undefined"))
    )
      updatePaymentsForm({ ...paymentsForm, endDate: "" });
  }, [useEffectDependency]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!!Date.parse(paymentsForm.endDate)) {
      paymentsForm.endDate = "";
    }
    setLoadingPayments(true);

    console.log(loadingPayments);
    await getPayments(paymentsForm);

    setLoadingPayments(false);
  };

  const labelStyle = {
    color: defaultTheme.color5,
  };

  return (
    <Form style={{ marginBottom: "0.5rem" }} onSubmit={(e) => onSubmit(e)}>
      <h3 style={{ color: defaultTheme.color2 }}>Cerca scadenze</h3>
      <Form.Row>
        <Form.Group md="3" as={Col}>
          <Form.Label style={labelStyle}>
            {paymentsForm.emitted ? "Cliente:" : "Fornitore:"}
          </Form.Label>
          <Form.Control
            type="text"
            list="clifor"
            onChange={(e) => {
              getCPId(e.target.value);
              updatePaymentsForm({ ...paymentsForm, name: e.target.value });
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
          <Form.Label style={labelStyle}>Fino Al: </Form.Label>
          <Form.Control
            type="date"
            onChange={(e) =>
              updatePaymentsForm({
                ...paymentsForm,
                endDate: outputDate(e.target.value, "yyyymmdd"),
              })
            }
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group
          md="3"
          as={Col}
          onClick={(e) =>
            updatePaymentsForm({
              ...paymentsForm,
              emitted: !paymentsForm.emitted,
            })
          }
        >
          <Form.Check
            type="checkbox"
            label="Emesse:"
            checked={paymentsForm.emitted}
            onChange={(e) =>
              updatePaymentsForm({
                ...paymentsForm,
                emitted: !paymentsForm.emitted,
              })
            }
          />
        </Form.Group>
      </Form.Row>
      <Button className="noShadow" type="submit" style={submitStyle}>
        {loadingPayments ? (
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
    </Form>
  );
};

PaymentsForm.propTypes = {
  clifors: PropTypes.object,
  paymentsForm: PropTypes.object.isRequired,
  getCPId: PropTypes.func.isRequired,
  getPayments: PropTypes.func.isRequired,
  updatePaymentsForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clifors: state.invoices.data.clifors,
  paymentsForm: state.invoices.forms.payments,
});

export default connect(mapStateToProps, {
  getCPId,
  getPayments,
  updatePaymentsForm,
})(PaymentsForm);

const submitStyle = {
  width: "100px",
  backgroundColor: defaultTheme.color8,
  borderColor: defaultTheme.color8,
};
