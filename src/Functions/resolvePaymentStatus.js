import outputDate from "./outputDate";

const resolvePaymentStatus = (dettaglioPagamento) => {
  const today = outputDate(new Date(), "yyyymmdd");
  let temp = "";
  dettaglioPagamento.forEach((dp) => {
    if (
      dp.paymentDate !== null &&
      (temp === "" || temp === paymentStatus.PAID)
    ) {
      temp = paymentStatus.PAID;
    } else if (outputDate(dp.dataScadenzaPagamento, "yyyymmdd") < today) {
      temp = paymentStatus.OVERDUE;
    } else if (
      getDaysDifference(
        today,
        outputDate(dp.dataScadenzaPagamento, "yyyymmdd")
      ) <= 30 &&
      temp !== paymentStatus.OVERDUE
    ) {
      temp = paymentStatus.DUE;
    } else {
      if (temp !== paymentStatus.DUE && temp !== paymentStatus.OVERDUE) {
        temp = paymentStatus.DEFAULT;
      }
    }
  });

  return temp;
};

const getDaysDifference = (date1, date2) => {
  let d1 = Date.parse(date1);
  let d2 = Date.parse(date2);
  let diff = Math.abs(d1 - d2);
  return diff / (1000 * 60 * 60 * 24);
};

export const paymentStatus = {
  DEFAULT: "outline-primary",
  PAID: "success",
  DUE: "warning",
  OVERDUE: "danger",
};

export default resolvePaymentStatus;

// import outputDate from "./outputDate";

// const resolvePaymentStatus = (datiPagamento) => {
//   const today = outputDate(new Date(), "yyyymmdd");
//   let status = "";
//   datiPagamento.forEach((dati) => {
//     let temp = "";
//     dati.dettaglioPagamento.forEach((dp) => {
//       if (
//         dp.paymentDate !== null &&
//         (temp === "" || temp === paymentStatus.PAID)
//       ) {
//         temp = paymentStatus.PAID;
//       } else if (outputDate(dp.dataScadenzaPagamento, "yyyymmdd") < today) {
//         temp = paymentStatus.OVERDUE;
//       } else if (
//         getDaysDifference(
//           today,
//           outputDate(dp.dataScadenzaPagamento, "yyyymmdd")
//         ) <= 30 &&
//         temp !== paymentStatus.OVERDUE
//       ) {
//         temp = paymentStatus.DUE;
//       } else {
//         if (temp !== paymentStatus.DUE && temp !== paymentStatus.OVERDUE) {
//           temp = paymentStatus.DEFAULT;
//         }
//       }
//     });

//     switch (status) {
//       case "":
//         status = temp;
//         break;
//       case paymentStatus.PAID:
//         status = temp;
//         break;
//       case paymentStatus.OVERDUE:
//         break;
//       case paymentStatus.DUE:
//         if (temp === paymentStatus.OVERDUE) status = temp;
//         break;
//       case paymentStatus.DEFAULT:
//         if (temp === paymentStatus.DUE || temp === paymentStatus.OVERDUE) {
//           status = temp;
//         }
//         break;

//       default:
//         break;
//     }
//   });

//   return status;
// };

// const getDaysDifference = (date1, date2) => {
//   let d1 = Date.parse(date1);
//   let d2 = Date.parse(date2);
//   let diff = Math.abs(d1 - d2);
//   return diff / (1000 * 60 * 60 * 24);
// };

// export const paymentStatus = {
//   DEFAULT: "outline-primary",
//   PAID: "success",
//   DUE: "warning",
//   OVERDUE: "danger",
// };

// export default resolvePaymentStatus;
