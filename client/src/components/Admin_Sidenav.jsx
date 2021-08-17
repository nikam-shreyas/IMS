import React, { Component } from "react";
import { MdPermIdentity, MdAssignment, MdPoll } from "react-icons/md";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions";
import { RiLogoutBoxLine } from "react-icons/ri";
import {
  MdSettings,
  MdRecentActors,
  MdAddCircle,
  MdFormatListBulleted,
  MdDelete,
  MdEqualizer,
} from "react-icons/md";

class Admin_Sidenav extends Component {
  state = {};
  handleLogout() {
    const { logout } = this.props;
    logout();
    window.location.href = "/";
  }
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  render() {
    const activeNow = this.props.activeComponent;
    return (
      <>
        <h4 className="text-light text-center mt-2">PICT IMS</h4>
        <p className="mt-4">Menu</p>
        <ul id="ul">
          <Link to="/admin/" className="adminProfile">
            <li id="li" className={activeNow === 1 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdPermIdentity style={{ margin: -1, padding: -1 }} />
              </span>
              Profile
            </li>
          </Link>
          <Link to="/all" className="facultyList">
            <li id="li" className={activeNow === 2 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdFormatListBulleted style={{ margin: -1, padding: -1 }} />
              </span>
              Faculty List
            </li>
          </Link>
          <Link to="/allStudents" className="studentList">
            <li id="li" className={activeNow === 3 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdRecentActors style={{ margin: -1, padding: -1 }} />
              </span>
              Student List
            </li>
          </Link>
          <Link to="/add" className="addFaculty">
            <li id="li" className={activeNow === 4 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdAddCircle style={{ margin: -1, padding: -1 }} />
              </span>
              Add New Faculty
            </li>
          </Link>
          <Link to="/deleteFaculty" className="deleteFaculty">
            <li id="li" className={activeNow === 5 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdDelete style={{ margin: -1, padding: -1 }} />
              </span>
              Delete Faculty
            </li>
          </Link>
          <Link to="/stats" className="stats">
            <li id="li" className={activeNow === 6 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdEqualizer style={{ margin: -1, padding: -1 }} />
              </span>
              Stats
            </li>
          </Link>
          <Link to="/studentReport" className="studentReport">
            <li id="li" className={activeNow === 7 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdAssignment style={{ margin: -1, padding: -1 }} />
              </span>
              Student Report
            </li>
          </Link>

          <Link to="/aicteReport" className="report">
            <li id="li" className={activeNow === 8 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdPoll style={{ margin: -1, padding: -1 }} />
              </span>
              AICTE Report
            </li>
          </Link>

          <Link to="/settings" className="setting">
            <li id="li" className={activeNow === 9 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdSettings style={{ margin: -1, padding: -1 }} />
              </span>
              Change Password
            </li>
          </Link>
          <li id="li" className="nav-item logout">
            <span className="mx-2">
              <RiLogoutBoxLine style={{ margin: -1, padding: -1 }} />
            </span>
            <a onClick={this.handleLogout}>Logout</a>
          </li>
        </ul>
      </>
    );
  }
}

export default connect((store) => ({ auth: store.auth }), { logout })(
  Admin_Sidenav
);
