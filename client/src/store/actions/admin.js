import api from "../../services/api";
import {
  SET_CURRENT_SELECTED_ADMIN,
  SET_CURRENT_SELECTED_TEACHER,
  SET_FACULTY,
} from "../actionTypes";
import { addError, removeError } from "./error";

export const setCurrentAdmin = (admin) => ({  
  type: SET_CURRENT_SELECTED_ADMIN,
  admin,
});
export const setFaculty = (faculty) => ({
  type: SET_FACULTY,
  faculty,
});

export const setCurrentTeacher = (teacher) => ({
  type: SET_CURRENT_SELECTED_TEACHER,
  teacher,
});

export const getAdmin = (path) => {
  return async (dispatch) => {
    try {
      const admin = await api.call("get", "admin/");
      
      console.log("can these be admin details "+admin.department);
      dispatch(setCurrentAdmin(admin));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getFaculty = () => {
  return async (dispatch) => {
    try {
      const faculty = await api.call("get", "admin/all");
      dispatch(setFaculty(faculty));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const createTeacher = (data) => {
  return async (dispatch) => {
    try {
      const teacher = await api.call("post", "admin/add", data);
      dispatch(setCurrentTeacher(teacher));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getCurrentTeacher = (path) => {
  return async (dispatch) => {
    try {
      const teacher = await api.call("get", `admin/find/${path}`);
      dispatch(setCurrentTeacher(teacher));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const deleteTeacher = (path) => {
  return async (dispatch) => {
    try {
      const teacher = await api.call("delete", `admin/find/${path}`);
      dispatch(setCurrentTeacher(teacher));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};




export const getTeacher = (path) => {
  return async (dispatch) => {
    try {
      const admin = await api.call("get", "admin/teacher");
      
      console.log("can these be admin details "+admin.department);
      dispatch(setCurrentAdmin(admin));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};