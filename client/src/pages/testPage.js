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
class TestPage extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const downloadPDFLink = document.getElementById("downloadPDFLink");
    const downloadPDFResponse = await fetch(
      "http://localhost:4002/api/internships/getFile"
    );
    const downloadPDFBlob = await downloadPDFResponse.blob();
    const downloadPDFObjectURL = URL.createObjectURL(downloadPDFBlob);
    downloadPDFLink.href = downloadPDFObjectURL;
  }

  loadFile(f) {
    this.setState({ file: f });
  }

  render() {
    return (
      <div>
        <div>
          <a id="downloadPDFLink" download="41244_NOC.pdf" href="#">
            Download PDF File
          </a>
        </div>
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
