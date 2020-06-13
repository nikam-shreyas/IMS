
import React, { Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import Internships from '../components/internships';
import Sidenav_f from '../components/SideNav_f';
import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';


const Faculty_Home=({authType,isAthenticated})=>{

return <Fragment>
    <div className="col-sm-2 sidenav" style={{float:"left"}}>
            <Sidenav_f activeComponent="1" />
          </div>
          <div className="col-sm-10 of">
    <Internships style={{float:"left"}}/>
    </div>
</Fragment>
}


export default Faculty_Home;
