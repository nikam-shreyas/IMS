import {addError,removeError} from './error';
import {SET_CURRENT_USER} from '../actionTypes';
import api from '../../services/api';

export const setCurrentUser_f=user=>({
    type:SET_CURRENT_USER,
    user
});


export const setToken_f=token=>{
    api.setToken(token);
};



export const logout_f=()=>{
    return dispatch=>{
        localStorage.clear();
        api.setToken(null);
        dispatch(setCurrentUser_f({}));
        dispatch(removeError());
    }
}





export const authUser_f=(path,data)=>{
    return async dispatch=>{
        try{
            const{token,...user}=await api.call('post',`auth/${path}`,data);
            localStorage.setItem('jwtToken',token);
            api.setToken(token);
            dispatch(setCurrentUser_f(user));
            dispatch(removeError());
        }catch(err){
            const error=err.response.data;
            dispatch(addError(error.message));
        }
    }
}






export const authUser_a=(path,data)=>{
    return async dispatch=>{
        try{
            const{token,...user}=await api.call('post',`admin/${path}`,data);
            localStorage.setItem('jwtToken',token);
            api.setToken(token);
            dispatch(setCurrentUser_f(user));
            dispatch(removeError());
        }catch(err){
            const error=err.response.data;
            dispatch(addError(error.message));
        }
    }
}