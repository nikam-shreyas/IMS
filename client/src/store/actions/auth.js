import { addError, removeError } from "./error";
import { SET_CURRENT_USER } from "../actionTypes";
import api from "../../services/api";
import { addSuccess, removeSuccessMessage } from "./success";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const setToken = (token) => {
  api.setToken(token);
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    api.setToken(null);
    dispatch(setCurrentUser({}));
    dispatch(removeError());
  };
};

export const authUser = (path, data) => {
  return async (dispatch) => {
    try {
      const { token, ...user } = await api.call("post", `auth/${path}`, data);
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", "student");
      api.setToken(token);
      dispatch(setCurrentUser(user));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};
export const updateStudent = (data) => {
  return async (dispatch) => {
    try {
      const user = await api.call("post", "auth/student", data);
      dispatch(setCurrentUser(user));
      dispatch(removeError());
    } catch (err) {
      console.log(err);
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getStudent = () => {
  return async (dispatch) => {
    try {
      const user = await api.call("get", "auth/student");
      dispatch(setCurrentUser(user));
      dispatch(removeError());
    } catch (err) {
      console.log(err);
      // const error = err.response.data;
      // dispatch(addError(error.message));
    }
  };
};

export const resetStudentPassword = (path, data) => {
  return async (dispatch) => {
    try {
      const student = await api.call("put", `auth/student/reset/${path}`, data);
      dispatch(setCurrentUser(student));
      dispatch(removeError());
      dispatch(addSuccess("Password changed!"));
    } catch (err) {
      const error = err.response.data;
      dispatch(removeSuccessMessage());
      dispatch(addError(error.message));
    }
  };
};

export const forgotPassword = (data) => {
  return async (dispatch) => {
    try {
      await api.call("post", `auth/forgotpassword`, data);
      dispatch(removeError());
      dispatch(
        addSuccess("Password change request has been sent to your Email!")
      );
    } catch (err) {
      const error = err.response.data;
      dispatch(removeSuccessMessage());
      dispatch(addError(error.message));
    }
  };
};

export const getUserType = (data) => {
  return async (dispatch) => {
    try {
    } catch (err) {}
  };
};
