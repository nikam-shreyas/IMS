import {
  SET_CURRENT_SELECTED_ADMIN,
  SET_FACULTY,
  SET_CURRENT_SELECTED_TEACHER,
  GET_FACULTY_PROFILE,
} from "../actionTypes";

export const currentAdmin = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_SELECTED_ADMIN:
      console.log("im in reducers");
      return action.admin;
    default:
      return state;
  }
};

export const faculty = (state = [], action) => {
  switch (action.type) {
    case SET_FACULTY:
      return action.faculty;
    default:
      return state;
  }
};

export const currentTeacher = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_SELECTED_TEACHER:
      return action.teacher;
    default:
      return state;
  }
};
