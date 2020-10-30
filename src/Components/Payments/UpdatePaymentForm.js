import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import InputWithTooltip from "../Reusables/Inputs/InputWithTooltip";

import { updatePaymentDetails } from "../../actions/invoices";

import { modalitaPagamento } from "../../Constants/codeValueTables";

import convertCodesValues from "../../Functions/convertCodesValues";
import outputDate from "../../Functions/outputDate";

const UpdatePaymentForm = ({
  paymentDetails,
  cedentePrestatoreId,
  contiBancari,
  updatePaymentDetails,
  updatePaymentStatus,
}) => {
  const [updatedDetail, setUpdatedDetail] = useState({ ...paymentDetails });
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);

  if (updatedDetail.importoPagamento) {
    updatedDetail.importoPagamento = (+updatedDetail.importoPagamento).toFixed(
      2
    );
  }

  if (updatedDetail.paymentDate !== null) {
    updatedDetail.paymentDate = outputDate(
      updatedDetail.paymentDate,
      "yyyymmdd"
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);

    let submitForm = { ...updatedDetail };

    Object.keys(submitForm).forEach((k) => {
      if (submitForm[k] === "") submitForm[k] = null;
    });

    if (isNaN(new Date(submitForm.paymentDate).getTime())) {
      submitForm.paymentDate = null;
    }

    let updateErrors = await updatePaymentDetails(submitForm);
    setErrors(updateErrors);

    // Only in the invoices page, sets the color of the payments button
    if (updatePaymentStatus) updatePaymentStatus();

    setUpdating(false);
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Row>
        <InputWithTooltip
          md="4"
          label="Effettuato il:"
          type="date"
          defaultValue={updatedDetail.paymentDate}
          errors={errors.paymentDate}
          onChange={(e) => {
            setUpdatedDetail({
              ...updatedDetail,
              paymentDate: outputDate(e.target.value, "yyyymmdd"),
            });
          }}
        />
        <InputWithTooltip
          md="8"
          label="Modalità pagamento:"
          type="select"
          errors={errors.modalitaPagamento}
          onChange={(e) => {
            for (let i = 0; i < e.target.options.length; i++) {
              if (
                e.target.options[i].text === updatedDetail.modalitaPagamento
              ) {
                e.target.selectIndex = i;
              }
            }
          }}
          onClick={(e) => {
            setUpdatedDetail({
              ...updatedDetail,
              modalitaPagamento: convertCodesValues(
                e.target.options[e.target.selectedIndex].value
              ),
            });
          }}
        >
          {Object.keys(modalitaPagamento).map((mp) => {
            return (
              <option
                key={mp}
                value={modalitaPagamento[mp]}
                selected={mp === updatedDetail.modalitaPagamento}
              >
                {mp} - {modalitaPagamento[mp]}
              </option>
            );
          })}
        </InputWithTooltip>
      </Form.Row>
      <Form.Row>
        <InputWithTooltip
          md="5"
          label="Codice TRN:"
          value={updatedDetail.trnCode}
          errors={errors.trnCode}
          onChange={(e) => {
            setUpdatedDetail({ ...updatedDetail, trnCode: e.target.value });
          }}
        />
        <InputWithTooltip
          md="7"
          label="Conto bancario:"
          append={
            <Link to={`/clifor/${cedentePrestatoreId}`}>
              <Button>+</Button>
            </Link>
          }
          type="select"
          errors={errors.contoBancarioId}
          onClick={(e) => {
            if (e.target.options.length > 0) {
              if (e.target.options[e.target.selectedIndex].value === "null") {
                setUpdatedDetail({
                  ...updatedDetail,
                  contoBancarioId: null,
                });
              } else {
                setUpdatedDetail({
                  ...updatedDetail,
                  contoBancarioId: +e.target.options[e.target.selectedIndex]
                    .value,
                });
              }
            }
          }}
        >
          <option
            key="default"
            value={"null"}
            selected={updatedDetail.contoBancarioId === null}
          >
            Non specificato
          </option>
          {contiBancari.map((cb) => {
            return (
              <option
                key={cb.id}
                value={cb.id}
                selected={cb.id === updatedDetail.contoBancarioId}
              >
                {cb.istitutoFinanziario ? cb.istitutoFinanziario + " - " : null}
                {cb.iban}
              </option>
            );
          })}
        </InputWithTooltip>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} style={{ margin: "0" }}>
          <Button
            type="submit"
            variant="success"
            style={{ float: "right", width: "110px" }}
          >
            {updating ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
            Aggiorna
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

UpdatePaymentForm.propTypes = {
  paymentDetails: PropTypes.object.isRequired,
};

export default connect(null, { updatePaymentDetails })(UpdatePaymentForm);
