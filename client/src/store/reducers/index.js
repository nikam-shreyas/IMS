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