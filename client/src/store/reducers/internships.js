import { SET_CURRENT_INTERNSHIP, SET_INTERNSHIPS,FORWARD_INTERNSHIP } from "../actionTypes";
//import { SET_CURRENT_INTERNSHIPS } from '../actionTypes';

export const internships = (state = [], action) => {
  switch (action.type) {
    case SET_INTERNSHIPS:
      return action.internships;
    default:
      return state;
  }
};

export const currentInternship = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_INTERNSHIP:
      return action.internship;
    default:
      return state;
  }
};

export const forawrd_Internship=(state={},action)=>{
  switch(action.type){
    case FORWARD_INTERNSHIP:
      return action.internship;
    default:
      return state;

  }
};