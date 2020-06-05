import React, { Component } from "react";
import Sidenav from "../components/Sidenav";
import MainContent from "../components/MainContent";

class StudentDashboard extends Component {
  state = {};
  render() {
    return (
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <Sidenav />
        </div>
        <div className="col-sm-10">
          <MainContent />
        </div>
      </div>
    );
  }
}

export default StudentDashboard;
