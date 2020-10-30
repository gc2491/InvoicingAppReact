import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { v4 as uuid } from "uuid";

import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

import Riepilogo from "./Riepilogo";
import Pagamenti from "./Pagamenti";

import PaymentButton from "./Buttons/PaymentButton";
import DeleteButton from "./Buttons/DeleteButton";
import BeniServizi from "./BeniServizi";

import outputDate from "../../Functions/outputDate";
import appSettings from "../../appSettings.json";
import { defaultTheme } from "../../Constants/colorSchemes";
import invoiceTabTypes from "../../Constants/invoiceTabTypes";

const InvoiceSimplified = ({ invoice, invId }) => {
  const [currentType, setCurrentType] = useState();
  const [collapseState, setCollapseState] = useState({
    maxHeight: "0",
    transition: "max-height 0.2s 0s",
    overflow: "hidden",
  });

  let datiRiepilogo = (
    <Riepilogo data={riepilogoData(invoice.datiBeniServizi)} total={null} />
  );

  let datiBeniServizi = (
    <BeniServizi invId={invId} beniServizi={invoice.datiBeniServizi} />
  );

  let datiPagamenti = <Pagamenti pagamenti={invoice.datiPagamento} />;

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
    <div style={functionButtonStyle}>
      <Card style={{ backgroundColor: defaultTheme.color3 }}>
        <Card.Header
          style={{
            backgroundColor: defaultTheme.color6,
            color: defaultTheme.color5,
            padding: "0.5rem",
          }}
        >
          <Card.Title style={cardTitleRightStyle}>
            <PaymentButton
              payments={invoice.datiPagamento}
              contiBancari={invoice.cedentePrestatore.contiBancari}
              bodyModelId={invoice.id}
              cliforId={invoice.cedentePrestatore.id}
            />
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
                onSelect={() => showCard(invoiceTabTypes.datiRiepilogo)}
              >
                Riepilogo
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                style={
                  currentType === invoiceTabTypes.datiBeniServizi
                    ? selectedStyle
                    : navLinkStyle
                }
                href="#"
                onSelect={() => showCard(invoiceTabTypes.datiBeniServizi)}
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
                onClick={() => showCard(invoiceTabTypes.datiPagamento)}
              >
                Pagamenti
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <div style={collapseState}>
          {currentType === invoiceTabTypes.datiRiepilogo ? (
            <Riepilogo
              data={riepilogoData(invoice.datiBeniServizi)}
              total={null}
            />
          ) : currentType === invoiceTabTypes.datiBeniServizi ? (
            <BeniServizi invId={invId} beniServizi={invoice.datiBeniServizi} />
          ) : currentType === invoiceTabTypes.datiPagamento ? (
            <Pagamenti key={uuid()} pagamenti={invoice.datiPagamento} />
          ) : null}
        </div>
      </Card>
    </div>
  );
};

InvoiceSimplified.propTypes = {
  invoice: PropTypes.object.isRequired,
  invId: PropTypes.string.isRequired,
};

export default connect(null, null)(InvoiceSimplified);

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

const riepilogoData = (datiBeniServizi) => {
  let data = [];
  let indexes = [];

  datiBeniServizi.forEach((dbs) => {
    let aliquotaIndex = indexes.indexOf(dbs.aliquota);

    if (aliquotaIndex === -1) {
      indexes.push(dbs.aliquota);
      let temp = {};

      temp.aliquotaIVA = dbs.aliquota;
      temp.imponibileImporto = dbs.importo;
      temp.imposta = dbs.imposta;

      data.push(temp);
    } else {
      data[aliquotaIndex].imponibileImporto += dbs.importo;
      data[aliquotaIndex].imposta += dbs.imposta;
    }
  });

  return data;
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

const cardTitleRightStyle = {
  display: "inline",
  float: "right",
};

const functionButtonStyle = {
  margin: "0.5rem 0",
};

const navLinkStyle = {
  color: defaultTheme.color5,
  padding: "0 0.5rem",
};

const selectedStyle = {
  color: defaultTheme.color5,
  backgroundColor: defaultTheme.color3,
  border: "1px solid #dee2e6",
  borderBottom: "2px solid " + defaultTheme.color2,
  padding: "0 0.5rem",
};
