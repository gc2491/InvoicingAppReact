import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import { defaultTheme } from "../../Constants/colorSchemes";

import InvoiceStoringError from "./InvoiceStoringError";

const InvoiceStoringResult = ({ storing }) => {
  if (storing == null) {
    return null;
  }

  return (
    <Fragment>
      <Card
        style={{
          backgroundColor: defaultTheme.color6,
          color: defaultTheme.color5,
          marginTop: "0.5rem",
        }}
      >
        <Table style={{ marginBottom: "0" }}>
          <tr>
            <th style={noBorderStyle}>Fatture registrate:</th>
            <td style={noBorderStyle}>{storing.invoicesStored}</td>
            <th style={noBorderStyle}>Fatture rigettate:</th>
            <td style={noBorderStyle}>{storing.invoicesRejected}</td>
          </tr>
        </Table>
      </Card>
      {storing.results
        .filter((r) => !(r.invoiceIsValid && r.isForOwner && r.fileIsValid))
        .map((res) => (
          <InvoiceStoringError errors={res} />
        ))}
    </Fragment>
  );
};

InvoiceStoringResult.propTypes = {
  storing: PropTypes.object,
};

const mapStateToProps = (state) => ({
  storing: state.invoices.results.storing,
});

export default connect(mapStateToProps, null)(InvoiceStoringResult);

const noBorderStyle = {
  border: "none",
};
