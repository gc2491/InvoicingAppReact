import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Button from "react-bootstrap/Button";

const Filter = ({ type, property, array, returnFiltered, resetFilter }) => {
  const [operatorType, setOperatorType] = useState("=");
  const [filterValue, setFilterValue] = useState("");
  const [filterValue2, setFilterValue2] = useState("");

  useEffect(() => {
    setOperatorType("=");
    setFilterValue("");
    setFilterValue2("");
  }, [resetFilter]);

  useEffect(() => {
    returnFiltered(
      filterArray(
        array,
        property,
        operatorType,
        filterValue,
        filterValue2,
        type
      )
    );
  }, [
    filterValue,
    filterValue2,
    operatorType,
    returnFiltered,
    array,
    property,
    type,
  ]);

  switch (type) {
    case "comparative":
      return (
        <InputGroup className="mb-3" size="sm">
          <InputGroup.Prepend>
            <OverlayTrigger
              trigger="focus"
              key={"bottom"}
              placement={"bottom"}
              overlay={
                <div style={overlayContainerStyle}>
                  <Button
                    style={optionStyle}
                    variant="outline-primary"
                    key="eq"
                    onFocus={() => setOperatorType("=")}
                  >
                    {"="}
                  </Button>
                  <Button
                    style={optionStyle}
                    variant="outline-primary"
                    key="st"
                    onFocus={() => setOperatorType("<")}
                  >
                    {"<"}
                  </Button>
                  <Button
                    style={optionStyle}
                    variant="outline-primary"
                    key="gt"
                    onFocus={() => setOperatorType(">")}
                  >
                    {">"}
                  </Button>
                  <Button
                    style={optionStyle}
                    variant="outline-primary"
                    key="gte"
                    onFocus={() => setOperatorType(">=")}
                  >
                    {">="}
                  </Button>
                  <Button
                    style={optionStyle}
                    variant="outline-primary"
                    key="ste"
                    onFocus={() => setOperatorType("<=")}
                  >
                    {"<="}
                  </Button>
                  <Button
                    style={optionStyle}
                    variant="outline-primary"
                    key="comp"
                    onFocus={() => setOperatorType("><")}
                  >
                    {"><"}
                  </Button>
                  <Button
                    style={optionStyle}
                    variant="outline-primary"
                    key="esc"
                    onFocus={() => setOperatorType("<>")}
                  >
                    {"<>"}
                  </Button>
                </div>
              }
            >
              <Button style={btnStyle} variant="outline-primary">
                {operatorType}
              </Button>
            </OverlayTrigger>
          </InputGroup.Prepend>
          <InputGroup.Prepend>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                setOperatorType("=");
                setFilterValue("");
                setFilterValue2("");
              }}
            >
              x
            </Button>
          </InputGroup.Prepend>
          <FormControl
            aria-label="primary"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          {operatorType === "<>" || operatorType === "><" ? (
            <FormControl
              aria-label="secondary"
              value={filterValue2}
              onChange={(e) => setFilterValue2(e.target.value)}
            />
          ) : null}
        </InputGroup>
      );

    case "txt":
      return (
        <InputGroup className="mb-3" size="sm">
          <InputGroup.Prepend>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                setOperatorType("=");
                setFilterValue("");
                setFilterValue2("");
              }}
            >
              x
            </Button>
          </InputGroup.Prepend>
          <FormControl
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
          />
        </InputGroup>
      );

    default:
      break;
  }
};

Filter.propTypes = {
  type: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  array: PropTypes.array.isRequired,
  returnFiltered: PropTypes.func.isRequired,
  resetFilter: PropTypes.bool.isRequired,
};

export default Filter;

const filterArray = (
  array,
  property,
  operatorType,
  filterValue,
  filterValue2,
  type
) => {
  if (filterValue === "" && filterValue2 === "") {
    return array;
  }

  switch (type) {
    case "txt":
      return array.filter((element) => {
        if (filterValue === "/" || filterValue === "\\") {
          if (!element[property]) return true;
        }
        if (element[property]) {
          return element[property]
            .toUpperCase()
            .includes(filterValue.toUpperCase());
        }

        return true;
      });

    case "comparative":
      return array.filter((element) => {
        if (!!filterValue) {
          switch (operatorType) {
            case "=":
              return +element[property] === +filterValue;
            case ">":
              return +element[property] > +filterValue;
            case "<":
              return +element[property] < +filterValue;
            case ">=":
              return +element[property] >= +filterValue;
            case "<=":
              return +element[property] <= +filterValue;

            default:
              break;
          }
        }

        switch (operatorType) {
          case "<>":
            if (filterValue && filterValue2) {
              return (
                +element[property] <= +filterValue ||
                +element[property] >= +filterValue2
              );
            }

            if (filterValue && !filterValue2) {
              return +element[property] <= +filterValue;
            }

            if (!filterValue && filterValue2) {
              return +element[property] >= +filterValue2;
            }

            return true;

          case "><":
            if (filterValue && filterValue2) {
              return (
                +element[property] >= +filterValue &&
                +element[property] <= +filterValue2
              );
            }

            if (filterValue && !filterValue2) {
              return +element[property] >= +filterValue;
            }

            if (!filterValue && filterValue2) {
              return +element[property] <= +filterValue2;
            }
            return true;

          default:
            return true;
        }
      });

    default:
  }
};

let overlayContainerStyle = {
  backgroundColor: "#ebf5ff",
  border: "3px solid #cfe5fa",
  borderRadius: "5px",
};
let btnStyle = {
  width: "35px",
  margin: "0",
};
let optionStyle = {
  width: "45px",
  margin: "12px",
};
