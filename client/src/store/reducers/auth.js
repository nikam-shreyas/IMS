import {
  SET_CURRENT_USER,
  SET_CURRENT_TEACHER,
  SET_CURRENT_ADMIN,
} from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false,
  isAuthenticated_f: false,
  isAuthenticated_a: false,
  user: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user,
      };
    case SET_CURRENT_TEACHER:
      return {
        isAuthenticated_f: !!Object.keys(action.user).length,
        user: action.user,
      };
    case SET_CURRENT_ADMIN:
      return {
        isAuthenticated_a: !!Object.keys(action.user).length,
        user: action.user,
      };
    default:
      return state;
  }
};
