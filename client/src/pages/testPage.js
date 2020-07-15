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
  download() {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: 'http://releases.ubuntu.com/12.04.5/ubuntu-12.04.5-alternate-amd64.iso',
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }
  render() {
    console.log(this.props.faculty);
    return <Fragment>
    {this.download}
    </Fragment>;
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