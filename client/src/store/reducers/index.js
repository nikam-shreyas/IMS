import { combineReducers } from "redux";
import error from "./error";
import auth from "./auth";
import {adminCurrent} from './admin';
import { internships, currentInternship } from "./internships";
import { notices, studentsNotices } from "./notices";
export default combineReducers({
  auth,
  error,
  internships,
  currentInternship,
  adminCurrent,
  notices,
  studentsNotices,
});
