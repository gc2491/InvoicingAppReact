import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { v4 as uuid } from "uuid";

import { connect } from "react-redux";
import { getPayments } from "../../actions/invoices";

import PaymentRow from "./PaymentRow";
import PaymentsForm from "./PaymentsForm";

import Accordion from "react-bootstrap/Accordion";
import PaymentsTableHeader from "./PaymentsTableHeader";
import CustomPagination from "../Reusables/CustomPagination";

const Payments = ({ invoices, pagination, paymentsForm, getPayments }) => {
  return (
    <Fragment>
      <div style={{ marginBottom: "0.5rem" }}>
        <PaymentsForm />
        {invoices.data.payments.length ? <PaymentsTableHeader /> : null}
        <Accordion>
          {invoices.data.payments.map((payment) => {
            return (
              <PaymentRow
                key={payment.dettaglioPagamento.id}
                eventKey={payment.dettaglioPagamento.id}
                payment={payment}
                rerender={uuid()}
              />
            );
          })}
        </Accordion>
      </div>
      {invoices.data.payments.length > 0 ? (
        <CustomPagination
          pagination={pagination}
          getPageFunc={getPayments}
          form={paymentsForm}
        />
      ) : null}
    </Fragment>
  );
};

Payments.propTypes = {
  payments: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  paymentsForm: PropTypes.object.isRequired,
  getPayments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  invoices: state.invoices,
  pagination: state.invoices.pagination.payments,
  paymentsForm: state.invoices.forms.payments,
});

export default connect(mapStateToProps, {
  getPayments,
})(Payments);
