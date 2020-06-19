import { SET_NOTICES, SET_STUDENTS_NOTICES } from "../actionTypes";

export const notices = (state = [], action) => {
  switch (action.type) {
    case SET_NOTICES:
      return action.notices;
    default:
      return state;
  }
};

export const studentsNotices = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS_NOTICES:
      return action.studentNotices;
    default:
      return state;
  }
};