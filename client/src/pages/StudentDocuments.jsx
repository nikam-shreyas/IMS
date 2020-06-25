import React, { Component } from "react";
import axios from "axios";
import Sidenav from "../components/Sidenav";
class StudentDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myfile", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:4002/upload", formData, config)
      .then((response) => {
        alert("The file is successfully uploaded");
      })
      .catch((error) => {});
  }

  onChange(e) {
    this.setState({ file: e.target.files });
  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <Sidenav activeComponent="4" />
        </div>
        <div className="col-sm-10">
          <div className="container-fluid">
            <br />
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Documents</strong> page needs to be completed
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentDocuments;
