import { ADD_SUCCESS_MESSAGE, REMOVE_SUCCESS_MESSAGE } from "../actionTypes";

export const addSuccess = (success) => ({
  type: ADD_SUCCESS_MESSAGE,
  success,
});

export const removeSuccessMessage = () => ({
  type: REMOVE_SUCCESS_MESSAGE,
});
