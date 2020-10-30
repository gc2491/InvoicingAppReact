import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteInvoice } from "../../../actions/invoices";

import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const DeleteButton = ({ id, deleteInvoice }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmDelInv, setConfirmDelInv] = useState("");

  return (
    <Fragment>
      <Button
        style={functionButtonStyle}
        variant="outline-danger"
        onClick={() => setDeleteModal(true)}
      >
        X
      </Button>
      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Elimina fattura
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ margin: "0" }}>
            Sicuro di voler eliminare la fattura dal Database?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <InputGroup>
            <FormControl
              placeholder="Conferma scrivendo 'ELIMINA'"
              aria-label="Confirma elimina fattura"
              aria-describedby="basic-addon2"
              value={confirmDelInv}
              onChange={(e) => setConfirmDelInv(e.target.value)}
            />
            <InputGroup.Append>
              <Button
                variant="danger"
                onClick={() => {
                  if (confirmDelInv === "ELIMINA") {
                    deleteInvoice(id);
                  }
                }}
              >
                Elimina
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  deleteInvoice: PropTypes.func.isRequired,
};

export default connect(null, { deleteInvoice })(DeleteButton);

let functionButtonStyle = {
  width: "38px",
  marginLeft: "0.5rem",
};
