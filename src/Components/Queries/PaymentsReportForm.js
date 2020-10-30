import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import axios from "axios";
import fileSaver from "file-saver";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";

import InputWithTooltip from "../Reusables/Inputs/InputWithTooltip";

import { getCPId } from "../../actions/invoices";
import { defaultTheme } from "../../Constants/colorSchemes";

const PaymentsReportForm = ({ getCPId, clifors }) => {
  const [errors, setErrors] = useState({});
  const [queryForm, updateQueryForm] = useState({ begin: "2010-01-01" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    formErrors = await getPaymentsReport(queryForm, setLoading);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <div style={{ borderBottom: "2px solid " + defaultTheme.color2 }}>
      <Form style={{ marginBottom: "0.5rem" }} onSubmit={(e) => onSubmit(e)}>
        <h3 style={{ color: defaultTheme.color2 }}>Report pagamenti</h3>
        <Form.Row>
          <InputWithTooltip
            md="3"
            label="Fornitore:"
            errors={errors.clifor}
            list="clifor"
            value={queryForm.clifor}
            onChange={(e) => {
              getCPId(e.target.value);
              updateQueryForm({
                ...queryForm,
                clifor: e.target.value,
                cliforId: clifors[e.target.value] ? clifors[e.target.value] : 0,
              });
            }}
          />
          <datalist id="clifor">
            {clifors !== undefined
              ? Object.keys(clifors).map((cf) => (
                  <option key={clifors[cf]} value={cf}>
                    Id: {clifors[cf]}
                  </option>
                ))
              : null}
          </datalist>
          <Form.Group md="3" as={Col}>
            <Form.Label>Dal: </Form.Label>
            <Form.Control
              type="date"
              value={queryForm.begin}
              onChange={(e) =>
                updateQueryForm({ ...queryForm, begin: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group md="3" as={Col}>
            <Form.Label>Al: </Form.Label>
            <Form.Control
              type="date"
              value={queryForm.end}
              onChange={(e) =>
                updateQueryForm({ ...queryForm, end: e.target.value })
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Group
          md="3"
          as={Col}
          onClick={(e) =>
            updateQueryForm({
              ...queryForm,
              emitted: !queryForm.emitted,
            })
          }
        >
          <Form.Check
            type="checkbox"
            label="Fatture emesse"
            checked={queryForm.emitted}
            onClick={(e) =>
              updateQueryForm({
                ...queryForm,
                emitted: !queryForm.emitted,
              })
            }
          />
        </Form.Group>
        <Button className="noShadow" type="submit" style={submitStyle}>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
          Cerca
        </Button>
        {errors.notFound ? (
          <span style={{ margin: "0.5rem", color: "red" }}>
            {errors.notFound}
          </span>
        ) : null}
      </Form>
    </div>
  );
};

PaymentsReportForm.propTypes = {
  getCPId: PropTypes.func.isRequired,
  clifors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  clifors: state.invoices.data.clifors,
});

export default connect(mapStateToProps, {
  getCPId,
})(PaymentsReportForm);

const getPaymentsReport = async (
  { clifor, cliforId, begin, end, emitted },
  setLoading
) => {
  setLoading(true);

  let params = {};

  if (!!cliforId) params["cliforId"] = cliforId;
  if (!!clifor) params["clifor"] = clifor;
  if (!!Date.parse(begin)) params["begin"] = begin;
  if (!!Date.parse(end)) params["end"] = end;
  params["emitted"] = !!emitted;

  try {
    let preRequest = await axios.get("/api/queries/paymentsreport", {
      params,
      responseType: "json",
    });

    if (preRequest.response && preRequest.response.status === 400) {
      setLoading(false);
      return preRequest.response.data.errors;
    }

    if (preRequest.response && preRequest.response.status === 404) {
      setLoading(false);
      return { notFound: "Nessun pagamento trovato" };
    }

    let res = await axios.get("/api/queries/paymentsreport", {
      params,
      responseType: "blob",
    });

    let fileName = res.headers["content-disposition"]
      .split(";")[1]
      .split("=")[1];
    console.log(fileName);
    fileSaver.saveAs(res.data, fileName);

    setLoading(false);

    return {};
  } catch (error) {
    setLoading(false);

    if (error.response) {
      return error.response.data.errors;
    } else {
      return {};
    }
  }
};

const submitStyle = {
  width: "100px",
  backgroundColor: defaultTheme.color8,
  borderColor: defaultTheme.color8,
};
