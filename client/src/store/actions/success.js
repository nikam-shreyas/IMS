import { ADD_SUCCESS_MESSAGE, REMOVE_SUCCESS_MESSAGE } from "../actionTypes";

import { addError, removeError } from "./error";
export const addSuccess = (success) => ({
  type: ADD_SUCCESS_MESSAGE,
  success,
});

export const removeSuccessMessage = () => ({
  type: REMOVE_SUCCESS_MESSAGE,
});

export const removeSuccess = () => {
  return async (dispatch) => {
    try {
      dispatch(removeError());
      dispatch(removeSuccessMessage());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};
