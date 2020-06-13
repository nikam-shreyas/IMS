import { combineReducers } from "redux";
import error from "./error";
import auth from "./auth";
import { currentAdmin, faculty, currentTeacher } from "./admin";
import { internships, currentInternship } from "./internships";
import { notices, studentsNotices } from "./notices";
export default combineReducers({
  auth,
  error,
  internships,
  currentInternship,
  currentAdmin,
  notices,
  studentsNotices,
  faculty,
  currentTeacher,
});
