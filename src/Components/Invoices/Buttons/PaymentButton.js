import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEuroSign, faEdit } from "@fortawesome/free-solid-svg-icons";

import DatiPagamentoAdd from "./Payments/DatiPagamentoAdd";
import DatiPagamentoUpdate from "./Payments/DatiPagamentoUpdate";
import DettagliPagamenti from "./Payments/DettagliPagamenti";
import resolvePaymentStatus from "../../../Functions/resolvePaymentStatus";

const PaymentButton = ({
  payments,
  contiBancari,
  bodyModelId,
  cliforId,
  updatingPayments,
}) => {
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentVariant, setPaymentVariant] = useState("outline-dark");
  const [dpId, setDpId] = useState(0);

  const updatePaymentStatus = () => {
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].active) {
        setPaymentVariant(resolvePaymentStatus(payments[i].dettaglioPagamento));
        break;
      }
    }
  };

  const dettagliPagamenti = payments
    .filter((p) => {
      if (dpId !== 0) {
        return p.id === dpId;
      } else {
        return true;
      }
    })
    .map((p, i) => (
      <div
        style={
          i !== 0
            ? {
                paddingTop: "0.5rem",
                marginTop: "0.5rem",
                borderTop: "2px solid #28A745",
              }
            : {}
        }
      >
        <DettagliPagamenti
          key={p.id}
          datiPagamento={p}
          contiBancari={contiBancari}
          cliforId={cliforId}
          updatePaymentStatus={updatePaymentStatus}
          setDpId={setDpId}
          dpId={dpId}
        />
      </div>
    ));

  const datiPagamentoUpdate = payments.map((dp) => (
    <DatiPagamentoUpdate dati={dp} />
  ));

  const datiPagamentoAdd = (
    <DatiPagamentoAdd
      bodyModelId={bodyModelId}
      cliforId={cliforId}
      updatePaymentStatus={updatePaymentStatus}
    />
  );

  const [addDatiPagamento, setAddDatiPagamento] = useState(false);
  const [updateDatiPagamento, setUpdateDatiPagamento] = useState(false);
  const [modalBody, setModalBody] = useState(dettagliPagamenti);

  useEffect(() => {
    setModalBody(dettagliPagamenti);
    setAddDatiPagamento(false);
    setUpdateDatiPagamento(false);
    updatePaymentStatus();
  }, [payments.length, updatingPayments, dpId]);

  useEffect(() => {
    if (addDatiPagamento) {
      setModalBody(datiPagamentoAdd);
    } else if (updateDatiPagamento) {
      setModalBody(datiPagamentoUpdate);
    } else {
      setModalBody(dettagliPagamenti);
    }
  }, [addDatiPagamento, updateDatiPagamento, paymentModal]);

  return (
    <Fragment>
      <Button
        style={functionButtonStyle}
        variant={paymentVariant}
        onClick={() => setPaymentModal(true)}
      >
        €
      </Button>
      <Modal
        show={paymentModal}
        size="lg"
        onHide={() => setPaymentModal(false)}
        centered
      >
        <Modal.Header style={{ padding: "0.5rem" }} closeButton>
          <Modal.Title as="h3">Modifica pagamenti</Modal.Title>
          <Button
            style={{ ...functionButtonStyle, marginLeft: "0.5rem" }}
            variant="outline-primary"
            onClick={() => {
              setAddDatiPagamento(!addDatiPagamento);
              setUpdateDatiPagamento(false);
            }}
          >
            <FontAwesomeIcon icon={addDatiPagamento ? faEuroSign : faPlus} />
          </Button>
          <Button
            style={{ ...functionButtonStyle, marginLeft: "0.5rem" }}
            variant="outline-primary"
            onClick={() => {
              setAddDatiPagamento(false);
              setUpdateDatiPagamento(!updateDatiPagamento);
            }}
          >
            <FontAwesomeIcon icon={updateDatiPagamento ? faEuroSign : faEdit} />
          </Button>
        </Modal.Header>
        <Modal.Body style={{ padding: "0.5rem" }}>{modalBody}</Modal.Body>
      </Modal>
    </Fragment>
  );
};

PaymentButton.propTypes = {
  payments: PropTypes.array.isRequired,
  cliforId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  updatingPayments: state.invoices.status.invoices.updatingPayments,
});

export default connect(mapStateToProps)(PaymentButton);

let functionButtonStyle = {
  margin: "0 0 0 0.5rem",
  height: "38px",
  width: "40px",
  padding: "3px",
};
