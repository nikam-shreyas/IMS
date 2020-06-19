import React, { Component } from "react";
import axios from "axios";
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
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input
          type="file"
          className="custom-file-input"
          name="myImage"
          onChange={this.onChange}
        />
        {}
        <button className="upload-button" type="submit">
          Upload to DB
        </button>
      </form>
    );
  }
}

export default StudentDocuments;