import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

const InvoiceDetailsButton = ({ path }) => {
  return (
    <Link to={path}>
      <Button variant="outline-primary">D</Button>
    </Link>
  );
};

InvoiceDetailsButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default InvoiceDetailsButton;

