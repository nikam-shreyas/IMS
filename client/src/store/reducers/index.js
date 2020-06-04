<<<<<<< HEAD
import { combineReducers } from "redux";
import error from "./error";
import auth from "./auth";
export default combineReducers({
  auth,
  error,
});
=======
import {combineReducers} from 'redux';
import error from './error';
import auth from './auth';
import {internships,currentInternship} from './internships';
export default combineReducers({
    auth,
    error,
    internships,
    currentInternship
})
>>>>>>> ef498bb44124bf55d2caaef1fb24bbc924118efc
