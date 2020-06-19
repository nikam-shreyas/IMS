import api from "../../services/api";
import { SET_CURRENT_INTERNSHIP, SET_INTERNSHIPS } from "../actionTypes";
import { addError, removeError } from "./error";

export const setInternships = (internships) => ({
  type: SET_INTERNSHIPS,
  internships,
});

export const setCurrentInternship = (internship) => ({
  type: SET_CURRENT_INTERNSHIP,
  internship,
});

export const getInternships = () => {
  return async (dispatch) => {
    try {
      const internships = await api.call("get", "internships");
      dispatch(setInternships(internships));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getStudentInternships = () => {
  return async (dispatch) => {
    try {
      const internships = await api.call("get", "internships/student");
      dispatch(setInternships(internships));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const createInternship = (data) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("post", "internships", data);
      dispatch(setInternships(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getCurrentInternship = (path) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("get", `internships/${path}`);
      dispatch(setInternships(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const deleteInternship = (path) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("delete", `internships/${path}`);
      dispatch(setCurrentInternship(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

// export const vote=(path,data)=>{
//     return async dispatch=>{
//         try{
//         const internship=await api.call('post',`internship/${path}`,data);
//         dispatch(setCurrentInternship(internship));
//         dispatch(removeError());

//     }catch(err){
//         const error=err.response.data;
//             dispatch(addError(error.message));
//     }
//     };
// };
