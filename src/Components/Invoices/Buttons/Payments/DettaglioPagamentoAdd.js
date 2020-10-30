import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import { addDettaglioPagamento } from "../../../../actions/invoices";

import InputWithTooltip from "../../../Reusables/Inputs/InputWithTooltip";

import convertCodesValues from "../../../../Functions/convertCodesValues";
import {
  modalitaPagamento,
  CONTANTI,
} from "../../../../Constants/codeValueTables";
import outputDate from "../../../../Functions/outputDate";

const DettaglioPagamentoAdd = ({
  bodyModelId,
  datiPagamentoModelId,
  cliforId,
  contiBancari,
  updatePaymentStatus,
  addDettaglioPagamento,
  setDpId,
}) => {
  const [dettaglioPagamento, setDettaglioPagamento] = useState({
    datiPagamentoModelId: datiPagamentoModelId,
  });
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);

    let submitForm = { ...dettaglioPagamento };
    Object.keys(submitForm).forEach((k) => {
      if (submitForm[k] === "") submitForm[k] = null;
    });

    if (!!new Date(submitForm.paymentDate)) submitForm.paymentDate = null;
    if (!!new Date(submitForm.dataScadenzaPagamento)) {
      submitForm.dataScadenzaPagamento = outputDate(
        new Date().toISOString(),
        "yyyymmdd"
      );
    }

    if (!submitForm.modalitaPagamento) submitForm.modalitaPagamento = CONTANTI;

    let updateErrors = await addDettaglioPagamento(submitForm, bodyModelId);
    setErrors(updateErrors);

    updatePaymentStatus();

    setUpdating(false);
    setDpId(0);
  };

  return (
    <Fragment>
      <p style={{ marginBottom: "0.5rem" }}>Crea nuovo dettaglio pagamento:</p>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Row>
          <InputWithTooltip
            md="4"
            label="Effettuato il:"
            type="date"
            errors={errors.paymentDate}
            onChange={(e) =>
              setDettaglioPagamento({
                ...dettaglioPagamento,
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
                  e.target.options[i].text ===
                  dettaglioPagamento.modalitaPagamento
                ) {
                  e.target.selectIndex = i;
                }
              }
            }}
            onClick={(e) => {
              setDettaglioPagamento({
                ...dettaglioPagamento,
                modalitaPagamento: convertCodesValues(
                  e.target.options[e.target.selectedIndex].value
                ),
              });
            }}
          >
            {Object.keys(modalitaPagamento).map((mp) => {
              return (
                <option key={mp} value={modalitaPagamento[mp]}>
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
            value={dettaglioPagamento.trnCode}
            errors={errors.trnCode}
            onChange={(e) => {
              setDettaglioPagamento({
                ...dettaglioPagamento,
                trnCode: e.target.value,
              });
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
                  setDettaglioPagamento({
                    ...dettaglioPagamento,
                    contoBancarioId: null,
                  });
                } else {
                  setDettaglioPagamento({
                    ...dettaglioPagamento,
                    contoBancarioId: +e.target.options[e.target.selectedIndex]
                      .value,
                  });
                }
              }
            }}
            append={
              <Link to={`/clifor/${cliforId}`}>
                <Button>+</Button>
              </Link>
            }
          >
            <option
              key="default"
              value={"null"}
              selected={dettaglioPagamento.contoBancarioId === null}
            >
              Non specificato
            </option>
            {contiBancari.map((cb) => {
              return (
                <option
                  key={cb.id}
                  value={cb.id}
                  selected={cb.id === dettaglioPagamento.contoBancarioId}
                >
                  {cb.istitutoFinanziario
                    ? cb.istitutoFinanziario + " - "
                    : null}
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
            defaultValue={outputDate(new Date().toISOString(), "yyyymmdd")}
            errors={errors.dataScadenzaPagamento}
            onChange={(e) => {
              setDettaglioPagamento({
                ...dettaglioPagamento,
                dataScadenzaPagamento: outputDate(e.target.value, "yyyymmdd"),
              });
            }}
          />
          <InputWithTooltip
            md="3"
            label="Importo:"
            type="number"
            errors={errors.importoPagamento}
            onChange={(e) => {
              setDettaglioPagamento({
                ...dettaglioPagamento,
                importoPagamento: e.target.value,
              });
            }}
          />
          <InputWithTooltip
            md="3"
            label="Sconto anticipo:"
            type="number"
            errors={errors.scontoPagamentoAnticipato}
            onChange={(e) => {
              setDettaglioPagamento({
                ...dettaglioPagamento,
                scontoPagamentoAnticipato: e.target.value,
              });
            }}
          />
          <InputWithTooltip
            md="3"
            label="Penalita ritardo:"
            type="number"
            errors={errors.penalitaPagamentiRitardati}
            onChange={(e) => {
              setDettaglioPagamento({
                ...dettaglioPagamento,
                penalitaPagamentiRitardati: e.target.value,
              });
            }}
          />
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
              Invia
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </Fragment>
  );
};

DettaglioPagamentoAdd.propTypes = {
  bodyModelId: PropTypes.number.isRequired,
  datiPagamentoModelId: PropTypes.number.isRequired,
  cliforId: PropTypes.number.isRequired,
  contiBancari: PropTypes.array.isRequired,
  updatePaymentStatus: PropTypes.func.isRequired,
  addDettaglioPagamento: PropTypes.func.isRequired,
};

export default connect(null, { addDettaglioPagamento })(DettaglioPagamentoAdd);
