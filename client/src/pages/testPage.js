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
  downloadEmployeeData = () => {
		fetch('http://localhost:8080/employees/download')
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'employees.json';
					a.click();
				});
				//window.location.href = response.url;
		});
	}
  render() {
    console.log(this.props.faculty);
    return <Fragment>
    <button onClick={this.downloadEmployeeData}>Download</button>
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