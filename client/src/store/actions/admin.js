import api from "../../services/api";
import { SET_CURRENT_ADMIN } from "../actionTypes";
import { addError, removeError } from "./error";

export const setCurrentAdmin = (admin) => ({
  type: SET_CURRENT_ADMIN,
  admin,
});


export const addFaculty=()=>{
    return async (dispatch)=>{

    };
};

export const showProfile=()=>{
  return async (dispatch)=>{
    try {
      const admin = await api.call("get", "showProfile");
      dispatch(setInternships(admin));
      dispatch(removeError());
    } catch (err) {
      console.log("error", err);
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };  
};