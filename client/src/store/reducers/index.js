import { combineReducers } from "redux";
import error from "./error";
import auth from "./auth";
export default combineReducers({
  auth,
  error,
});
