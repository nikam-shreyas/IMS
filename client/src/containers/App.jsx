import { store } from '../store';
import React,{Component} from 'react';
import api from '../services/api';
import {Provider} from 'react-redux';
import decode from 'jwt-decode';
import {setCurrentUser,addError,setToken} from '../store/actions';
import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';

if(localStorage.jwtToken){
    setToken(localStorage.jwtToken);
    try{
        console.log(decode(localStorage.jwtToken));
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
    }catch(err){
        store.dispatch(setCurrentUser({}));
        store.dispatch(addError(err));
    }
}


const App=()=>(
<Provider store={store}>
    <Auth authType={'login'}/>
    <ErrorMessage/>
</Provider>
)
export default App;