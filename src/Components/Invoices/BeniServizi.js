import React, { useState } from "react";
import PropTypes from "prop-types";

import Filter from "../Reusables/Filter";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import LineaBeniServizi from "./LineaBeniServizi";

const BeniServizi = ({ beniServizi }) => {
  const [descrizione, descrizioneFilter] = useState(beniServizi);
  const [importo, importoFilter] = useState(descrizione);
  const [resetFilter, setResetFilter] = useState(false);

  return (
    <Table responsive size="sm" style={tableStyle}>
      <thead>
        <tr style={{ borderTop: "0px" }}>
          <th style={descrizioneStyle}>Descrizione</th>
          <th style={{ borderStyle: "none" }} className="text-center">
            Importo
          </th>
          <th style={ivaStyle} className="text-right">
            %Iva
          </th>
        </tr>
        <tr>
          <td style={tdFilterStyle}>
            <Filter
              property="descrizione"
              array={beniServizi}
              returnFiltered={descrizioneFilter}
              resetFilter={resetFilter}
              type="txt"
            />
          </td>
          <td style={tdFilterStyle}>
            <Filter
              property="importo"
              array={descrizione}
              returnFiltered={importoFilter}
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
        {importo.map((beniServizi) => {
          return (
            <LineaBeniServizi key={beniServizi.id} beniServizi={beniServizi} />
          );
        })}
      </tbody>
    </Table>
  );
};

BeniServizi.propTypes = {
  filters: PropTypes.object,
  beniServizi: PropTypes.array.isRequired,
  invId: PropTypes.string.isRequired,
};

export default BeniServizi;

let tableStyle = {
  tableLayout: "fixed",
  minWidth: "650px",
  overflow: "scroll",
  marginBottom: "0",
};
let descrizioneStyle = {
  width: "60%",
  borderStyle: "none",
};
let ivaStyle = {
  width: "10%",
  borderStyle: "none",
};
let resetBtnStyle = {
  width: "100%",
  marginBottom: "1rem",
};

const tdFilterStyle = {
  borderStyle: "none",
};
