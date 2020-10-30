import React, { useState } from "react";
import PropTypes from "prop-types";

import Filter from "../Reusables/Filter";

import Linea from "./Linea";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Linee = ({ linee }) => {
  const [descrizione, descrizioneFilter] = useState(linee);
  const [unitaMisura, unitaMisuraFilter] = useState(descrizione);
  const [quantita, quantitaFilter] = useState(unitaMisura);
  const [prezzoUnitario, prezzoUnitarioFilter] = useState(quantita);
  const [prezzoTotale, prezzoTotaleFilter] = useState(prezzoUnitario);
  const [resetFilter, setResetFilter] = useState(false);

  return (
    <Table responsive size="sm" style={tableStyle}>
      <thead>
        <tr style={{ borderTop: "0px" }}>
          <th style={descrizioneStyle}>Descrizione</th>
          <th style={unitaMisuraStyle} className="text-center">
            U.M.
          </th>
          <th style={{ borderStyle: "none" }} className="text-center">
            Q.tà
          </th>
          <th style={{ borderStyle: "none" }} className="text-center">
            P.U.
          </th>
          <th style={{ borderStyle: "none" }} className="text-center">
            Totale
          </th>
          <th style={nrLineaStyle} className="text-right">
            Linea
          </th>
        </tr>
        <tr>
          <td style={tdFilterStyle}>
            <Filter
              property="descrizione"
              array={linee}
              returnFiltered={descrizioneFilter}
              resetFilter={resetFilter}
              type="txt"
            />
          </td>
          <td style={tdFilterStyle}>
            <Filter
              property="unitaMisura"
              array={descrizione}
              returnFiltered={unitaMisuraFilter}
              resetFilter={resetFilter}
              type="txt"
            />
          </td>
          <td style={tdFilterStyle}>
            <Filter
              property="quantita"
              array={unitaMisura}
              returnFiltered={quantitaFilter}
              resetFilter={resetFilter}
              type="comparative"
            />
          </td>
          <td style={tdFilterStyle}>
            <Filter
              property="prezzoUnitario"
              array={quantita}
              returnFiltered={prezzoUnitarioFilter}
              resetFilter={resetFilter}
              type="comparative"
            />
          </td>
          <td style={tdFilterStyle}>
            <Filter
              property="prezzoTotale"
              array={prezzoUnitario}
              returnFiltered={prezzoTotaleFilter}
              resetFilter={resetFilter}
              type="comparative"
            />
          </td>
          <td style={tdFilterStyle}>
            <Button
              variant="outline-danger"
              size="sm"
              style={resetBtnStyle}
              onClick={() => {
                setResetFilter(!resetFilter);
              }}
            >
              x
            </Button>
          </td>
        </tr>
      </thead>
      <tbody>
        {prezzoTotale.map((linea, i) => {
          return <Linea key={i} linea={linea} />;
        })}
      </tbody>
    </Table>
  );
};

Linee.propTypes = {
  linee: PropTypes.array.isRequired,
};

export default Linee;

let tableStyle = {
  tableLayout: "fixed",
  minWidth: "850px",
  overflow: "scroll",
  marginBottom: "0",
};

let descrizioneStyle = {
  width: "35%",
  borderStyle: "none",
};

let unitaMisuraStyle = {
  width: "8%",
  borderStyle: "none",
};

let nrLineaStyle = {
  width: "7%",
  borderStyle: "none",
};

let resetBtnStyle = {
  width: "100%",
  marginBottom: "1rem",
};

const tdFilterStyle = {
  borderStyle: "none",
};
