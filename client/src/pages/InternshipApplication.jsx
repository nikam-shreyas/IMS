import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createInternship,
  uploadDocument,
  removeSuccess,
  removeError,
} from "../store/actions";
import Sidenav from "../components/Sidenav";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
class InternshipApplication extends React.Component {
  state = {
    startDate: new Date(),
    fileName: [],
    fileNOC: null,
    fileOL: null,
    fileFE: null,
    fileSE: null,
    fileTE: null,
    fileBE: null,
  };
  componentWillUnmount() {
    const { removeSuccess, removeError } = this.props;
    removeSuccess();
    removeError();
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitNOCFile = this.submitNOCFile.bind(this);
    this.submitOL = this.submitOL.bind(this);
    this.submitFE = this.submitFE.bind(this);
    this.submitSE = this.submitSE.bind(this);
    this.submitTE = this.submitTE.bind(this);
    this.submitBE = this.submitBE.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  submitNOCFile(event) {
    this.setState({ fileNOC: event.target.files[0] });
    this.handleUpload("NOC", "NOCLabel");
  }
  submitOL(event) {
    this.setState({ fileOL: event.target.files[0] });
    this.handleUpload("offerLetter", "offerLetterLabel");
  }

  submitFE(event) {
    this.setState({ fileFE: event.target.files[0] });
    this.handleUpload("FEMarksheet", "FEMarksheetLabel");
  }
  submitSE(event) {
    this.setState({ fileSE: event.target.files[0] });
    this.handleUpload("SEMarksheet", "SEMarksheetLabel");
  }
  submitTE(event) {
    this.setState({ fileTE: event.target.files[0] });
    this.handleUpload("TEMarksheet", "TEMarksheetLabel");
  }
  submitBE(event) {
    this.setState({ fileBE: event.target.files[0] });
    this.handleUpload("BEMarksheet", "BEMarksheetLabel");
  }
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  // downloadFile(){
  //   var x = new XMLHttpRequest();
  //   x.open('GET','https:localhost:4002/index.js',true);

  // }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    const data = { application: {} };
    for (var [key, value] of formData.entries()) {
      data["application"][key] = value;
    }
    console.log(this.state.fileOL);
    data["application"]["submittedDate"] = new Date().toUTCString();
    data["application"]["offerLetter"] =
      "/public/Documents/" + this.state.fileOL.name;

    data["application"]["NOCRequired"] = document.getElementById(
      "NOCRequired"
    ).checked;
    const formDataFile = new FormData();
    formDataFile.append("docs", this.state.fileOL);

    if (this.state.fileFE != null) {
      data["application"]["FEMarksheet"] =
        "/public/Documents/" + this.state.fileFE.name;
      formDataFile.append("docs", this.state.fileFE);
    }
    if (this.state.fileSE != null) {
      data["application"]["SEMarksheet"] =
        "/public/Documents/" + this.state.fileSE.name;
      formDataFile.append("docs", this.state.fileSE);
    }
    if (this.state.fileTE != null) {
      data["application"]["TEMarksheet"] =
        "/public/Documents/" + this.state.fileTE.name;
      formDataFile.append("docs", this.state.fileTE);
    }
    if (this.state.fileBE != null) {
      data["application"]["BEMarksheet"] =
        "/public/Documents/" + this.state.fileBE.name;
      formDataFile.append("docs", this.state.fileBE);
    }
    if (this.state.fileNOC != null) {
      formDataFile.append("docs", this.state.fileNOC);
      data["application"]["NOC"] =
        "/public/Documents" + this.state.fileNOC.name;
    } else {
      data["application"]["NOC"] = "";
    }
    // let datafiles={};
    // for (let i = 0 ; i < this.state.fileName.length ; i++) {
    //   formDataFile.append("docs", this.state.fileName[i]);
    // }
    // datafiles["offerLetter"]=this.state.fileName;
    // formDataFile.append("offerLetter", this.state.fileName);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // axios.post("http://localhost:4002/api/internships/uploadDocument",formDataFile,config)
    //     .then((response) => {
    //         alert("The file is successfully uploaded");
    //     }).catch((error) => {
    // });
    console.log(data);
    const { uploadDocument, createInternship } = this.props;
    uploadDocument(formDataFile, config);
    createInternship(data).then((window.location.href = "/student"));
  }
  handleUpload(id, labelId) {
    var fileName = document.getElementById(id).value.split("\\").pop();
    document.getElementById(labelId).classList.add("selected");
    document.getElementById(labelId).innerHTML = fileName;
  }
  render() {
    return (
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <Sidenav activeComponent="3" />
        </div>
        <div className="col-sm-10 of">
          <div className="container-fluid">
            <h4 className="mt-2">Apply</h4>
            <div
              className="alert alert-secondary alert-dismissible fade show"
              role="alert"
            >
              <strong>P.S. </strong> Please update your profile before applying.
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr />
            <form onSubmit={this.handleSubmit}>
              Internship Details:
              <hr />
              <div className="container-fluid">
                <div className="form-row my-2">
                  <div className="col-sm-6">
                    Company:
                    <input
                      type="text"
                      name="workplace"
                      id="workplace"
                      className="form-control"
                      placeholder="eg. Google"
                      required
                    />
                  </div>
                  <div className="col-sm-3">
                    Start Date:
                    <div className="input-group">
                      <DatePicker
                        name="startDate"
                        id="startDate"
                        className="form-control"
                        dateFormat="yyyy/MM/dd"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        minDate={new Date()}
                        showDisabledMonthNavigation
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    Duration:
                    <div className="input-group">
                      <input
                        type="number"
                        name="durationOfInternship"
                        id="durationOfInternship"
                        placeholder="eg. 1"
                        className="form-control"
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">month(s)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row my-2">
                  <div className="col-sm-6">
                    Type of Internship:
                    <input
                      type="text"
                      name="internshipType"
                      id="internshipType"
                      className="form-control"
                      placeholder="eg. Work from home"
                    />
                  </div>

                  <div className="col-sm-6">
                    Stipend:
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroupPrependRs"
                        >
                          Rs.{" "}
                        </span>
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        id="stipend"
                        name="stipend"
                        placeholder="eg. 10000"
                        aria-describedby="inputGroupPrependRs"
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">/month</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row my-2">
                  <div className="col-sm-6">
                    NOC required:
                    <input
                      type="text"
                      name="NOCRequired"
                      id="NOCRequired"
                      className="form-control"
                      placeholder="Yes/No"
                    />
                  </div>
                  <div className="col-sm-6">
                    Reference:
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroupPrependSalutation"
                        >
                          Mr./Mrs.
                        </span>
                      </div>
                      <input
                        type="text"
                        name="reference"
                        id="reference"
                        aria-describedby="inputGroupPrependSalutation"
                        placeholder="eg. John Doe"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="form-row">
                  {/* <form method="post" encType="multipart/form-data" onSubmit="/internship/uploadDocument">
                <input type="file" name="offerLetter" />
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
    </form>

                  <input
                    className="form-control"
                    type="file"
                    name="offerLetter"
                    onChange={this.submitFile}
                  />
                </div> */}
              </div>
              <hr />
              Upload documents:{" "}
              <small className="text-danger">
                (Files to be uploaded strictly in PDF format.)
              </small>
              <small className="text-primary float-right">
                (File name: Roll_FileInitials, eg. 41244_NOC.pdf)
              </small>
              <hr />
              <div className="container-fluid">
                <div className="form-row">
                  <div className="col-sm-6">
                    No Objection Certificate:{" "}
                    <small className="text-secondary">
                      (Upload file if NOC is required in a specific format)
                    </small>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        name="NOC"
                        id="NOC"
                        onChange={this.submitNOCFile}
                      />
                      <label
                        className="custom-file-label"
                        id="NOCLabel"
                        htmlFor="NOC"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    Offer Letter:
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        name="offerLetter"
                        id="offerLetter"
                        onChange={this.submitOL}
                        required
                      />
                      <label
                        className="custom-file-label"
                        id="offerLetterLabel"
                        htmlFor="offerLetter"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              Marksheets:{" "}
              <small className="text-primary float-right">
                (File name: Roll_Year, eg: 41244_FE.pdf)
              </small>
              <hr />
              <div className="container-fluid">
                <div className="form-row">
                  <div className="col-sm-6">
                    FE Marksheet:
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        name="FEMarksheet"
                        id="FEMarksheet"
                        onChange={this.submitFE}
                      />
                      <label
                        className="custom-file-label"
                        id="FEMarksheetLabel"
                        htmlFor="FEMarksheet"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    SE Marksheet:
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        name="SEMarksheet"
                        id="SEMarksheet"
                        onChange={this.submitSE}
                      />
                      <label
                        className="custom-file-label"
                        id="SEMarksheetLabel"
                        htmlFor="SEMarksheet"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-sm-6">
                    TE Marksheet:
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        name="TEMarksheet"
                        id="TEMarksheet"
                        onChange={this.submitTE}
                      />
                      <label
                        className="custom-file-label"
                        id="TEMarksheet"
                        htmlFor="TEMarksheet"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    BE Marksheet:
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        name="BEMarksheet"
                        id="BEMarksheet"
                        onChange={this.submitBE}
                      />
                      <label
                        className="custom-file-label"
                        id="BEMarksheetLabel"
                        htmlFor="BEMarksheet"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="text-right mb-2">
                <button className="btn border-dark mx-2" type="reset">
                  Reset
                </button>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (store) => ({
      auth: store.auth,
      internships: store.internships,
    }),
    { createInternship, uploadDocument, removeSuccess, removeError }
  )(InternshipApplication)
);
