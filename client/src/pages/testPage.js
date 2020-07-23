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
import axios, { get } from "axios";
// import { Document, Page } from 'react-pdf';
class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imgSrc: "",
    };
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
  async componentDidMount() {
    let url = "http://localhost:4002/api/internships/getFile";
    let headers = new Headers();
    headers.append("Accept", "application/pdf");
    headers.append("Content-type", "application/pdf");
    headers.append("mode", "no-cors");
    fetch(url, { headers })
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((uril) => {
        var link = document.createElement("a");
        link.href = uril;
        link.download = "41244_NOC" + ".pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    //   var file ="server/public/Documents/41244_ShreyasNikam.pdf";
    //   var reader = new FileReader();
    //   var url = reader.readAsDataURL(file);
    //   reader.onloadend = function (e) {
    //      this.setState({
    //          imgSrc: reader.result
    //      })
    // //    }.bind(this);
    axios({
      url: "http://localhost:4002/api/internships/getFile", // download url
      method: "get",
      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/pdf",
        mode: "no-cors",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        console.log("here");
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "41244_NOC.pdf";
        a.click();
        a.remove();
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      });
    // var pdf = new PDFObject({
    //   url: "http://localhost:4002/api/internships/getFile",
    //   id: "pdfRendered",
    //   pdfOpenParams: {
    //     view: "FitH"
    //   }
    // }).embed("pdfRenderer");

    //  console.log(url)
  }

  loadFile(f) {
    this.setState({ file: f });
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
    // return <Fragment>
    // <button onClick={this.downloadEmployeeData}>Download</button>
    // {this.download}
    // </Fragment>;
    return (
      <div>
        <div id="pdfRenderer"></div>
        {this.state.file}
        <Link
          to="../../../server/public/Documents/41244_NOC.pdf"
          target="_blank"
        >
          Download
        </Link>
        <a href={this.state.file} target="_blank">
          here{" "}
        </a>
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
