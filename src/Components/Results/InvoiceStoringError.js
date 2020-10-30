import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoiceDollar,
  faFileContract,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { defaultTheme } from "../../Constants/colorSchemes";

const InvoiceStoringError = ({ errors }) => {
  return (
    <Accordion>
      <Card
        style={{
          backgroundColor: defaultTheme.color6,
          color: defaultTheme.color5,
          marginTop: "0.5rem",
        }}
      >
        <Accordion.Toggle
          as={Card.Header}
          style={{ padding: "0.5rem" }}
          eventKey={errors.fileName}
        >
          <strong style={noBorderStyle}>{errors.fileName}</strong>
          <span style={{ float: "right" }}>
            <span
              style={{ marginRight: "0.5rem" }}
              className={errors.invoiceIsValid ? "text-success" : "text-danger"}
            >
              <OverlayTrigger
                placement="bottom"
                overlay={
                  errors.invoiceIsValid ? (
                    <span></span>
                  ) : (
                    <Popover style={popoverStyle}>
                      <Popover.Content style={popoverContentStyle}>
                        <p>- Fattura invalida</p>
                      </Popover.Content>
                    </Popover>
                  )
                }
              >
                <FontAwesomeIcon size="lg" icon={faFileInvoiceDollar} />
              </OverlayTrigger>
            </span>
            <span
              style={{ marginRight: "0.5rem" }}
              className={errors.fileIsValid ? "text-success" : "text-danger"}
            >
              <OverlayTrigger
                placement="bottom"
                overlay={
                  errors.fileIsValid ? (
                    <span></span>
                  ) : (
                    <Popover style={popoverStyle}>
                      <Popover.Content style={popoverContentStyle}>
                        <p>- Il file non e una fattura</p>
                      </Popover.Content>
                    </Popover>
                  )
                }
              >
                <FontAwesomeIcon size="lg" icon={faFileContract} />
              </OverlayTrigger>
            </span>
            <span
              style={{ marginRight: "0.5rem" }}
              className={errors.isForOwner ? "text-success" : "text-danger"}
            >
              <OverlayTrigger
                placement="bottom"
                overlay={
                  errors.isForOwner ? (
                    <span></span>
                  ) : (
                    <Popover style={popoverStyle}>
                      <Popover.Content style={popoverContentStyle}>
                        <p>
                          - La fattura non e stata emessa/destinata alla ditta
                        </p>
                      </Popover.Content>
                    </Popover>
                  )
                }
              >
                <FontAwesomeIcon size="lg" icon={faUser} />
              </OverlayTrigger>
            </span>
          </span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={errors.fileName}>
          <Fragment>
            {errors.validationResult ? (
              <Card.Body style={{ padding: "0.5rem 0.5rem 0 0.5rem" }}>
                {errors.validationResult.errors.map((err) => {
                  return (
                    <Card
                      style={{
                        backgroundColor: defaultTheme.color6,
                        color: defaultTheme.color5,
                        marginBottom: "0.5rem",
                      }}
                    >
                      <Card.Header>
                        <Table size="sm" style={{ marginBottom: "0" }}>
                          <tr>
                            <th style={noBorderStyle}>Proprieta: </th>
                            <td style={noBorderStyle}>{err.propertyName}</td>
                          </tr>
                          <tr>
                            <th style={noBorderStyle}>Errore: </th>
                            <td style={noBorderStyle}>{err.errorMessage}</td>
                          </tr>
                        </Table>
                      </Card.Header>
                      <Card.Body>
                        {Array.isArray(err.attemptedValue) ? (
                          err.attemptedValue.map((av) => (
                            <Fragment>
                              <strong>Valore ricevuto:</strong>
                              <pre style={{ margin: "0" }}>
                                {JSON.stringify(av, null, 4)}
                              </pre>
                            </Fragment>
                          ))
                        ) : (
                          <Fragment>
                            <strong>Valore ricevuto:</strong>
                            <pre>
                              {JSON.stringify(err.attemptedValue, null, 4)}
                            </pre>
                          </Fragment>
                        )}
                      </Card.Body>
                    </Card>
                  );
                })}
              </Card.Body>
            ) : null}
          </Fragment>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

InvoiceStoringError.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default InvoiceStoringError;

const noBorderStyle = {
  border: "none",
};

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
