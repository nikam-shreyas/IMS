import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Auth from '../components/Auth';
const RouteViews=()=>(<main>
<Switch>
    <Route exact path='/login' render={() => <Auth authType="login"/>}/>
    <Route exact path='/register' render={() => <Auth authType='register'/>}/>
</Switch>
</main>);


export default RouteViews;