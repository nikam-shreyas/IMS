import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAdmin,
  getCurrentTeacher,
  getFaculty,
  deleteTeacher,
  setCurrentTeacher,
  createTeacher,
  setCurrentAdmin,
  setFaculty,
} from "../store/actions/admin";
import { Link } from "react-router-dom";
class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      imgSrc:""
    }
    const {      
      getFaculty,      
    } = this.props;
    getFaculty().then(console.log(this.props));
  }
  async componentDidMount(){
  
  }
  
  render() {    
    return(
        <div>
        <Link to="IMS/server/public/Documents/41244_ShreyasNikam.pdf" target="_blank" download>Download</Link>
        <a href="file://IMS/server/public/Documents/41244_ShreyasNikam.pdf" target="_blank">here </a>
        </div>
      );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    faculty: store.faculty,
    currentTeacher: store.currentTeacher,
    currentAdmin: store.currentAdmin,
  }),
  {
    getAdmin,
    getCurrentTeacher,
    getFaculty,
    deleteTeacher,
    setCurrentTeacher,
    createTeacher,
    setCurrentAdmin,
    setFaculty,
  }
)(TestPage);