const outputDate = (date, format) => {
  let d = new Date(date);
  let temp = { d: "", m: "", y: "" };

  temp.d = String(d.getDate()).padStart(2, "0");
  temp.m = String(d.getMonth() + 1).padStart(2, "0");
  temp.y = d.getFullYear();

  if (format === "yyyymmdd") return String(`${temp.y}-${temp.m}-${temp.d}`);
  else return `${temp.d}/${temp.m}/${temp.y}`;
};

export default outputDate;
