import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Table from "react-bootstrap/Table";

import outputDate from "../../Functions/outputDate";
import convertCodesValues from "../../Functions/convertCodesValues";

const Pagamenti = ({ pagamenti }) => {
  useEffect(() => {
    if (pagamenti[0].bodyModelId === 15) {
      console.log(pagamenti.length);
    }
  }, [pagamenti]);
  return (
    <Table responsive size="sm" style={tableStyle}>
      <tbody>
        {pagamenti.map((p, i) => {
          return (
            <Fragment key={i}>
              <tr>
                <th style={{ borderTop: "none", width: "15%" }}>Condizioni:</th>
                <td
                  style={{ ...centerColStyle, borderTop: "none", width: "45%" }}
                >
                  {p.condizioniPagamento
                    ? convertCodesValues(p.condizioniPagamento)
                    : "/"}
                </td>
                <td style={{ borderTop: "none", width: "25%" }}></td>
                <td style={{ borderTop: "none", width: "15%" }}></td>
              </tr>
              <tr>
                <th>Termine</th>
                <th style={centerColStyle}>Modalita</th>
                <th style={centerColStyle}>Importo</th>
                <th style={rightColStyle}>Effettuato</th>
              </tr>
              {p.dettaglioPagamento.map((dp, i) => {
                return (
                  <tr key={`${i}c`}>
                    <td>
                      {dp.dataScadenzaPagamento
                        ? outputDate(dp.dataScadenzaPagamento)
                        : "/"}
                    </td>
                    <td style={centerColStyle}>
                      {dp.modalitaPagamento
                        ? convertCodesValues(dp.modalitaPagamento)
                        : "/"}
                    </td>
                    <td style={centerColStyle}>
                      {dp.importoPagamento
                        ? "€ " + dp.importoPagamento.toFixed(2)
                        : "/"}
                    </td>
                    <td style={rightColStyle}>
                      {dp.paymentDate ? (
                        <span style={{ color: "green" }}>
                          {outputDate(dp.paymentDate)}
                        </span>
                      ) : (
                        <span style={{ color: "red" }}>No</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

Pagamenti.propTypes = {
  pagamenti: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.invoices.status,
});

export default connect()(Pagamenti);

let tableStyle = {
  tableLayout: "fixed",
  minWidth: "700px",
  width: "100%",
  overflow: "scroll",
  marginBottom: "0",
};

let centerColStyle = {
  textAlign: "center",
};

let rightColStyle = {
  textAlign: "right",
};
