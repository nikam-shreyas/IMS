import {SET_CURRENT_INTERNSHIP,SET_INTERNSHIPS} from '../actionTypes';
//import { SET_CURRENT_INTERNSHIPS } from '../actionTypes';

export const internships=(state=[],action)=>{
    switch(action.type){
        case SET_INTERNSHIPS:
            return action.internships;
        
        default:
            return state;
    }
}

export const currentInternship=(state={},action)=>{
    switch(action.type){
        case SET_CURRENT_INTERNSHIP:
            return action.internship;
        default:
            return state;
    }
}