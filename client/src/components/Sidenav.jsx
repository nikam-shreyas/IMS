import React, { Component } from "react";
import { MdPermIdentity } from "react-icons/md";
import { Link } from "react-router-dom";
import { logout } from "../store/actions";
import { connect } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import {
  MdDescription,
  MdNotifications,
  MdAddCircle,
  MdDns,
  MdSettings,
} from "react-icons/md";

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    const { logout } = this.props;
    logout();
  }
  state = {};
  render() {
    const activeNow = this.props.activeComponent;
    return (
      <div className="sidenav">
        <h4 className="text-light text-center mt-2">PICT IMS</h4>
        <p className="mt-4">Menu</p>
        <ul id="ul">
          <Link to="/student">
            <li id="li" className={activeNow === "1" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdDns style={{ margin: -1, padding: -1 }} />
              </span>
              My Applications
            </li>
          </Link>
          <Link to="/studentprofile">
            <li id="li" className={activeNow === "2" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdPermIdentity style={{ margin: -1, padding: -1 }} />
              </span>
              Profile
            </li>
          </Link>
          <Link to="/apply">
            <li id="li" className={activeNow === "3" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdAddCircle style={{ margin: -1, padding: -1 }} />
              </span>
              Apply
            </li>
          </Link>

          <Link to="/studentDocs">
            <li id="li" className={activeNow === "4" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdDescription style={{ margin: -1, padding: -1 }} />
              </span>
              Documents
            </li>
          </Link>
          <Link to="/notifications">
            <li id="li" className={activeNow === "5" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdNotifications style={{ margin: -1, padding: -1 }} />
              </span>
              Notifications
            </li>
          </Link>
          <Link to="/changepassword">
            <li id="li" className={activeNow === "6" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdSettings style={{ margin: -1, padding: -1 }} />
              </span>
              Change Password
            </li>
          </Link>
          <li id="li" className="nav-item float-bottom">
            <span className="mx-2">
              <RiLogoutBoxLine style={{ margin: -1, padding: -1 }} />
            </span>
            <a onClick={this.handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect((store) => ({ auth: store.auth }), { logout })(Sidenav);
