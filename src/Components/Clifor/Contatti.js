import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import { faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";

import Table from "react-bootstrap/Table";

import EditButton from "../Reusables/Inputs/EditButton";
import ContattoForm from "./ContattoForm";

import { defaultTheme } from "../../Constants/colorSchemes";

const Contatti = ({ cliforId, contatti, updateClifor }) => {
  const [arrayContatti, setArrayContatti] = useState([]);

  useEffect(() => {
    setArrayContatti([...contatti]);
  }, [contatti]);

  if (!arrayContatti) return;
  return (
    <Fragment>
      <div style={{ marginBottom: "0.5rem" }}>
        <h3 style={{ display: "inline" }}>Contatti</h3>
        <EditButton
          key="update"
          arrHasElements={arrayContatti.length > 0}
          title="Modifica Contatti"
          icon={faPhone}
        >
          <div>
            {arrayContatti.map((c, i) => (
              <div
                key={c.id + "div"}
                style={
                  i === contatti.length - 1
                    ? {}
                    : {
                        borderBottom: "2px solid " + defaultTheme.color7,
                        marginBottom: "0.5rem",
                        paddingBottom: "0.5rem",
                      }
                }
              >
                <ContattoForm
                  key={c.id}
                  updateClifor={updateClifor}
                  action="update"
                  contatto={c}
                />
              </div>
            ))}
          </div>
        </EditButton>
        <EditButton
          key="create"
          arrHasElements={true}
          title="Aggiungi contatto"
          icon={faPlus}
        >
          <ContattoForm
            action="create"
            contatto={{ cliforModelId: cliforId }}
            updateClifor={updateClifor}
          />
        </EditButton>
      </div>
      {arrayContatti.length > 0 ? (
        <Table>
          <tbody>
            <tr>
              <th>Descrizione</th>
              <th>E-mail</th>
              <th>Telefono</th>
              <th>Fax</th>
            </tr>
            {arrayContatti.map((contatto, i) => (
              <tr key={i}>
                <td>{contatto.description}</td>
                <td>{contatto.email}</td>
                <td>{contatto.telefono}</td>
                <td>{contatto.fax}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </Fragment>
  );
};

export default connect()(Contatti);
