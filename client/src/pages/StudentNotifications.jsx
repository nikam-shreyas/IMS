import React, { Component } from "react";
import Sidenav from "../components/Sidenav";
import PersonalNotices from "../components/PersonalNotices";
import Notices from "../components/Notices";
class StudentNotifications extends Component {
  state = {};

  render() {
    return (
      <>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Sidenav activeComponent="5" />
          </div>
          <div className="col-sm-10 of">
            <div className="container-fluid">
              <h4 className="mt-2">Personal Notices:</h4>

              <hr />
              <PersonalNotices />
              <hr />
              <h4>Public Notices:</h4>
              <hr />
              <Notices />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default StudentNotifications;
