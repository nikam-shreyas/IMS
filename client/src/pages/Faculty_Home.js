import React, { Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import Internships from '../components/internships';
import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';


const Faculty_Home=({authType,isAthenticated})=>{

return <Fragment>
    <Internships/>
</Fragment>
}


export default Faculty_Home;
