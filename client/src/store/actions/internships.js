import api from '../../services/api';
import {SET_CURRENT_INTERNSHIP,SET_INTERNSHIPS} from '../actionTypes';
import {addError,removeError} from './error';
import { setCurrentUser } from './auth';
import { internships } from '../reducers/internships';

export const setInternships=internships=>({
    type:SET_INTERNSHIPS,
    internships
});

export const setCurrentInternship=internship=>({
    type:SET_CURRENT_INTERNSHIP,
    internship
});

export const getInternships=()=>{
    return async dispatch=>{
        try{
            const internships=await api.call('get','internships');
            dispatch(setInternships(internships));
            dispatch(removeError());

        }catch(err){
            const error=err.response.data;
            dispatch(addError(error.message));
        }
    };
};

export const getStudentInternships =() =>{
    return async dispatch => {
        try{
            const internships=await api.call('get','internship/student');
            dispatch(setInternships(internships));
            dispatch(removeError());

        }catch(err){
            const error=err.response.data;
            dispatch(addError(error.message));
        }
    };
};

export const createInternship =data =>{
    return async dispatch=>{
        try{
            const internship=await api.call('post','internship',data);
            dispatch(setCurrentInternship(internship));
            dispatch(removeError());

        }catch(err){
            const error=err.response.data;
            dispatch(addError(error.message));
        }
    };
};


export const getCurrentInternship =path =>{
    return async dispatch=>{
        try{
            const internship=await api.call('get',`internship/${path}`);
            dispatch(setCurrentInternship(internship));
            dispatch(removeError());

        }catch(err){
            const error=err.response.data;
            dispatch(addError(error.message));
        }
    };
};



// export const vote=(path,data)=>{
//     return async dispatch=>{
//         try{
//         const internship=await api.call('post',`internship/${path}`,data);
//         dispatch(setCurrentInternship(internship));
//         dispatch(removeError());
        
//     }catch(err){
//         const error=err.response.data;
//             dispatch(addError(error.message));
//     }
//     };
// };