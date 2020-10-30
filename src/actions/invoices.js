import {
  // INVOICES PAGE
  GET_INVOICES,
  CLEAR_INVOICES,
  LOADING_INVOICES,
  LOADING_NEW_INVOICES,
  CLEAR_STORING_RESULT,
  DELETE_INVOICE,
  GET_CP_ID,
  UPDATE_INVOICES_FORM,
  STORE_INVOICES,
  SET_PAYMENTS_STATUS,
  ADD_DETTAGLIO_PAGAMENTO,
  DELETE_DETTAGLIO_PAGAMENTO,
  ADD_DATI_PAGAMENTO,
  UPDATE_DATI_PAGAMENTO,
  DELETE_DATI_PAGAMENTO,
  CHANGE_ACTIVE_DATI_PAGAMENTO,
  SHOW_LAST_INVOICES,
  // PAYMENTS PAGE
  GET_PAYMENTS,
  UPDATE_PAYMENT_DETAILS,
  LOADING_PAYMENTS,
  UPDATE_PAYMENTS_FORM,
  UPDATING_PAYMENTS,
} from "./types";

import axios from "axios";

export const getInvoices = (
  { name, number, begin, end, emitted, ascending, page },
  triggerLoading = true
) => async (dispatch) => {
  if (triggerLoading) {
    dispatch({ type: LOADING_INVOICES, payload: true });
  }
  let params = { emitted, ascending };

  if (!!name) params["name"] = name;
  if (!!number) params["number"] = number;
  if (!!Date.parse(begin)) params["begin"] = begin;
  if (!!Date.parse(end)) params["end"] = end;
  if (page > 0) {
    params["page"] = page;
  } else {
    params["page"] = 1;
  }

  try {
    const res = await axios.get("/api/invoice/body", {
      params,
    });

    dispatch({
      type: GET_INVOICES,
      payload: {
        invoices: res.data.bodies,
        totalPages: res.data.totalPages,
        currentPage: page,
      },
    });

    if (triggerLoading) {
      dispatch({
        type: LOADING_INVOICES,
        payload: false,
      });
    }
  } catch (err) {
    if (triggerLoading) {
      dispatch({
        type: LOADING_INVOICES,
        payload: false,
      });
    }

    if (!err.response || err.response.status === 401) window.location.reload();
  }
};

export const clearInvoices = () => (dispatch) => {
  dispatch({
    type: CLEAR_INVOICES,
  });
};

export const checkNewInvoices = () => async (dispatch) => {
  dispatch({
    type: LOADING_NEW_INVOICES,
    payload: true,
  });

  try {
    let res = await axios.post("/api/invoice");

    if (res.status === 200) {
      dispatch({
        type: STORE_INVOICES,
        payload: res.data,
      });
    }

    dispatch({
      type: LOADING_NEW_INVOICES,
      payload: false,
    });
  } catch (err) {
    dispatch({
      type: LOADING_NEW_INVOICES,
      payload: false,
    });

    console.log(err);
  }
};

export const clearStoringResult = () => (dispatch) => {
  dispatch({
    type: CLEAR_STORING_RESULT,
  });
};

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/invoice/body/${id}`);

    dispatch({
      type: DELETE_INVOICE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCPId = (name) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let formdata = new FormData();
  formdata.set("name", name);

  try {
    let res = await axios.post(`/api/invoice/clifor`, formdata, config);

    dispatch({
      type: GET_CP_ID,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateInvoicesForm = (form) => (dispatch) => {
  dispatch({
    type: UPDATE_INVOICES_FORM,
    payload: form,
  });
};

export const setPaymentsStatus = (status, bodyModelId) => (dispatch) => {
  dispatch({
    type: SET_PAYMENTS_STATUS,
    payload: { status: status, invId: bodyModelId },
  });
};

export const showLastInvoices = (invoices) => (dispatch) => {
  dispatch({
    type: SHOW_LAST_INVOICES,
    payload: invoices,
  });
};

// PAYMENTS
export const getPayments = (
  { name, endDate, emitted, page },
  triggerLoading = true
) => async (dispatch) => {
  if (triggerLoading) {
    dispatch({ type: LOADING_PAYMENTS, payload: true });
  }

  let params = { emitted };

  if (!!Date.parse(endDate)) params["endDate"] = endDate;
  if (!!name) params["name"] = name;
  if (page > 0) {
    params["page"] = page;
  } else {
    params["page"] = 1;
  }

  try {
    const res = await axios.get("/api/invoice/dettagliopagamento", {
      params,
    });

    dispatch({
      type: GET_PAYMENTS,
      payload: {
        payments: res.data.payments,
        totalPages: res.data.totalPages,
        currentPage: page,
      },
    });

    if (triggerLoading) {
      dispatch({ type: LOADING_PAYMENTS, payload: false });
    }
  } catch (err) {
    if (triggerLoading) {
      dispatch({ type: LOADING_PAYMENTS, payload: false });
    }
    dispatch({
      type: GET_PAYMENTS,
      payload: {
        payments: [],
        totalPages: 1,
        currentPage: 1,
      },
    });

    console.log(err);
  }
};

export const addDatiPagamento = (form) => async (dispatch) => {
  dispatch({
    type: UPDATING_PAYMENTS,
    payload: true,
  });

  try {
    let res = await axios.post(`/api/invoice/datipagamento/`, form);

    if (res.response && res.response.status === 400)
      return res.response.data.errors;

    dispatch({
      type: ADD_DATI_PAGAMENTO,
      payload: res.data,
    });

    return {};
  } catch (error) {
    console.log(error);
    return {};
  } finally {
    dispatch({
      type: UPDATING_PAYMENTS,
      payload: false,
    });
  }
};

export const updateDatiPagamento = (payment) => async (dispatch) => {
  dispatch({
    type: UPDATING_PAYMENTS,
    payload: true,
  });

  try {
    const res = await axios.put(`/api/invoice/datipagamento`, payment);

    if (res.status === 200) {
      dispatch({
        type: UPDATE_DATI_PAGAMENTO,
        payload: res.data,
      });

      dispatch({
        type: UPDATING_PAYMENTS,
        payload: false,
      });

      return {};
    }

    dispatch({
      type: UPDATING_PAYMENTS,
      payload: false,
    });

    return res.response.data.errors;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const deleteDatiPagamento = (id) => async (dispatch) => {
  dispatch({
    type: UPDATING_PAYMENTS,
    payload: true,
  });

  try {
    let res = await axios.delete(`/api/invoice/datipagamento/${id}`);

    if (res.status === 200) {
      dispatch({
        type: DELETE_DATI_PAGAMENTO,
        payload: id,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({
      type: UPDATING_PAYMENTS,
      payload: false,
    });
  }
};

export const changeActiveDatiPagamento = (
  datiPagamentoModelId,
  bodyModelId
) => async (dispatch) => {
  dispatch({
    type: UPDATING_PAYMENTS,
    payload: true,
  });

  try {
    let res = await axios.put(
      `/api/invoice/datipagamento/${datiPagamentoModelId}/${bodyModelId}`
    );

    if (res.status === 200) {
      dispatch({
        type: CHANGE_ACTIVE_DATI_PAGAMENTO,
        payload: {
          datiPagamentoModelId,
          bodyModelId,
        },
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({
      type: UPDATING_PAYMENTS,
      payload: false,
    });
  }
};

export const updatingPayments = (status) => (dispatch) => {
  dispatch({
    type: UPDATING_PAYMENTS,
    payload: status,
  });
};

export const updatePaymentDetails = (payment) => async (dispatch) => {
  dispatch({
    type: UPDATING_PAYMENTS,
    payload: true,
  });

  try {
    const res = await axios.put(`/api/invoice/dettagliopagamento`, payment);

    if (res.status === 200) {
      dispatch({
        type: UPDATE_PAYMENT_DETAILS,
        payload: res.data,
      });

      dispatch({
        type: UPDATING_PAYMENTS,
        payload: false,
      });

      return {};
    }

    dispatch({
      type: UPDATING_PAYMENTS,
      payload: false,
    });

    return res.response.data.errors;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updatePaymentsForm = (form) => (dispatch) => {
  dispatch({
    type: UPDATE_PAYMENTS_FORM,
    payload: form,
  });
};

export const addDettaglioPagamento = (form, bodyModelId) => async (
  dispatch
) => {
  dispatch({
    type: UPDATING_PAYMENTS,
    payload: true,
  });

  try {
    let res = await axios.post(`/api/invoice/dettagliopagamento/`, form);

    if (res.response && res.response.status === 400)
      return res.response.data.errors;

    dispatch({
      type: ADD_DETTAGLIO_PAGAMENTO,
      payload: {
        data: res.data,
        datiPagamentoModelId: form.datiPagamentoModelId,
        bodyModelId: bodyModelId,
      },
    });

    return {};
  } catch (error) {
    console.log(error);
    return {};
  } finally {
    dispatch({
      type: UPDATING_PAYMENTS,
      payload: false,
    });
  }
};

export const deleteDettaglioPagamento = (id) => async (dispatch) => {
  dispatch({
    type: UPDATING_PAYMENTS,
    payload: true,
  });

  try {
    let res = await axios.delete(`/api/invoice/dettagliopagamento/${id}`);

    if (res.status === 200) {
      dispatch({
        type: DELETE_DETTAGLIO_PAGAMENTO,
        payload: id,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({
      type: UPDATING_PAYMENTS,
      payload: false,
    });
  }
};
