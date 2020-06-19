import {
    SET_CURRENT_SELECTED_ADMIN,
    SET_FACULTY,
    SET_CURRENT_SELECTED_TEACHER,
    GET_FACULTY_PROFILE,SET_CURRENT_SELECTED_FACULTY
  } from "../actionTypes";
import { faculty } from "./admin";


  export const get_Faculty_Profile=(state={},action)=>{
    switch(action.type){
      case GET_FACULTY_PROFILE:
        console.log(action.faculty.name.firstname);
        return action.faculty;
      default:
        return state;
    }
  }




  export const currentFaculty = (state = {}, action) => {
    switch (action.type) {
      case SET_CURRENT_SELECTED_FACULTY:
        console.log("im in reducers");
        return action.faculty;
      default:
        return state;
    }
  };
  