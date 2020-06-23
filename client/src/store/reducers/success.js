import { ADD_SUCCESS_MESSAGE, REMOVE_SUCCESS_MESSAGE } from "../actionTypes";

export default (state = { message: null }, action) => {
  switch (action.type) {
    case ADD_SUCCESS_MESSAGE:
      return { ...state, message: action.success };
    case REMOVE_SUCCESS_MESSAGE:
      return { ...state, message: null };
    default:
      return state;
  }
};
