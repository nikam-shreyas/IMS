import React, { Component } from "react";
import Sidenav from "../components/Sidenav";
import MainContent from "../components/MainContent";

class Admin_Home extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row no-gutters h-100">
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

export default Admin_Home;
