import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditButton = ({ arrHasElements, title, icon, children }) => {
  const [showModal, setShowModal] = useState(false);
  const [editBtnVariant, setEditBtnVariant] = useState("outline-primary");

  if (Array.isArray(children) && children.length === 0 && showModal) {
    setShowModal(false);
  }

  return (
    <Fragment>
      <Button
        style={functionButtonStyle}
        variant={editBtnVariant}
        onClick={() => {
          if (arrHasElements) {
            setShowModal(true);
          } else {
            setEditBtnVariant("danger");
            setTimeout(() => setEditBtnVariant("outline-primary"), 1000);
          }
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </Button>
      <Modal
        style={{ marginBottom: "0.5rem" }}
        show={showModal}
        size="lg"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header style={{ padding: "0.5rem" }} closeButton>
          <Modal.Title as="h3">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "0.5rem" }}>{children}</Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default connect()(EditButton);

let functionButtonStyle = {
  margin: "0 0 0 0.5rem",
  height: "38px",
  width: "40px",
  padding: "3px",
  float: "right",
};
