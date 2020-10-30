import React, { Fragment } from "react";

import ProductReportForm from "./ProductReportForm";
import PaymentsReportForm from "./PaymentsReportForm";

const Queries = () => {
  return (
    <Fragment>
      <ProductReportForm />
      <PaymentsReportForm />
    </Fragment>
  );
};

Queries.propTypes = {};

export default Queries;

