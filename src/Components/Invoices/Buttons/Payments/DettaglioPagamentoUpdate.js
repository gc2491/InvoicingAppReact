import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import outputDate from "../../../../Functions/outputDate";

import InputGroup from "react-bootstrap/InputGroup";
import DettaglioPagamentoForm from "./DettaglioPagamentoForm";

const DettaglioPagamentoUpdate = ({
  paymentNr,
  paymentDetails,
  contiBancari,
  cliforId,
  updatePaymentStatus,
}) => {
  return (
    <Fragment>
      <InputGroup>
        <p className="text-success">
          Pagamento nr.{paymentNr} in scadenza il:{" "}
          {outputDate(paymentDetails.dataScadenzaPagamento)}
        </p>
      </InputGroup>
      <DettaglioPagamentoForm
        dettaglioPagamento={paymentDetails}
        contiBancari={contiBancari}
        cliforId={cliforId}
        updatePaymentStatus={updatePaymentStatus}
      />
    </Fragment>
  );
};

DettaglioPagamentoUpdate.propTypes = {
  paymentNr: PropTypes.number.isRequired,
  paymentDetails: PropTypes.object.isRequired,
  contiBancari: PropTypes.array.isRequired,
  cliforId: PropTypes.number.isRequired,
  updatePaymentStatus: PropTypes.func.isRequired,
};

export default connect()(DettaglioPagamentoUpdate);
