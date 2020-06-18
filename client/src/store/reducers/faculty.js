import {
    SET_CURRENT_SELECTED_ADMIN,
    SET_FACULTY,
    SET_CURRENT_SELECTED_TEACHER,
    GET_FACULTY_PROFILE
  } from "../actionTypes";


  export const get_Faculty_Profile=(state={},action)=>{
    switch(action.type){
      case GET_FACULTY_PROFILE:
        console.log("yussssss");
        return action.faculty;
      default:
        return state;
    }
  }



