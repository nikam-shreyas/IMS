import React, { Component } from "react";
import Sidenav from "../components/Sidenav";
import MainContent from "../components/MainContent";

class Student_Home extends Component {
  state = {};
  render() {
    return (
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <Sidenav activeComponent="1" />
        </div>
        <div className="col-sm-10">
          <MainContent />
        </div>
      </div>
    );
  }
}

export default Student_Home;
