import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions';
import { store } from '../store';
const Navbar=({auth,logout})=>(
<div className='navbar'>
    <div className='container'>
    <ul className='navbar-container'>

        <li>
            <Link className='navbar-brand' to='/'>Home</Link>
        </li>
   {(!auth.isAuthenticated && !auth.isAuthenticated_f && !auth.isAuthenticated_a)&& <Fragment><li> 
       <Link className="navbar-item" to='/Register'>Register</Link>
    </li>
   <li> 
       <Link className="navbar-item" to='/login'>Login</Link>
    </li></Fragment>}
   {(auth.isAuthenticated || auth.isAuthenticated_f || auth.isAuthenticated_a) && <Fragment>
       {/* <li>
       <Link className="navbar-item" to="/poll/new">Create Poll</Link>
   </li> */}
   <li>
       <a className="navbar-item" onClick={logout}>Logout</a>
   </li></Fragment>}
    </ul>
{(auth.isAuthenticated || auth.isAuthenticated_f || auth.isAuthenticated_a) && (<p className='navbar-user'>Logged in as {auth.user.username}</p>)}
</div>
</div>
);

export default connect(store=>({auth: store.auth}),{logout})(Navbar);
