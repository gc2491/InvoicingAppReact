import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { v4 as uuid } from "uuid";

import Invoice from "./Invoice";
import InvoicesForm from "./InvoicesForm";
import CustomPagination from "../Reusables/CustomPagination";

import InvoiceStoringResult from "../Results/InvoiceStoringResult";

import {
  getInvoices,
  clearInvoices,
  updateInvoicesForm,
} from "../../actions/invoices";
import InvoiceSimplified from "./InvoiceSimplified";
import { setPaymentsStatus } from "../../actions/invoices";

const Invoices = ({ getInvoices, invoices, pagination, invoicesForm }) => {
  return (
    <Fragment>
      <InvoicesForm />
      <InvoiceStoringResult />
      {invoices.data.invoices
        ? invoices.data.invoices.map((invoice) => {
            return invoice.simplified ? (
              <InvoiceSimplified
                key={invoices.id}
                rerender={uuid()}
                invId={invoice.id + invoice.data + invoice.numero}
                invoice={invoice}
              />
            ) : (
              <Invoice
                key={invoice.id}
                rerender={uuid()}
                invId={invoice.id + invoice.data + invoice.numero}
                invoice={invoice}
              />
            );
          })
        : null}
      {invoices.data.invoices.length > 0 ? (
        <CustomPagination
          pagination={pagination}
          getPageFunc={getInvoices}
          form={invoicesForm}
        />
      ) : null}
    </Fragment>
  );
};

Invoices.propTypes = {
  invoices: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  invoicesForm: PropTypes.object.isRequired,
  getInvoices: PropTypes.func.isRequired,
  updateInvoicesForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  invoices: state.invoices,
  pagination: state.invoices.pagination.invoices,
  invoicesForm: state.invoices.forms.invoices,
});

export default connect(mapStateToProps, {
  getInvoices,
  clearInvoices,
  updateInvoicesForm,
  setPaymentsStatus,
})(Invoices);
