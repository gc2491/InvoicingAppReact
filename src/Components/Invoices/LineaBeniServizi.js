import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { defaultTheme } from "../../Constants/colorSchemes";

const LineaBeniServizi = ({
  beniServizi: { descrizione, importo, aliquota },
}) => {
  return (
    <Fragment>
      <tr
        style={{
          backgroundColor: defaultTheme.color3,
        }}
      >
        <td>{descrizione}</td>
        <td className="text-center">
          {(+importo).toFixed(4)}
          <span style={{ float: "right" }}>€</span>
        </td>
        <td className="text-right">{aliquota}%</td>
      </tr>
    </Fragment>
  );
};

LineaBeniServizi.propTypes = {
  bkgColorIndex: PropTypes.number,
  beniServizi: PropTypes.object.isRequired,
};

export default connect(null, null)(LineaBeniServizi);
