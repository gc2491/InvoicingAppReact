import axios from "axios";
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  GET_ROLES,
  SIGNOUT,
} from "./types";

import setAuthToken from "../Utils/SetAuthToken";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/account/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (username, password, confirmPassword, role) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let formdata = new FormData();
  formdata.set("username", username);
  formdata.set("password", password);
  formdata.set("confirmPassword", confirmPassword);
  formdata.set("role", role);

  try {
    let res = await axios.post("/api/account/register", formdata, config);

    if (res.response.data.errors) {
      return res.response.data.errors;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
};

export const signIn = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let formdata = new FormData();
  formdata.set("username", username);
  formdata.set("password", password);

  try {
    const res = await axios.post("/api/account/signin", formdata, config);

    if (res.status === 200) {
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res.data,
      });
    } else {
      console.log("error signing in");
    }

    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    dispatch(loadUser());
  } catch (err) {
    console.log("signin error");
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

export const getRoles = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/api/account/roles", null, config);
    if (res.status === 200) {
      dispatch({
        type: GET_ROLES,
        payload: res.data,
      });
    } else {
      console.log("errore: impssibile recuperare lista ruoli");
    }
  } catch (error) {
    console.log("errore: impssibile recuperare lista ruoli");
  }
};

export const signOut = () => (dispatch) => {
  setAuthToken();

  dispatch({
    type: SIGNOUT,
  });
};
