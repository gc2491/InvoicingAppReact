import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Linea = ({
  linea: {
    numeroLinea,
    descrizione,
    unitaMisura,
    quantita,
    prezzoUnitario,
    prezzoTotale,
  },
}) => {
  return (
    <Fragment>
      <tr>
        <td>{descrizione}</td>
        <td className="text-center">{unitaMisura ? unitaMisura : null}</td>
        <td className="text-center">{quantita ? quantita.toFixed(4) : null}</td>
        <td className="text-center">{"€ " + prezzoUnitario.toFixed(4)}</td>
        <td className="text-center">{"€ " + (+prezzoTotale).toFixed(4)}</td>
        <td className="text-right">{numeroLinea}</td>
      </tr>
    </Fragment>
  );
};

Linea.propTypes = {
  bkgColorIndex: PropTypes.number,
  linea: PropTypes.object.isRequired,
};

export default connect(null, null)(Linea);

