import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { logout } from "../store/actions";
const Navbar = ({ auth, logout }) => (
  <div className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      PICT IMS
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo03"
      aria-controls="navbarTogglerDemo03"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav ml-auto">
        {(auth.isAuthenticated ||
          auth.isAuthenticated_f ||
          auth.isAuthenticated_a) && (
          <span className="navbar-text">
            Hello, &nbsp;
            {auth.user.username}
          </span>
        )}
        {!auth.isAuthenticated &&
          !auth.isAuthenticated_f &&
          !auth.isAuthenticated_a && (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/Register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
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
            <li className="nav-item">
              <span className="mx-2">
                <MdSubdirectoryArrowLeft />
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
