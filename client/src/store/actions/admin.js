import api from "../../services/api";
import {
  SET_CURRENT_SELECTED_ADMIN,
  SET_CURRENT_SELECTED_TEACHER,
  SET_FACULTY,
  GET_STUDENT_LIST,
} from "../actionTypes";
import { addError, removeError } from "./error";
import { addSuccess, removeSuccessMessage } from "./success";

export const setCurrentAdmin = (admin) => ({
  type: SET_CURRENT_SELECTED_ADMIN,
  admin,
});
export const setFaculty = (faculty) => ({
  type: SET_FACULTY,
  faculty,
});

export const getStudents = (students) => ({
  type: GET_STUDENT_LIST,
  students,
});

export const setCurrentTeacher = (teacher) => ({
  type: SET_CURRENT_SELECTED_TEACHER,
  teacher,
});

export const getAdmin = (path) => {
  return async (dispatch) => {
    try {
      const admin = await api.call("get", "admin/");
      dispatch(setCurrentAdmin(admin));
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
      const success = "Faculty added!";
      dispatch(addSuccess(success));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(removeSuccessMessage());
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
      let success = "Deleted Successfully!";
      dispatch(addSuccess(success));
    } catch (err) {
      const error = err.response.data;
      dispatch(removeSuccessMessage());
      dispatch(addError(error.message));
    }
  };
};

export const updateAdmin = (path, data) => {
  return async (dispatch) => {
    try {
      const admin = await api.call("put", `admin/update/${path}`, data);
      dispatch(setCurrentAdmin(admin));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const resetPassword = (path, data) => {
  return async (dispatch) => {
    try {
      const admin = await api.call("put", `admin/reset/${path}`, data);
      dispatch(setCurrentAdmin(admin));
      dispatch(removeError());
      dispatch(addSuccess("Password changed!"));
    } catch (err) {
      const error = err.response.data;
      dispatch(removeSuccessMessage());
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



export const getStudentList = () => {
  return async (dispatch) => {
    try {
      const students = await api.call("get", "admin/allStudents");
      dispatch(getStudents(students));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};


export const Search=(data)=>{
return async (dispatch)=> {
  try{
    const {YEAR , DIV }=data;
    console.log(YEAR+DIV+"year div ");
    const students = await api.call("get", "admin/somestudents",data);
  }catch(err){
    const error = err.response.data;
      dispatch(addError(error.message));
  }
}
};