import React, { Component } from "react";
import { MdPermIdentity } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdDescription, MdDns, MdSettings } from "react-icons/md";

class Sidenav_f extends Component {
  state = {};
  render() {
    const activeNow = this.props.activeComponent;
    return (
      <div className="sidenav">
        <p>Menu</p>
        <ul id="ul">
          <Link to="/faculty">
            <li id="li" className={activeNow === "1" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdDns />
              </span>
              Send Notice
            </li>
          </Link>
          <Link to="/facultyprofile">
            <li id="li" className={activeNow === "2" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdPermIdentity />
              </span>
              Profile
            </li>
          </Link>
          <Link to="/internships">
            <li id="li" className={activeNow === "3" ? "sidenav-active" : ""}>
              <span className="mx-2">
                <internships />
              </span>
              Student Internships
            </li>
          </Link>

          <li id="li" className={activeNow === "6" ? "sidenav-active" : ""}>
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

export default Sidenav_f;
