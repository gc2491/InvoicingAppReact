import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { v4 as uuid } from "uuid";

import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

import Linee from "./Linee";
import Riepilogo from "./Riepilogo";
import Pagamenti from "./Pagamenti";
import DDT from "./DDT";
import PaymentButton from "./Buttons/PaymentButton";
import DeleteButton from "./Buttons/DeleteButton";

import outputDate from "../../Functions/outputDate";
import appSettings from "../../appSettings.json";
import { defaultTheme } from "../../Constants/colorSchemes";
import invoiceTabTypes from "../../Constants/invoiceTabTypes";

const Invoice = ({ invoice, invId }) => {
  const [currentType, setCurrentType] = useState(null);
  const [collapseState, setCollapseState] = useState({
    maxHeight: "0",
    transition: "max-height 0.2s 0s",
    overflow: "hidden",
  });

  const showCard = (type) => {
    if (currentType === type) {
      if (collapseState.maxHeight === "0") {
        setCollapseState(tabExpanded);
      } else {
        setCollapseState(tabCollapsed);
      }
      setCurrentType(null);
    } else {
      setCurrentType(type);
      setCollapseState(tabExpanded);
    }
  };

  return (
    <div style={divStyle}>
      <Card style={{ backgroundColor: defaultTheme.color3 }}>
        <Card.Header
          style={{
            backgroundColor: defaultTheme.color6,
            color: defaultTheme.color5,
            padding: "0.5rem",
          }}
        >
          <Card.Title style={cardTitleRightStyle}>
            <span>
              <PaymentButton
                payments={invoice.datiPagamento}
                contiBancari={invoice.cedentePrestatore.contiBancari}
                bodyModelId={invoice.id}
                cliforId={invoice.cedentePrestatore.id}
              />
            </span>
            <DeleteButton id={invoice.id} />
          </Card.Title>
          <strong>{cardHeader(invoice)} </strong>- Nr.{invoice.numero} del{" "}
          {outputDate(invoice.data)}
          <Nav variant="tabs" activeKey={currentType}>
            <Nav.Item>
              <Nav.Link
                style={
                  currentType === invoiceTabTypes.datiRiepilogo
                    ? selectedStyle
                    : navLinkStyle
                }
                href="#"
                onClick={() => {
                  showCard(invoiceTabTypes.datiRiepilogo);
                }}
              >
                Riepilogo
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                style={
                  currentType === invoiceTabTypes.datiLinee
                    ? selectedStyle
                    : navLinkStyle
                }
                href="#"
                onClick={() => {
                  showCard(invoiceTabTypes.datiLinee);
                }}
              >
                Linee
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                style={
                  currentType === invoiceTabTypes.datiPagamento
                    ? selectedStyle
                    : navLinkStyle
                }
                href="#"
                onClick={() => {
                  showCard(invoiceTabTypes.datiPagamento);
                }}
              >
                Pagamenti
              </Nav.Link>
            </Nav.Item>
            {invoice.datiDDT.length > 0 ? (
              <Nav.Item>
                <Nav.Link
                  style={
                    currentType === invoiceTabTypes.datiDDT
                      ? selectedStyle
                      : navLinkStyle
                  }
                  href="#"
                  onClick={() => {
                    showCard(invoiceTabTypes.datiDDT);
                  }}
                >
                  DDT
                </Nav.Link>
              </Nav.Item>
            ) : null}
          </Nav>
        </Card.Header>
        <div style={collapseState}>
          {currentType === invoiceTabTypes.datiRiepilogo ? (
            <Riepilogo
              data={invoice.datiRiepilogo}
              total={invoice.importoTotaleDocumento}
            />
          ) : currentType === invoiceTabTypes.datiLinee ? (
            <Linee invId={invId} linee={invoice.dettaglioLinee} />
          ) : currentType === invoiceTabTypes.datiPagamento ? (
            <Pagamenti key={uuid()} pagamenti={invoice.datiPagamento} />
          ) : currentType === invoiceTabTypes.datiDDT ? (
            <DDT datiDDT={invoice.datiDDT} />
          ) : null}
        </div>
      </Card>
    </div>
  );
};

Invoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  invId: PropTypes.string.isRequired,
};

export default connect(null, null)(Invoice);

const cardHeader = (invoice) => {
  if (
    invoice.cedentePrestatore.idPaese + invoice.cedentePrestatore.idCodice ===
    appSettings.Owner
  ) {
    return invoice.cessionarioCommittente.denominazione === null
      ? invoice.cessionarioCommittente.nome +
          " " +
          invoice.cessionarioCommittente.cognome
      : invoice.cessionarioCommittente.denominazione;
  } else {
    return invoice.cedentePrestatore.denominazione === null
      ? invoice.cedentePrestatore.nome + " " + invoice.cedentePrestatore.cognome
      : invoice.cedentePrestatore.denominazione;
  }
};

const tabCollapsed = {
  maxHeight: "0",
  transition: "max-height 0.2s 0s",
  overflow: "hidden",
};
const tabExpanded = {
  maxHeight: "2000px",
  transition: "max-height 0.5s 0s",
  overflow: "hidden",
  padding: "7px",
};

let cardTitleRightStyle = {
  display: "inline",
  float: "right",
};

let divStyle = {
  margin: "0.5rem 0",
};

let navLinkStyle = {
  color: defaultTheme.color5,
  padding: "0 0.5rem",
};

let selectedStyle = {
  color: defaultTheme.color5,
  backgroundColor: defaultTheme.color3,
  borderBottom: "2px solid " + defaultTheme.color2,
  padding: "0 0.5rem",
};
