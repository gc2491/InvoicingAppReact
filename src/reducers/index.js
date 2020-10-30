import { combineReducers } from "redux";
import auth from "./auth";
import invoices from "./invoices";

export default combineReducers({
  auth,
  invoices,
});
