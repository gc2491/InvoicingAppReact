import * as codeValuesTables from "../Constants/codeValueTables";

const convertCodesValues = (codeValue) => {
  const tablesArray = Object.values(codeValuesTables);

  for (let table of tablesArray) {
    let code = Object.keys(table).find((key) => table[key] === codeValue);
    if (code) return code;

    if (table[codeValue]) return table[codeValue];
  }

  return `Parametro ${codeValue} non valido`;
};

export default convertCodesValues;
