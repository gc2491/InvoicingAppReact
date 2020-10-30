import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import {
  updatePaymentDetails,
  deleteDettaglioPagamento,
} from "../../../../actions/invoices";

import InputWithTooltip from "../../../Reusables/Inputs/InputWithTooltip";
import DeleteButton from "../../../Reusables/Inputs/DeleteButton";

import { modalitaPagamento } from "../../../../Constants/codeValueTables";
import convertCodesValues from "../../../../Functions/convertCodesValues";
import outputDate from "../../../../Functions/outputDate";

const DettaglioPagamentoForm = ({
  dettaglioPagamento,
  cliforId,
  contiBancari,
  updatePaymentDetails,
  updatePaymentStatus,
  deleteDettaglioPagamento,
}) => {
  const [updatedDetail, setUpdatedDetail] = useState({ ...dettaglioPagamento });
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);
  const [initializeForm, setInizializeForm] = useState(true);

  if (initializeForm) {
    fixDefaultValuesFormat(updatedDetail, setUpdatedDetail);
    setInizializeForm(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);

    let submitForm = { ...updatedDetail };
    Object.keys(submitForm).forEach((k) => {
      if (submitForm[k] === "") submitForm[k] = null;
    });

    if (!Date.parse(submitForm.paymentDate)) submitForm.paymentDate = null;

    let updateErrors = await updatePaymentDetails(submitForm);
    setErrors(updateErrors);

    updatePaymentStatus();

    setUpdating(false);
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Row>
        <InputWithTooltip
          md="4"
          label="Effettuato il:"
          type="date"
          defaultValue={
            !!updatedDetail.paymentDate
              ? outputDate(updatedDetail.paymentDate, "yyyymmdd")
              : ""
          }
          errors={errors.paymentDate}
          onChange={(e) =>
            setUpdatedDetail({
              ...updatedDetail,
              paymentDate: outputDate(e.target.value, "yyyymmdd"),
            })
          }
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
          append={
            <Link to={"/clifor/" + cliforId}>
              <Button>+</Button>
            </Link>
          }
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
        <InputWithTooltip
          md="3"
          label="Data scandenza:"
          type="date"
          errors={errors.dataScadenzaPagamento}
          defaultValue={outputDate(
            updatedDetail.dataScadenzaPagamento,
            "yyyymmdd"
          )}
          onChange={(e) => {
            setUpdatedDetail({
              ...updatedDetail,
              dataScadenzaPagamento: outputDate(e.target.value, "yyyymmdd"),
            });
          }}
        />
        <InputWithTooltip
          md="3"
          label="Importo:"
          type="number"
          defaultValue={updatedDetail.importoPagamento}
          errors={errors.importoPagamento}
          onChange={(e) => {
            setUpdatedDetail({
              ...updatedDetail,
              importoPagamento: e.target.value,
            });
          }}
        />
        <InputWithTooltip
          md="3"
          label="Sconto anticipo:"
          type="number"
          defaultValue={updatedDetail.scontoPagamentoAnticipato}
          errors={errors.scontoPagamentoAnticipato}
          onChange={(e) => {
            setUpdatedDetail({
              ...updatedDetail,
              scontoPagamentoAnticipato: e.target.value,
            });
          }}
        />
        <InputWithTooltip
          md="3"
          label="Penalita ritardo:"
          type="number"
          defaultValue={updatedDetail.penalitaPagamentiRitardati}
          errors={errors.penalitaPagamentiRitardati}
          onChange={(e) => {
            setUpdatedDetail({
              ...updatedDetail,
              penalitaPagamentiRitardati: e.target.value,
            });
          }}
        />
      </Form.Row>
      <Form.Row style={{ margin: "0", padding: "0" }}>
        <DeleteButton
          deleteElement={() => deleteDettaglioPagamento(dettaglioPagamento.id)}
        />
        <Form.Group
          as={Col}
          style={{ margin: "0p", padding: "0" }}
        ></Form.Group>
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
      </Form.Row>
    </Form>
  );
};

DettaglioPagamentoForm.propTypes = {
  dettaglioPagamento: PropTypes.object.isRequired,
  cliforId: PropTypes.number.isRequired,
  contiBancari: PropTypes.array.isRequired,
  updatePaymentDetails: PropTypes.func.isRequired,
  updatePaymentStatus: PropTypes.func.isRequired,
  deleteDettaglioPagamento: PropTypes.func.isRequired,
};

export default connect(null, {
  updatePaymentDetails,
  deleteDettaglioPagamento,
})(DettaglioPagamentoForm);

const fixDefaultValuesFormat = (dp, setDp) => {
  if (dp.importoPagamento) {
    dp.importoPagamento = (+dp.importoPagamento).toFixed(2);
  }
  if (dp.scontoPagamentoAnticipato) {
    dp.scontoPagamentoAnticipato = (+dp.scontoPagamentoAnticipato).toFixed(2);
  }
  if (dp.penalitaPagamentiRitardati) {
    dp.penalitaPagamentiRitardati = (+dp.penalitaPagamentiRitardati).toFixed(2);
  }

  setDp(dp);
};
