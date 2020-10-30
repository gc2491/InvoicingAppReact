import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Table from "react-bootstrap/Table";

const Riepilogo = ({ data, total }) => {
  if (total === null) {
    data.forEach((r) => {
      total += parseFloat(r.imposta) + parseFloat(r.imponibileImporto);
    });
  }

  return (
    <Table size="sm" responsive style={tableStyle}>
      <tbody>
        {data &&
          data.map((r, i) => {
            return (
              <Fragment key={i}>
                <tr>
                  <th style={i === 0 ? noBorderTopStyle : null}>
                    Aliquota IVA:{" "}
                  </th>
                  <td style={i === 0 ? noBorderTopStyle : null}>
                    {r.aliquotaIVA.toFixed(2)}%
                  </td>
                  <th style={i === 0 ? noBorderTopStyle : null}>Imponibile:</th>
                  <td style={i === 0 ? noBorderTopStyle : null}>
                    € {r.imponibileImporto.toFixed(2)}
                  </td>
                  <th style={i === 0 ? noBorderTopStyle : null}>Imposta:</th>
                  <td
                    style={
                      i === 0
                        ? { ...noBorderTopStyle, ...textRightStyle }
                        : textRightStyle
                    }
                  >
                    € {r.imposta.toFixed(2)}
                  </td>
                </tr>
                {data.length > 1 ? (
                  <tr>
                    <td colSpan="4" />
                    <th>Totale:</th>
                    <td style={textRightStyle}>
                      € {(+r.imposta + +r.imponibileImporto).toFixed(2)}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        <tr>
          <td colSpan="4" />
          <th>Totale documento:</th>
          <td style={textRightStyle}>{"€ " + total.toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

Riepilogo.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number,
};

export default Riepilogo;

let tableStyle = {
  tableLayout: "fixed",
  minWidth: "800px",
  overflow: "scroll",
  marginBottom: "0",
};

let textRightStyle = {
  textAlign: "right",
};

let noBorderTopStyle = {
  border: "none",
};

