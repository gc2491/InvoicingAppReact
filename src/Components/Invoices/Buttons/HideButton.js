import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { hideInvoice } from "../../../actions/invoices";

import Button from "react-bootstrap/Button";

const HideButton = ({ id, hideInvoice }) => {
  return (
    <Fragment>
      <Button
        style={functionButtonStyle}
        variant="outline-info"
        onClick={() => hideInvoice(id)}
      >
        N
      </Button>
    </Fragment>
  );
};

HideButton.propTypes = {
  id: PropTypes.number.isRequired,
  hideInvoice: PropTypes.func.isRequired,
};

export default connect(null, { hideInvoice })(HideButton);

let functionButtonStyle = {
  margin: "0 3px",
};
