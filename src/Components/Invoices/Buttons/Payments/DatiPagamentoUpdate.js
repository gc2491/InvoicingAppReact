import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { updateDatiPagamento } from "../../../../actions/invoices";

import InputWithTooltip from "../../../Reusables/Inputs/InputWithTooltip";

import convertCodesValues from "../../../../Functions/convertCodesValues";
import { condizioniPagamento } from "../../../../Constants/codeValueTables";

const DatiPagamentoUpdate = ({
  dati,
  updateDatiPagamento,
  updatePaymentStatus,
}) => {
  const [datiPagamento, setDatiPagamento] = useState(dati);
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);

    let updateErrors = await updateDatiPagamento(datiPagamento);
    setErrors(updateErrors);

    setUpdating(false);

    updatePaymentStatus();
  };

  return (
    <Fragment>
      <p style={{ marginBottom: "0.5rem" }}>Modifica dati pagamento:</p>
      <Form style={formStyle} onSubmit={(e) => onSubmit(e)}>
        <Form.Row>
          <InputWithTooltip
            label="Modalità pagamento:"
            type="select"
            errors={errors.condizioniPagamento}
            onChange={(e) => {
              for (let i = 0; i < e.target.options.length; i++) {
                if (
                  e.target.options[i].text === datiPagamento.modalitaPagamento
                ) {
                  e.target.selectIndex = i;
                }
              }
            }}
            onClick={(e) => {
              setDatiPagamento({
                ...datiPagamento,
                condizioniPagamento: convertCodesValues(
                  e.target.options[e.target.selectedIndex].value
                ),
              });
            }}
          >
            {Object.keys(condizioniPagamento).map((cp) => {
              return (
                <option key={cp} value={condizioniPagamento[cp]}>
                  {cp} - {condizioniPagamento[cp]}
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
              Invia
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </Fragment>
  );
};

DatiPagamentoUpdate.propTypes = {
  bodyModelId: PropTypes.number.isRequired,
  updateDatiPagamento: PropTypes.func.isRequired,
};

export default connect(null, { updateDatiPagamento })(DatiPagamentoUpdate);

const formStyle = {
  margin: "0",
};
