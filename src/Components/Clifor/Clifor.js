import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import axios from "axios";

import Table from "react-bootstrap/Table";

import Sedi from "./Sedi";
import Contatti from "./Contatti";
import ContiBancari from "./ContiBancari";
import UltimeFatture from "./UltimeFatture";
import { showLastInvoices } from "../../actions/invoices";

const CliFor = ({ showLastInvoices }) => {
  const { id } = useParams();
  const [clifor, setClifor] = useState();
  const [status, setStatus] = useState();
  const [redirect, setRedirect] = useState(false);

  const updateClifor = async () => {
    await getClifor(id, setClifor, setStatus);
  };

  useEffect(() => {
    getClifor(id, setClifor, setStatus);
  }, [id]);

  if (status === 404) {
    return (
      <Fragment>
        <h1>404 - Risorsa non trovata</h1>
      </Fragment>
    );
  }

  if (!clifor) return null;

  if (redirect) return <Redirect to={{ pathName: "/fatture" }} />;

  return (
    <div key="clifor">
      <h2>
        {clifor.denominazione
          ? clifor.denominazione
          : clifor.Nome + " " + clifor.Cognome}
      </h2>
      <Table>
        <tbody>
          <tr>
            <th>Partita Iva</th>
            <td>{clifor.idPaese + clifor.idCodice}</td>
            <th>Codice Fiscale</th>
            <td>{clifor.codiceFiscale ? clifor.codiceFiscale : "/"}</td>
          </tr>
        </tbody>
      </Table>
      <ContiBancari
        updateClifor={updateClifor}
        cliforId={clifor.id}
        contiBancari={clifor.contiBancari}
      />
      <Contatti
        updateClifor={updateClifor}
        cliforId={clifor.id}
        contatti={clifor.contatti}
      />
      <Sedi
        updateClifor={updateClifor}
        cliforId={clifor.id}
        sedi={clifor.sedi}
      />
      <UltimeFatture
        fatture={clifor.bodyModelCP}
        title="Ultime fatture emesse:"
        style={{ float: "left", width: "49%" }}
        redirectToSearch={() =>
          redirectToSearch(clifor, showLastInvoices, setRedirect, true)
        }
      />
      <UltimeFatture
        fatture={clifor.bodyModelCC}
        title="Ultime fatture ricevute:"
        style={{ float: "right", width: "49%" }}
        redirectToSearch={() =>
          redirectToSearch(clifor, showLastInvoices, setRedirect, false)
        }
      />
    </div>
  );
};

export default connect(null, { showLastInvoices })(CliFor);

const getClifor = async (id, setClifor, setStatus) => {
  try {
    let res = await axios.get(`/api/invoice/clifor/${id}`);
    setClifor(res.data);
    setStatus(200);
  } catch (error) {
    setStatus(404);
    if (error.response.status === 401) {
      window.location.reload();
    }
  }
};

const redirectToSearch = (clifor, showLastInvoices, setRedirect, emitted) => {
  var invoices = null;
  if (emitted) {
    invoices = clifor.bodyModelCP;
  } else {
    invoices = clifor.bodyModelCC;
  }

  clifor.bodyModelCC = null;
  clifor.bodyModelCP = null;

  var length = invoices.length;
  if (clifor.id === invoices[0].cedentePrestatoreId) {
    for (var i = 0; i < length; i++) {
      invoices[i].cedentePrestatore = clifor;
    }
  } else {
    for (var j = 0; j < length; j++) {
      invoices[j].cessionarioCommittente = clifor;
    }
  }

  showLastInvoices(invoices);

  setRedirect(true);
};
