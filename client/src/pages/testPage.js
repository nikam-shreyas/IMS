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
import { Link } from "react-router-dom";
class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      imgSrc:""
    }
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
  async componentDidMount(){
  //   var file ="server/public/Documents/41244_ShreyasNikam.pdf";
  //   var reader = new FileReader();
  //   var url = reader.readAsDataURL(file);
  //   reader.onloadend = function (e) {
  //      this.setState({
  //          imgSrc: reader.result
  //      })
  //    }.bind(this);
  //  console.log(url) 
  }
  // downloadEmployeeData = () => {
	// 	fetch('http://localhost:8080/employees/download')
	// 		.then(response => {
	// 			response.blob().then(blob => {
	// 				let url = window.URL.createObjectURL(blob);
	// 				let a = document.createElement('a');
	// 				a.href = url;
	// 				a.download = 'employees.json';
	// 				a.click();
	// 			});
	// 			//window.location.href = response.url;
	// 	});
	// }
  render() {
    console.log(this.props.faculty);
    // return <Fragment>
    // <button onClick={this.downloadEmployeeData}>Download</button>
    // {this.download}
    // </Fragment>;
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