import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MdNotifications,
  MdViewList,
  MdPermIdentity,
  MdDns,
  MdSettings,
} from "react-icons/md";
import { connect } from "react-redux";
import { logout } from "../store/actions";
import { RiLogoutBoxLine } from "react-icons/ri";

class Sidenav_f extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    const { logout } = this.props;
    logout();
  }
  render() {
    const activeNow = this.props.activeComponent;
    return (
      <div className="sidenav">
        <h4 className="text-light text-center mt-2">PICT IMS</h4>
        <p className="mt-4">Menu</p>
        <ul id="ul">
          <Link to="/facultyprofile">
            <li id="li" className={activeNow === "1" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdPermIdentity />
              </span>
              Profile
            </li>
          </Link>
          <Link to="/internships">
            <li id="li" className={activeNow === "2" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdViewList />
              </span>
              Applications
            </li>
          </Link>
          <Link to="/faculty">
            <li id="li" className={activeNow === "3" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdDns />
              </span>
              Send Notice
            </li>
          </Link>
          <Link to="/facultyNotices">
            <li id="li" className={activeNow === "4" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdNotifications />
              </span>
              Notices
            </li>
          </Link>
          <Link to="/facultysetting">
          <li id="li" className={activeNow === "5" ? "sidenav-active" : ""}>
            <span className="mx-2">
              <MdSettings />
            </span>
            Change Password
          </li>
          </Link>
          <li id="li" className="nav-item">
            <span className="mx-2">
              <RiLogoutBoxLine />
            </span>
            <a onClick={this.handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect((store) => ({ auth: store.auth }), { logout })(
  Sidenav_f
);
