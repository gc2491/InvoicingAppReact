import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  GET_ROLES,
  SIGNOUT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  username: null,
  role: null,
  roles: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        username: payload.username,
        role: payload.role,
      };
    case SIGNIN_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };

    case SIGNIN_FAIL:
    case AUTH_ERROR:
    case SIGNOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        username: null,
        role: null,
      };

    case GET_ROLES:
      return {
        ...state,
        roles: [...action.payload],
      };

    default:
      return state;
  }
};

