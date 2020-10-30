import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import { defaultTheme } from "../../Constants/colorSchemes";
import { getCPId } from "../../actions/invoices";

const CliforForm = ({ clifors, getCPId }) => {
  let location = useLocation();
  const [cliforId, setCliforId] = useState(location.pathname);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  if (location.pathname !== cliforId) {
    return <Redirect to={cliforId} />;
  }

  return (
    <Form
      key="cliforForm"
      style={{ marginBottom: "0.5rem" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Row>
        <Form.Group md="1" as={Col} style={{ marginRight: "0.5rem" }}>
          <Form.Label style={labelStyle}>Cli/For:</Form.Label>
        </Form.Group>
        <Form.Group md="3" as={Col}>
          <Form.Control
            ref={inputRef}
            type="text"
            list="clifor"
            onChange={(e) => {
              getCPId(e.target.value);
              if (clifors && clifors[e.target.value]) {
                setCliforId("/clifor/" + clifors[e.target.value]);
              }
            }}
          />
          <datalist id="clifor">
            {clifors !== undefined
              ? Object.keys(clifors).map((cf) => (
                  <option key={clifors[cf]} value={cf}>
                    Id: {clifors[cf]}
                  </option>
                ))
              : null}
          </datalist>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

CliforForm.propTypes = {
  clifors: PropTypes.object,
  getCPId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clifors: state.invoices.data.clifors,
});

export default connect(mapStateToProps, { getCPId })(CliforForm);

const labelStyle = {
  color: defaultTheme.color5,
  verticalAlign: "sub",
};
