import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import { defaultTheme } from "../../Constants/colorSchemes";
import outputDate from "../../Functions/outputDate";
import convertCodesValues from "../../Functions/convertCodesValues";
import UpdatePaymentForm from "./UpdatePaymentForm";

const PaymentRow = ({
  eventKey,
  payment: { cliforId, clifor, numero, data, dettaglioPagamento, contiBancari },
}) => {
  const [textColor, setTextColor] = useState(
    dettaglioPagamento.paymentDate ? "text-success" : "text-danger"
  );

  useEffect(() => {
    setTextColor(
      dettaglioPagamento.paymentDate ? "text-success" : "text-danger"
    );
  }, [dettaglioPagamento]);

  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={eventKey}
        style={{
          backgroundColor: defaultTheme.color6,
          color: defaultTheme.color5,
          padding: "0.5rem",
        }}
      >
        <Table size="sm" style={{ margin: "0" }}>
          <tbody>
            <tr
              style={{
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              <td style={{ width: "25%", borderTop: "none", padding: "0" }}>
                {clifor}
              </td>
              <td
                style={{ width: "10%", borderTop: "none", padding: "0" }}
                className="text-center"
              >
                {numero}
              </td>
              <td
                style={{ width: "18%", borderTop: "none", padding: "0" }}
                className="text-center"
              >
                {outputDate(data)}
              </td>
              <td
                style={{ width: "10%", borderTop: "none", padding: "0" }}
                className="text-center"
              >
                {convertCodesValues(dettaglioPagamento.modalitaPagamento)}
              </td>
              <td
                style={{ width: "15%", borderTop: "none", padding: "0" }}
                className="text-center"
              >
                {outputDate(dettaglioPagamento.dataScadenzaPagamento)}
              </td>
              <td
                style={{ width: "17%", borderTop: "none", padding: "0" }}
                className="text-center"
              >
                <span style={{ float: "right" }}>
                  <p style={{ marginBottom: "0" }} className={textColor}>
                    {dettaglioPagamento.importoPagamento.toFixed(2)} €
                  </p>
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body style={cardBodyStyle}>
          <UpdatePaymentForm
            paymentDetails={dettaglioPagamento}
            cedentePrestatoreId={cliforId}
            contiBancari={contiBancari}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

PaymentRow.propTypes = {
  eventKey: PropTypes.number.isRequired,
  payment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  payments: state.payments,
});

export default connect(mapStateToProps, null)(PaymentRow);

const cardBodyStyle = {
  padding: "0.5rem",
};
