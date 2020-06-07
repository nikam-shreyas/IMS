import React, { Component } from "react";
import { MdPermIdentity } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdDns } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";

class Sidenav extends Component {
  state = {};
  render() {
    const activeNow = this.props.activeComponent;
    return (
      <div className="sidenav">
        <p>Menu</p>
        <ul>
          <Link to="/student">
            <li className={activeNow == 1 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdDns />
              </span>
              My Applications
            </li>
          </Link>
          <Link to="/studentprofile">
            <li className={activeNow == 2 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdPermIdentity />
              </span>
              Profile
            </li>
          </Link>
          <Link to="/apply">
            <li className={activeNow == 3 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdAddCircle />
              </span>
              Apply
            </li>
          </Link>
          <li className={activeNow == 4 ? "sidenav-active" : ""}>
            <span className="mx-2">
              <MdDescription />
            </span>
            Documents
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidenav;
