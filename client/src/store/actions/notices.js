import api from "../../services/api";
import { SET_NOTICES, SET_STUDENTS_NOTICES } from "../actionTypes";
import { addError, removeError } from "./error";

export const setNotices = (notices) => ({
  type: SET_NOTICES,
  notices,
});

export const setStudentNotices = (studentNotices) => ({
  type: SET_STUDENTS_NOTICES,
  studentNotices,
});

export const getNotices = () => {
  return async (dispatch) => {
    try {
      const notices = await api.call("get", "notices");
      dispatch(setNotices(notices));
      dispatch(removeError());
    } catch (err) {
      console.log("error", err);
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getStudentNotices = () => {
  return async (dispatch) => {
    try {
      const studentNotices = await api.call("get", "notices/student");
      dispatch(setStudentNotices(studentNotices));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const createNotice = (data) => {
  return async (dispatch) => {
    try {
      const notices = await api.call("post", "notices", data);
      dispatch(setNotices(notices));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const deleteNotice = (path) => {
  return async (dispatch) => {
    try {
      const notices = await api.call("delete", `notices/${path}`);
      dispatch(setNotices(notices));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};
