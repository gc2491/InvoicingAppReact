import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import DettaglioPagamentoUpdate from "./DettaglioPagamentoUpdate";
import DeleteButton from "../../../Reusables/Inputs/DeleteButton";
import ButtonWithTooltip from "../../../Reusables/Inputs/ButtonWithTooltip";
import DettaglioPagamentoAdd from "./DettaglioPagamentoAdd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEuroSign,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

import { deleteDatiPagamento } from "../../../../actions/invoices";
import { changeActiveDatiPagamento } from "../../../../actions/invoices";

import convertCodesValues from "../../../../Functions/convertCodesValues";

import { defaultTheme } from "../../../../Constants/colorSchemes";

const DettagliPagamenti = ({
  datiPagamento,
  contiBancari,
  updatePaymentStatus,
  cliforId,
  deleteDatiPagamento,
  changeActiveDatiPagamento,
  updatingPayments,
  setDpId,
  dpId,
}) => {
  const pagamenti = datiPagamento.dettaglioPagamento.map((dp, i) => (
    <div
      key={dp.id}
      style={
        i === datiPagamento.dettaglioPagamento.length - 1
          ? {}
          : {
              borderBottom: "2px solid " + defaultTheme.color7,
              paddingBottom: "0.5rem",
            }
      }
    >
      <DettaglioPagamentoUpdate
        key={i}
        paymentDetails={dp}
        contiBancari={contiBancari}
        cliforId={cliforId}
        paymentNr={i + 1}
        updatePaymentStatus={updatePaymentStatus}
        setDpId={setDpId}
      />
    </div>
  ));

  const addPagamenti = (
    <DettaglioPagamentoAdd
      bodyModelId={datiPagamento.bodyModelId}
      datiPagamentoModelId={datiPagamento.id}
      cliforId={cliforId}
      contiBancari={contiBancari}
      updatePaymentStatus={updatePaymentStatus}
      setDpId={setDpId}
    />
  );

  // Switch between AddDettaglioPagamento (true) and UpdateDettaglioPagamento (false)
  const [addUpdateSelector, setAddUpdateSelector] = useState(true);
  const [modalBody, setModalBody] = useState(pagamenti);

  useEffect(() => {
    if (dpId) {
      setModalBody(addPagamenti);
      setAddUpdateSelector(false);
    } else {
      setModalBody(pagamenti);
      setAddUpdateSelector(true);
    }
  }, [datiPagamento.dettaglioPagamento.length, addUpdateSelector]);

  return (
    <div style={{ margin: "0.5rem 0 0.5 0" }}>
      <h4 className="text-primary" style={{ display: "inline-block" }}>
        Condizioni di Pagamento:{" "}
        {convertCodesValues(datiPagamento.condizioniPagamento)}
      </h4>
      <span style={{ float: "right" }}>
        <ButtonWithTooltip
          popover={
            datiPagamento.active
              ? `- Pagamento attivo: viene usate per determinare stato pagamento
                fattura, solo questi pagamenti vengono mostrati nello
                scadenziario`
              : `- Pagamento inattivo`
          }
          icon={faMoneyBillWave}
          btnStyle={functionButtonStyle}
          variant={datiPagamento.active ? "outline-success" : "outline-danger"}
          onClick={() => {
            changeActiveDatiPagamento(
              datiPagamento.id,
              datiPagamento.bodyModelId
            );
          }}
        />
        <DeleteButton
          deleteElement={() => deleteDatiPagamento(datiPagamento.id)}
          disabled={datiPagamento.dettaglioPagamento.length !== 0}
        />
        <Button
          style={functionButtonStyle}
          variant="outline-primary"
          onClick={() => {
            if (addUpdateSelector) {
              setAddUpdateSelector(!addUpdateSelector);
              setModalBody(addPagamenti);
              setDpId(datiPagamento.id);
            } else {
              setDpId(0);
              setAddUpdateSelector(!addUpdateSelector);
              setModalBody(pagamenti);
            }
          }}
        >
          <FontAwesomeIcon icon={addUpdateSelector ? faPlus : faEuroSign} />
        </Button>
      </span>
      {modalBody}
    </div>
  );
};

DettagliPagamenti.propTypes = {
  datiPagamento: PropTypes.object.isRequired,
  contiBancari: PropTypes.array.isRequired,
  updatePaymentStatus: PropTypes.func.isRequired,
  cliforId: PropTypes.number.isRequired,
  deleteDatiPagamento: PropTypes.func.isRequired,
  updatingPayments: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  updatingPayments: state.invoices.status.invoices.updatingPayments,
});

export default connect(mapStateToProps, {
  deleteDatiPagamento,
  changeActiveDatiPagamento,
})(DettagliPagamenti);

let functionButtonStyle = {
  margin: "0 0 0 0.5rem",
  height: "38px",
  width: "40px",
  padding: "3px",
  float: "right",
};
