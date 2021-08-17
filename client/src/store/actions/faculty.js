import { addError, removeError } from "./error";
import {
  SET_CURRENT_TEACHER,
  SET_CURRENT_ADMIN,
  GET_FACULTY_PROFILE,
  SET_CURRENT_SELECTED_FACULTY,
} from "../actionTypes";
import api from "../../services/api";

export const setCurrentUser_f = (user) => ({
  type: SET_CURRENT_TEACHER,
  user,
});

export const setCurrentUser_a = (user) => ({
  type: SET_CURRENT_ADMIN,
  user,
});

export const setToken_f = (token) => {
  api.setToken(token);
};

export const get_faculty_profile = (faculty) => ({
  type: GET_FACULTY_PROFILE,
  faculty,
});

export const setCurrentFaculty = (faculty) => ({
  type: SET_CURRENT_SELECTED_FACULTY,
  faculty,
});

export const logout_f = () => {
  return (dispatch) => {
    localStorage.clear();
    api.setToken(null);
    dispatch(setCurrentUser_f({}));
    dispatch(setCurrentUser_a({}));
    dispatch(removeError());
  };
};

export const authUser_f = (path, data) => {
  return async (dispatch) => {
    try {
      const { token, ...user } = await api.call("post", `auth/${path}`, data);
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", "faculty");
      api.setToken(token);
      dispatch(setCurrentUser_f(user));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const authUser_a = (path, data) => {
  return async (dispatch) => {
    try {
      const { token, ...user } = await api.call("post", `admin/${path}`, data);
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", "admin");
      api.setToken(token);
      dispatch(setCurrentUser_a(user));
      dispatch(removeError());
    } catch (err) {
      console.log(err);
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getFacultyProfile = (path) => {
  return async (dispatch) => {
    try {
      const faculty = await api.call("get", "faculty/profile");
      dispatch(get_faculty_profile(faculty));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const updateFaculty = (path, data) => {
  return async (dispatch) => {
    try {
      const faculty = await api.call("put", `faculty/update/${path}`, data);
      dispatch(setCurrentFaculty(faculty));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};
