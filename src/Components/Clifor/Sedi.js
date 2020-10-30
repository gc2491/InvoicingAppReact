import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import { faBuilding, faPlus } from "@fortawesome/free-solid-svg-icons";

import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import SedeForm from "./SedeForm";

import EditButton from "../Reusables/Inputs/EditButton";

import { defaultTheme } from "../../Constants/colorSchemes";

const Sedi = ({ cliforId, sedi, updateClifor }) => {
  const [arraySedi, setArraySedi] = useState([]);

  useEffect(() => {
    setArraySedi([...sedi]);
  }, [sedi]);

  if (!arraySedi) return;
  return (
    <Fragment>
      <div style={{ marginBottom: "0.5rem" }}>
        <h3 style={{ display: "inline" }}>Sedi</h3>
        <EditButton
          arrHasElements={sedi.length > 0}
          title="Modifica sedi"
          icon={faBuilding}
        >
          {sedi.map((sede, i) => (
            <div
              key={sede.id + "div"}
              style={
                i === sedi.length - 1
                  ? {}
                  : {
                      borderBottom: "2px solid " + defaultTheme.color7,
                      marginBottom: "0.5rem",
                      paddingBottom: "0.5rem",
                    }
              }
            >
              <SedeForm
                key={sede.id}
                action="update"
                sede={sede}
                updateClifor={updateClifor}
              />
            </div>
          ))}
        </EditButton>
        <EditButton
          key="create"
          arrHasElements={true}
          title="Aggiungi sede"
          icon={faPlus}
        >
          <SedeForm
            action="create"
            sede={{ cliforModelId: cliforId }}
            updateClifor={updateClifor}
          />
        </EditButton>
      </div>
      {sedi.length > 0
        ? sedi.map((sede, i) => (
            <Accordion key={i}>
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={"sede" + i}
                  style={{
                    backgroundColor: defaultTheme.color6,
                    color: defaultTheme.color5,
                    padding: "0.5rem",
                  }}
                >
                  {sede.comune}
                  {sede.description ? " - " + sede.description : null}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={"sede" + i}>
                  <Card.Body style={{ margin: "0.5rem", padding: "0" }}>
                    <Table size="sm">
                      <tbody>
                        <tr>
                          <th style={noBorderTop}>Indirizzo:</th>
                          <td style={noBorderTop}>{sede.indirizzo}</td>
                          <th style={noBorderTop}>Numero Civico:</th>
                          <td style={noBorderTop}>
                            {sede.numeroCivico ? sede.numeroCivico : "/"}
                          </td>
                          <th style={noBorderTop}>CAP:</th>
                          <td style={noBorderTop}>{sede.cap}</td>
                        </tr>
                        <tr>
                          <th>Comune:</th>
                          <td>{sede.comune}</td>
                          <th>Provincia:</th>
                          <td>{sede.provincia}</td>
                          <th>Nazione:</th>
                          <td>{sede.nazione}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))
        : null}
    </Fragment>
  );
};

export default connect()(Sedi);

const noBorderTop = {
  borderTop: "none",
};
