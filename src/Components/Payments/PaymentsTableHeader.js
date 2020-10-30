import React from "react";

import { connect } from "react-redux";

import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

import { defaultTheme } from "../../Constants/colorSchemes";

const PaymentsTableHeader = () => {
  return (
    <Accordion style={{ marginBottom: "0.5rem" }}>
      <Card>
        <Card.Header
          style={{
            backgroundColor: defaultTheme.color8,
            padding: "0.5rem",
          }}
        >
          <Table size="sm" style={{ margin: "0", color: defaultTheme.color4 }}>
            <thead>
              <tr style={{ border: "none" }}>
                <th style={{ width: "25%", border: "none", padding: "0" }}>
                  Cli/For
                </th>
                <th
                  style={{ width: "10%", border: "none", padding: "0" }}
                  className="text-center"
                >
                  Numero
                </th>
                <th
                  style={{ width: "18%", border: "none", padding: "0" }}
                  className="text-center"
                >
                  Data
                </th>
                <th
                  style={{ width: "10%", border: "none", padding: "0" }}
                  className="text-center"
                >
                  Modalita
                </th>
                <th
                  style={{ width: "15%", border: "none", padding: "0" }}
                  className="text-center"
                >
                  Scadenza
                </th>
                <th
                  style={{
                    width: "17%",
                    border: "none",
                    padding: "0",
                  }}
                  className="text-right"
                >
                  Importo
                </th>
              </tr>
            </thead>
          </Table>
        </Card.Header>
      </Card>
    </Accordion>
  );
};

export default connect(null, null)(PaymentsTableHeader);
