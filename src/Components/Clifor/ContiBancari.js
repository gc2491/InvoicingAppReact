import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import { faMoneyCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

import Table from "react-bootstrap/Table";

import EditButton from "../Reusables/Inputs/EditButton";
import ContoBancarioForm from "./ContoBancarioForm";

import { defaultTheme } from "../../Constants/colorSchemes";

const ContiBancari = ({ cliforId, contiBancari, updateClifor }) => {
  const [arrayConti, setArrayConti] = useState([]);

  useEffect(() => {
    setArrayConti([...contiBancari]);
  }, [contiBancari]);

  if (!contiBancari) return;
  return (
    <Fragment>
      <div style={{ marginBottom: "0.5rem" }}>
        <h3 style={{ display: "inline" }}>Conti bancari</h3>
        <EditButton
          key="update"
          arrHasElements={arrayConti.length > 0}
          title="Modifica conti bancari"
          icon={faMoneyCheck}
        >
          <div>
            {arrayConti.map((cb, i) => (
              <div
                key={cb.id + "div"}
                style={
                  i === contiBancari.length - 1
                    ? {}
                    : {
                        borderBottom: "2px solid " + defaultTheme.color7,
                        marginBottom: "0.5rem",
                        paddingBottom: "0.5rem",
                      }
                }
              >
                <ContoBancarioForm
                  key={cb.id}
                  action="update"
                  contoBancario={cb}
                  updateClifor={updateClifor}
                />
              </div>
            ))}
          </div>
        </EditButton>
        <EditButton
          key="create"
          arrHasElements={true}
          title="Aggiungi conto bancario"
          icon={faPlus}
        >
          <ContoBancarioForm
            action="create"
            contoBancario={{ cliforModelId: cliforId }}
            updateClifor={updateClifor}
          />
        </EditButton>
      </div>
      {arrayConti.length > 0 ? (
        <Table>
          <tbody>
            <tr>
              <th>Istituto finanziario:</th>
              <th>IBAN</th>
              <th>ABI</th>
              <th>CAB</th>
              <th>BIC</th>
            </tr>
            {arrayConti.map((conto, i) => (
              <tr key={i}>
                <td>{conto.istitutoFinanziario}</td>
                <td>{conto.iban}</td>
                <td>{conto.abi}</td>
                <td>{conto.cab}</td>
                <td>{conto.bic}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </Fragment>
  );
};

export default connect()(ContiBancari);
