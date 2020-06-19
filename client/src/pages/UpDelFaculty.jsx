import React,{ Component } from "react";
import { connect } from "react-redux";
import Admin_Sidenav from "../components/Admin_Sidenav";


class UpDelFaculty extends Component{



}

export default connect(
    (store) => ({
      auth: store.auth,
    }),
    {  }
  )(UpDelFaculty);