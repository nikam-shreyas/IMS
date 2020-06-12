import React, { Component } from "react";
import { MdPermIdentity } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  MdSettings,
  MdNotifications,
  MdAddCircle,
  MdList,
  MdEdit
} from "react-icons/md";

class Admin_Sidenav extends Component {
  state = {};
  render() {
    const activeNow = this.props.activeComponent;
    return (
      <div className="sidenav">
        <p>Menu</p>
        <ul id="ul">
          <Link to="/admin/:id">
            <li id="li" className={activeNow == 1 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdPermIdentity />
              </span>
              Profile
            </li>
          </Link>
          <Link to="/all">
          <li id="li" className={activeNow == 2 ? "sidenav-active" : ""}>
            <span className="mx-2">
              <MdList />
            </span>
            Faculty List
          </li>
          </Link>
          <Link to="/add">
            <li id="li" className={activeNow == 3 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdAddCircle />
              </span>
              Add New Faculty
            </li>
          </Link>
          <li id="li" className={activeNow == 4 ? "sidenav-active" : ""}>
            <span className="mx-2">
              <MdEdit />
            </span>
            Update/Delete Faculty
          </li>
          <li id="li" className={activeNow == 5 ? "sidenav-active" : ""}>
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

export default Admin_Sidenav;
