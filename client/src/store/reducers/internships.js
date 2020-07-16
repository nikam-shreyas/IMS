
import { SET_CURRENT_INTERNSHIP, SET_INTERNSHIPS,FORWARD_INTERNSHIP,APPROVE_INTERNSHIP, SET_CHART, UPDATE_INTERNSHIP } from "../actionTypes";
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

export const forward_Internship=(state={},action)=>{
  switch(action.type){
    case FORWARD_INTERNSHIP:
      console.log("in forward reducers ");
      return action.internship;
    default:
      return state;

  }
};


export const approve_Internship=(state={},action)=>{
  switch(action.type){
    case APPROVE_INTERNSHIP:
      console.log("in approve reducers ");
      return action.internship;
    default:
      return state;

  }
};



export const update_Internship=(state={},action)=>{
  switch(action.type){
    case UPDATE_INTERNSHIP:
      console.log("in update reducers ");
      return action.internship;
    default:
      return state;

  }
};
export const charts=(state={},action)=>{
switch(action.type){
  case SET_CHART:
    return action.chart;
  default:
    return state;
}
}
