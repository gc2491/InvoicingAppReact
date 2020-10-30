import React from "react";
import PropTypes from "prop-types";

import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import outputDate from "../../Functions/outputDate";

const UltimeFatture = ({ fatture, title, style, redirectToSearch }) => {
  const tableStyle = {
    margin: "0",
    marginTop: "0.5rem",
    display: "inline-block",
    width: "50%",
    ...style,
  };

  return (
    <div style={tableStyle}>
      <h3 style={{ display: "inline" }}>{title}</h3>
      <FontAwesomeIcon
        className={fatture.length > 0 ? "text-primary" : "text-danger"}
        style={{ float: "right", cursor: "pointer" }}
        icon={faSearch}
        onClick={() => {
          if (fatture.length > 0) redirectToSearch();
        }}
      />
      <Table size="sm">
        <thead>
          <tr>
            <th>Numero</th>
            <th style={{ textAlign: "center" }}>Del</th>
            <th style={{ textAlign: "center" }}>Totale</th>
          </tr>
        </thead>
        <tbody>
          {fatture.length > 0 ? (
            fatture.map((f) => (
              <tr key={f.numero + f.data + f.importoTotaleDocumento}>
                <td>{f.numero}</td>
                <td style={{ textAlign: "center" }}>{outputDate(f.data)}</td>
                <td style={{ textAlign: "center" }}>
                  {"€ " + (+f.importoTotaleDocumento).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>Nessun elementro trovato</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

UltimeFatture.propTypes = {
  fatture: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default UltimeFatture;
