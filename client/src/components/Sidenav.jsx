import React, { Component } from "react";
import { MdPermIdentity } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  MdDescription,
  MdNotifications,
  MdAddCircle,
  MdDns,
  MdSettings,
} from "react-icons/md";

class Sidenav extends Component {
  state = {};
  render() {
    const activeNow = this.props.activeComponent;
    return (
      <div className="sidenav">
        <p>Menu</p>
        <ul id="ul">
          <Link to="/student">
            <li id="li" className={activeNow == 1 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdDns />
              </span>
              My Applications
            </li>
          </Link>
          <Link to="/studentprofile">
            <li id="li" className={activeNow == 2 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdPermIdentity />
              </span>
              Profile
            </li>
          </Link>
          <Link to="/apply">
            <li id="li" className={activeNow == 3 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdAddCircle />
              </span>
              Apply
            </li>
          </Link>

          <Link to="/studentDocs">
            <li id="li" className={activeNow == 4 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdDescription />
              </span>
              Documents
            </li>
          </Link>
          <Link to="/notifications">
            <li id="li" className={activeNow == 5 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdNotifications />
              </span>
              Notifications
            </li>
          </Link>
          <li id="li" className={activeNow == 6 ? "sidenav-active" : ""}>
            <span className="mx-2">
              <MdSettings />
            </span>
            Settings
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidenav;
