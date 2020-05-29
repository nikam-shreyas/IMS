import { store } from '../store';
import React,{Component} from 'react';
import api from '../services/api';
import {Provider} from 'react-redux';
import decode from 'jwt-decode';
import {setCurrentUser,addError,setToken} from '../store/actions';


if(localStorage.jwtToken){
    setToken(localStorage.jwtToken);
    try{
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
    }catch(err){
        store.dispatch(setCurrentUser({}));
        store.dispatch(addError(err));
    }
}


const App=()=>(
<Provider store={store}>
    <div>App works</div>
</Provider>
)
export default App;