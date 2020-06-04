import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Auth from '../components/Auth';
import Auth_2 from '../components/Auth_2';
import Internships from '../components/internships';
//import { internships } from '../store/reducers/internships';
const RouteViews=()=>(<main>
<Switch>
    <Route exact path='/login' render={() => <Auth authType="login"/>}/>
    <Route exact path='/register' render={() => <Auth_2 authType='register'/>}/>
    <Route exact path='/internships' render={() => <Internships />}/>
</Switch>
</main>);


export default RouteViews;