import React from "react";
import PropTypes from "prop-types";

import Table from "react-bootstrap/Table";

import outputDate from "../../Functions/outputDate";

const DDT = ({ datiDDT }) => {
  return (
    <Table responsive size="sm" style={tableStyle}>
      <thead>
        <tr>
          <th style={firstColStyle}>Numero</th>
          <th style={{ ...centerColStyle, borderTop: "none" }}>Del</th>
          <th style={{ ...rightColStyle, borderTop: "none" }}>
            Riferimento Linee
          </th>
        </tr>
      </thead>
      <tbody>
        {datiDDT.map((ddt) => (
          <tr key={ddt.id}>
            <td>{ddt.numeroDDT}</td>
            <td style={centerColStyle}>{outputDate(ddt.dataDDT)}</td>
            <td style={rightColStyle}>
              {printRiferimentoLinee(datiDDT.riferimentoNumeroLinea)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

DDT.propTypes = {
  datiDDT: PropTypes.array.isRequired,
};

export default DDT;

const printRiferimentoLinee = (arr) => {
  if (!arr) return "";

  let riferimenti = "";

  let rifLength = arr.length;
  for (let i = 0; i < rifLength; i++) {
    riferimenti += arr[i];

    if (i !== rifLength - 1) riferimenti += ", ";
  }

  return riferimenti;
};

let tableStyle = {
  tableLayout: "fixed",
  minWidth: "500px",
  overflow: "scroll",
  marginBottom: "0",
};

const firstColStyle = {
  borderTop: "none",
};

const centerColStyle = {
  textAlign: "center",
};

const rightColStyle = {
  textAlign: "right",
};
