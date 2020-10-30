import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";

const DeleteButton = ({ deleteElement, disabled }) => {
  const deleteBtn = {
    value: "Elimina",
    variant: "outline-info",
    disabled: false,
    onClick: () => {
      setDeleteButton(disabledBtn);
      setTimeout(() => {
        setDeleteButton(confirmDeleteBtn);
        setTimeout(() => setDeleteButton(deleteBtn), 3000);
      }, 1000);
    },
  };

  const disabledBtn = {
    value: "Aspetta",
    variant: "info",
    disabled: true,
  };

  const confirmDeleteBtn = {
    value: "Conferma",
    variant: "danger",
    onClick: () => deleteElement(),
  };

  const [deleteButton, setDeleteButton] = useState(deleteBtn);

  return (
    <Button
      variant={deleteButton.variant}
      onClick={() => deleteButton.onClick()}
      disabled={disabled ? disabled : deleteButton.disabled}
    >
      {deleteButton.value}
    </Button>
  );
};

DeleteButton.propTypes = {
  deleteElement: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default connect()(DeleteButton);
