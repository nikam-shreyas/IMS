import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from "../store/actions";
const Navbar = ({ auth, logout }) => (
  <div className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#"> 
    PICT IMS
    </a>
    <div className="navbar-brand">
    {(auth.isAuthenticated ||
      auth.isAuthenticated_f ||
      auth.isAuthenticated_a) && (
        <div>
        {auth.isAuthenticated_a}
        </div>
    )}      
    </div>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo03"
      aria-controls="navbarTogglerDemo03"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo03"> 
    <ul id="ul" className="navbar-nav ml-auto">
        {!auth.isAuthenticated &&
          !auth.isAuthenticated_f &&
          !auth.isAuthenticated_a && (
            <Fragment>
              <li id="li" className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li id="li" className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>              
            </Fragment>
          )}
        {(auth.isAuthenticated ||
          auth.isAuthenticated_f ||
          auth.isAuthenticated_a) && (
          <Fragment>
            <li id="li" className="nav-item">
              <span className="mx-2">
                <RiLogoutBoxLine />
              </span>
              <a onClick={logout}>Logout</a>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  </div>
);

export default connect((store) => ({ auth: store.auth }), { logout })(Navbar);
