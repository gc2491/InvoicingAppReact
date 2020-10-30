import React from "react";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import InputGroup from "react-bootstrap/InputGroup";

const InputWithTooltip = ({
  type,
  value,
  defaultValue,
  errors,
  list,
  placeholder,
  onChange,
  onClick,
  children,
  md,
  label,
  append,
  formGroupStyle,
  textCenter,
}) => {
  if (textCenter) {
    inputErrorStyle.textAlign = "center";
  }

  if (type === "select") {
    return (
      <Form.Group md={md} as={Col} style={formGroupStyle}>
        <Form.Label>{label}</Form.Label>
        <InputGroup>
          <OverlayTrigger
            placement="bottom"
            overlay={
              errors ? (
                <Popover style={popoverStyle}>
                  <Popover.Content style={popoverContentStyle}>
                    {errors.map((e) => (
                      <p style={errorStyle}>- {e}</p>
                    ))}
                  </Popover.Content>
                </Popover>
              ) : (
                <span></span>
              )
            }
          >
            <Form.Control
              as="select"
              style={
                errors
                  ? inputErrorStyle
                  : textCenter
                  ? { textAlign: "center" }
                  : {}
              }
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onClick={onClick}
            >
              {children}
            </Form.Control>
          </OverlayTrigger>
          {append ? <InputGroup.Append>{append}</InputGroup.Append> : null}
        </InputGroup>
      </Form.Group>
    );
  } else if (type === "date") {
    return (
      <Form.Group md={md} as={Col} style={formGroupStyle}>
        <Form.Label>{label}</Form.Label>
        <OverlayTrigger
          placement="bottom"
          overlay={
            errors ? (
              <Popover style={popoverStyle}>
                <Popover.Content style={popoverContentStyle}>
                  {errors.map((e) => (
                    <p key={e} style={errorStyle}>
                      - {e}
                    </p>
                  ))}
                </Popover.Content>
              </Popover>
            ) : (
              <span></span>
            )
          }
        >
          <Form.Control
            type="date"
            style={
              errors
                ? inputErrorStyle
                : textCenter
                ? { textAlign: "center" }
                : {}
            }
            defaultValue={defaultValue ? defaultValue : null}
            onChange={onChange}
          />
        </OverlayTrigger>
      </Form.Group>
    );
  } else if (type === "number") {
    return (
      <Form.Group md={md} as={Col} style={formGroupStyle}>
        <Form.Label>{label}</Form.Label>
        <OverlayTrigger
          placement="bottom"
          overlay={
            errors ? (
              <Popover style={popoverStyle}>
                <Popover.Content style={popoverContentStyle}>
                  {errors.map((e) => (
                    <p key={e} style={errorStyle}>
                      - {e}
                    </p>
                  ))}
                </Popover.Content>
              </Popover>
            ) : (
              <span></span>
            )
          }
        >
          <Form.Control
            type="text"
            style={
              errors
                ? inputErrorStyle
                : textCenter
                ? { textAlign: "center" }
                : {}
            }
            placeholder={placeholder}
            defaultValue={defaultValue ? defaultValue : null}
            onChange={onChange}
          />
        </OverlayTrigger>
      </Form.Group>
    );
  }

  return (
    <Form.Group md={md} as={Col} style={formGroupStyle}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <OverlayTrigger
          placement="bottom"
          overlay={
            errors ? (
              <Popover style={popoverStyle}>
                <Popover.Content style={popoverContentStyle}>
                  {errors.map((e) => (
                    <p key={e} style={errorStyle}>
                      - {e}
                    </p>
                  ))}
                </Popover.Content>
              </Popover>
            ) : (
              <span></span>
            )
          }
        >
          <Form.Control
            type={type ? type : "text"}
            style={
              errors
                ? inputErrorStyle
                : textCenter
                ? { textAlign: "center" }
                : {}
            }
            placeholder={placeholder}
            value={value ? value : ""}
            onChange={onChange}
            list={list}
          />
        </OverlayTrigger>
        {append ? <InputGroup.Append>{append}</InputGroup.Append> : null}
      </InputGroup>
    </Form.Group>
  );
};

export default connect()(InputWithTooltip);

const inputErrorStyle = { border: "2px solid red" };
const popoverStyle = {
  backgroundColor: "rgba(255, 100, 100, 0.85)",
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

const errorStyle = {
  marginBottom: "0.5rem",
};
