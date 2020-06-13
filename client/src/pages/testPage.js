import React, { Component, Fragment } from "react";
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
class TestPage extends Component {
  constructor(props) {
    super(props);
    const {
      getAdmin,
      getCurrentTeacher,
      getFaculty,
      deleteTeacher,
      setCurrentTeacher,
      createTeacher,
      setCurrentAdmin,
      setFaculty,
    } = this.props;
    getFaculty().then(console.log(this.props));
  }
  render() {
    console.log(this.props.faculty);
    return <Fragment></Fragment>;
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
