import {
  // INVOICES
  GET_INVOICES,
  CLEAR_INVOICES,
  LOADING_INVOICES,
  LOADING_NEW_INVOICES,
  CLEAR_STORING_RESULT,
  DELETE_INVOICE,
  GET_CP_ID,
  UPDATE_PAYMENT_DETAILS,
  UPDATE_INVOICES_FORM,
  UPDATING_PAYMENTS,
  STORE_INVOICES,
  SET_PAYMENTS_STATUS,
  ADD_DETTAGLIO_PAGAMENTO,
  DELETE_DETTAGLIO_PAGAMENTO,
  ADD_DATI_PAGAMENTO,
  UPDATE_DATI_PAGAMENTO,
  DELETE_DATI_PAGAMENTO,
  CHANGE_ACTIVE_DATI_PAGAMENTO,
  // PAYMENTS
  GET_PAYMENTS,
  LOADING_PAYMENTS,
  UPDATE_PAYMENTS_FORM,
  SHOW_LAST_INVOICES,
} from "../actions/types";

const initialState = {
  data: {
    invoices: [],
    clifors: {},
    payments: [],
    invoicePaymentsStatus: {},
  },
  pagination: {
    invoices: {
      currentPage: 1,
      totalPages: 1,
    },
    payments: {
      currentPage: 1,
      totalPages: 1,
    },
  },
  forms: {
    invoices: {
      name: "",
      number: "",
      begin: "2010-01-01",
      end: "",
      emitted: false,
      ascending: false,
      page: 1,
    },
    payments: {
      emitted: false,
      endDate: "",
      name: "",
      page: 1,
    },
  },
  status: {
    invoices: {
      loadingInvoices: false,
      loadingNewInv: false,
      updatingPayments: false,
    },
    payments: {
      loadingPayments: false,
    },
  },
  results: {
    storing: null,
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  let newState = { ...state };

  switch (type) {
    // INVOICES PAGE

    case GET_INVOICES:
      return {
        ...state,
        data: { ...state.data, invoices: [...payload.invoices] },
        status: { ...state.status, loadingInvoices: payload.loadingInvoices },
        pagination: {
          ...state.pagination,
          invoices: {
            currentPage: payload.currentPage,
            totalPages: payload.totalPages,
          },
        },
      };

    case CLEAR_INVOICES:
      return { ...state, data: { ...state.data, invoices: [] } };

    case DELETE_INVOICE:
      newState.data.invoices = newState.data.invoices.filter(
        (i) => i.id !== payload
      );
      return newState;

    case LOADING_INVOICES:
      return {
        ...state,
        status: {
          ...state.status,
          invoices: { ...state.status.invoices, loadingInvoices: payload },
        },
      };

    case LOADING_NEW_INVOICES:
      return {
        ...state,
        status: {
          ...state.status,
          invoices: { ...state.status.invoices, loadingNewInv: payload },
        },
      };

    case STORE_INVOICES:
      return {
        ...state,
        results: { ...state.results, storing: payload },
      };

    case CLEAR_STORING_RESULT:
      return {
        ...state,
        results: { ...state.results, storing: null },
      };

    case GET_CP_ID:
      return { ...state, data: { ...state.data, clifors: payload } };

    case UPDATING_PAYMENTS:
      return {
        ...state,
        status: {
          ...state.status,
          invoices: { ...state.status.invoices, updatingPayments: payload },
        },
      };

    case UPDATE_INVOICES_FORM:
      return {
        ...state,
        forms: { ...state.forms, invoices: action.payload },
      };

    case SET_PAYMENTS_STATUS:
      newState.data.invoicePaymentsStatus[payload.invId] = payload.status;
      return newState;

    case ADD_DATI_PAGAMENTO:
      // console.log(JSON.stringify(payload, null, 4));
      newState.data.invoices.forEach((inv, i) => {
        if (inv.id === payload[0].bodyModelId) {
          newState.data.invoices[i].datiPagamento = payload;
        }
      });

      return newState;

    case UPDATE_DATI_PAGAMENTO:
      newState.data.invoices.forEach((inv, i) => {
        inv.datiPagamento.forEach((dati, j) => {
          if (dati.id === payload.id) {
            newState.data.invoices[i].datiPagamento[j].condizioniPagamento =
              payload.condizioniPagamento;
          }
        });
      });

      return newState;

    case DELETE_DATI_PAGAMENTO:
      newState.data.invoices.forEach((inv, i) => {
        inv.datiPagamento.forEach((dati, j) => {
          if (dati.id === payload) {
            newState.data.invoices[i].datiPagamento.splice(j, 1);
          }
        });
      });

      return newState;

    case CHANGE_ACTIVE_DATI_PAGAMENTO:
      for (var i = 0; i < newState.data.invoices.length; i++) {
        if (newState.data.invoices[i].id === payload.bodyModelId) {
          newState.data.invoices[i].datiPagamento.forEach((dp, j) => {
            if (
              newState.data.invoices[i].datiPagamento[j].id ===
              payload.datiPagamentoModelId
            ) {
              newState.data.invoices[i].datiPagamento[j].active = true;
            } else {
              newState.data.invoices[i].datiPagamento[j].active = false;
            }
          });

          break;
        }
      }

      return newState;

    case DELETE_DETTAGLIO_PAGAMENTO:
      newState.data.invoices.forEach((inv, i) => {
        inv.datiPagamento.forEach((dati, j) => {
          dati.dettaglioPagamento.forEach((dp, k) => {
            if (dp.id === payload) {
              newState.data.invoices[i].datiPagamento[
                j
              ].dettaglioPagamento.splice(k, 1);
            }
          });
        });
      });
      return newState;

    case ADD_DETTAGLIO_PAGAMENTO:
      newState.data.invoices.forEach((inv, i) => {
        if (inv.id === payload.bodyModelId) {
          inv.datiPagamento.forEach((dp, j) => {
            if (dp.id === payload.datiPagamentoModelId) {
              newState.data.invoices[i].datiPagamento[j].dettaglioPagamento =
                payload.data;
            }
          });
        }
      });

      return newState;

    case SHOW_LAST_INVOICES:
      return {
        ...state,
        data: { ...state.data, invoices: payload },
        pagination: {
          ...state.pagination,
          invoices: {
            currentPage: 1,
            totalPages: 1,
          },
        },
      };

    // PAYMENTS PAGE

    case GET_PAYMENTS:
      return {
        ...state,
        data: { ...state.data, payments: payload.payments },
        pagination: {
          ...state.pagination,
          payments: {
            currentPage: payload.currentPage,
            totalPages: payload.totalPages,
          },
        },
      };

    case LOADING_PAYMENTS:
      return {
        ...state,
        status: {
          ...state.status,
          invoices: { ...state.status.invoices, loadingPayments: payload },
        },
      };

    case UPDATE_PAYMENTS_FORM:
      return { ...state, forms: { ...state.forms, payments: payload } };

    case UPDATE_PAYMENT_DETAILS:
      // Update invoices
      newState.data.invoices.forEach((i, r) => {
        i.datiPagamento.forEach((dp, t) => {
          dp.dettaglioPagamento.forEach((dett, y) => {
            if (payload.id === dett.id) {
              newState.data.invoices[r].datiPagamento[t].dettaglioPagamento[
                y
              ] = payload;
            }
          });
        });
      });

      // Update payments
      newState.data.payments.forEach((dp, i) => {
        if (dp.dettaglioPagamento.id === payload.id) {
          newState.data.payments[i].dettaglioPagamento = payload;
        }
      });

      return newState;

    default:
      return state;
  }
};
