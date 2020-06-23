import { combineReducers } from "redux";
import error from "./error";
import auth from "./auth";
import success from "./success";
import { currentAdmin, faculty, currentTeacher } from "./admin";
import { internships, currentInternship } from "./internships";
import { notices, studentsNotices } from "./notices";
import { get_Faculty_Profile } from "./faculty";
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
  get_Faculty_Profile,
  success,
});
