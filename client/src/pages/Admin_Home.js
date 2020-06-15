import React, { Component } from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";

class Admin_Home extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row no-gutters h-100">
        <div className="col-sm-2 sidenav">
          <Admin_Sidenav activeComponent="1" />
        </div>
        
      </div>
    );
  }
}

export default Admin_Home;