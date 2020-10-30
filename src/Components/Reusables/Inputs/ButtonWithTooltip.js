import React from "react";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonWithTooltip = ({
  text,
  popover,
  btnStyle,
  variant,
  icon,
  onClick,
}) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Content>{popover}</Popover.Content>
        </Popover>
      }
    >
      <Button style={btnStyle} variant={variant} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
};

export default connect()(ButtonWithTooltip);

const popoverStyle = {
  padding: "0",
  margin: "0",
  color: "white",
  borderRadius: 5,
};

const popoverContentStyle = {
  margin: "0",
  padding: "0.5rem",
  paddingBottom: "0",
};
