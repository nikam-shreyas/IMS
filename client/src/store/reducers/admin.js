import { SET_CURRENT_ADMIN } from "../actionTypes";
//import { SET_CURRENT_INTERNSHIPS } from '../actionTypes';

// export const admin = (state = [], action) => {
//   switch (action.type) {
//     case SET_CURRENT_ADMIN:
//       return action.admin;

//     default:
//       return state;
//   }
// };

export const adminCurrent = (state = [], action) => {
    switch (action.type) {
      case SET_CURRENT_ADMIN:
        return action.admin;
  
      default:
        return state;
    }
  };
