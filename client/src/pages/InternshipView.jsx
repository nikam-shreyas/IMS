import React, { Component } from "react";

import {
  getCurrentInternship,
  deleteInternship,
  forwardInternship,
  approveInternship,
  updateInternship,
  rejectInternship,
} from "../store/actions";

import { connect } from "react-redux";
import SideNav_f from "../components/SideNav_f";
import { withRouter } from "react-router-dom";
class InternshipView extends Component {
  state = {
    isLoading: true,
    showButton: false,
    data: {
      _id: null,
      application: {
        workplace: null,
        submittedDate: null,
        offerLetter: null,
        durationOfInternship: null,
      },
      docs: {
        ApplicationStatus: null,
        UndertakingStatus: null,
        OfferLetterStatus: null,
        MarksheetsStatus: null,
        AttendanceStatus: null,
      },
      student: {
        name: {
          firstname: null,
          lastname: null,
        },
        currentClass: {
          year: null,
          div: null,
        },
        rollNo: null,
        prevSemAttendance: null,
        emailId: null,
      },
      approvedBy: [],
      files: [],
      holder: { id: null, designation: null },
      completionStatus: null,
      comments: null,
    },
  };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }
  async componentDidMount() {
    const { getCurrentInternship } = this.props;
    let c = window.location.href.split("/");
    let internshipId = c[4];
    getCurrentInternship(internshipId)
      .then(this.setState({ isLoading: false }))
      .then(console.log(this.props))
      .then(() => this.loadData(this.props.internships));
  }
  handleClick(data) {
    let remark = prompt("Enter a remark: ");
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        ["remark"]: remark,
      },
    }));
    if (window.confirm("Are you sure?")) {
      if (this.state.data.holder.designation !== "Principal") {
        const { forwardInternship, updateInternship } = this.props;
        updateInternship(this.state.data);
        forwardInternship(data);
        alert("Application Forwarded!");
      }
      if (this.state.data.holder.designation === "Principal") {
        const { approveInternship } = this.props;
        approveInternship(data);
        alert("Application Approved!");
      }
      this.props.history.push("/approvedinternships");
    }
  }
  async loadData(internship) {
    this.setState({ data: internship });
    for (const [key, value] of Object.entries(this.state.data.docs)) {
      if (value === "Pending") this.setState({ showButton: true });
    }
    const fileDiv = document.getElementById("files");
    for (let i = 0; i < this.state.data.files.length; i++) {
      for (const key in this.state.data.files[i]) {
        if (this.state.data.files[i].hasOwnProperty(key)) {
          const file = this.state.data.files[i][key];
          const divFileElement = document.createElement("a");
          const downloadPDFResponse = await fetch(
            "http://localhost:4002/api/internships/getFile",
            {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ file: file }),
            }
          );
          divFileElement.innerHTML +=
            '<small className="text-muted"><strong>' +
            file +
            "</strong></small>";
          divFileElement.download = file;
          divFileElement.style.borderRadius = "10px";
          divFileElement.style.padding = "5px";
          divFileElement.style.margin = "10px";
          divFileElement.style.marginLeft = "20px";
          divFileElement.className = "col-sm-5 card card-body";
          const downloadPDFBlob = await downloadPDFResponse.blob();
          const downloadPDFObjectURL = URL.createObjectURL(downloadPDFBlob);
          divFileElement.href = downloadPDFObjectURL;
          divFileElement.target = "blank";
          divFileElement.removeAttribute("download");
          fileDiv.appendChild(divFileElement);
          console.log(divFileElement);
        }
      }
    }
  }
  updateStatus(event) {
    event.preventDefault();
    var formData = new FormData(event.target);

    var docsStatus = { ...this.state.data };
    console.log(docsStatus);
    if (
      this.state.data.docs.AttendanceStatus === "Pending" &&
      formData.get("AttendanceStatus") === "on"
    ) {
      docsStatus.docs.AttendanceStatus = "Approved";
    }
    if (
      this.state.data.docs.ApplicationStatus === "Pending" &&
      formData.get("ApplicationStatus") === "on"
    ) {
      docsStatus.docs.ApplicationStatus = "Approved";
    }
    if (
      this.state.data.docs.UndertakingStatus === "Pending" &&
      formData.get("UndertakingStatus") === "on"
    ) {
      docsStatus.docs.UndertakingStatus = "Approved";
    }
    if (
      this.state.data.docs.OfferLetterStatus === "Pending" &&
      formData.get("OfferLetterStatus") === "on"
    ) {
      docsStatus.docs.OfferLetterStatus = "Approved";
    }
    if (
      this.state.data.docs.MarksheetsStatus === "Pending" &&
      formData.get("MarksheetsStatus") === "on"
    ) {
      docsStatus.docs.MarksheetsStatus = "Approved";
    }
    console.log(docsStatus);
    this.setState({ data: docsStatus });
    alert("Updated!");
  }
  handleReject() {
    let reason = prompt(
      "Enter a reason for the rejection of this application."
    );
    if (reason) {
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          ["comment"]: reason,
        },
      }));

      const { rejectInternship } = this.props;
      rejectInternship(this.state.data).then(alert("Application Rejected"));
      this.props.history.push("/internships");
    }
  }
  render() {
    return (
      <>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <SideNav_f activeComponent="2" />
          </div>
          <div className="col-sm-10 of">
            <div className="container-fluid">
              <h4 className="mt-2">Application:</h4>
              <hr />
              <div className="card m-3 border-dark" id="card">
                {this.state.isLoading && <>Loading...</>}
                {
                  <>
                    <div className="card-header">
                      {this.state.data.application.workplace}
                      <br />
                    </div>
                    <div className="card-body">
                      <div className="card-title">
                        Name:{" "}
                        {this.state.data.student.name.firstname +
                          " " +
                          this.state.data.student.name.lastname}
                        <br />
                        <small className="text-muted">
                          {this.state.data.student.currentClass.year +
                            " " +
                            this.state.data.student.currentClass.div}
                        </small>
                      </div>
                      <table className="table table-hover table-sm table-striped table-bordered my-3">
                        <tbody>
                          <tr>
                            <td>ID</td>
                            <td>{this.state.data._id}</td>
                          </tr>
                          <tr>
                            <td>Attendance</td>
                            <td>
                              {this.state.data.student.prevSemAttendance}%
                            </td>
                          </tr>
                          <tr>
                            <td>Roll No</td>
                            <td>{this.state.data.student.rollNo}</td>
                          </tr>
                          <tr>
                            <td>Start Date</td>
                            <td>
                              {new Date(
                                this.state.data.application.startDate
                              ).toDateString()}
                            </td>
                          </tr>
                          <tr>
                            <td>Email: </td>
                            <td>{this.state.data.student.emailId}</td>
                          </tr>
                          <tr>
                            <td>Submitted On</td>
                            <td>
                              {new Date(
                                this.state.data.application.submittedDate
                              ).toDateString()}
                            </td>
                          </tr>
                          {this.state.data.application.approvedDate && (
                            <>
                              <tr>
                                <td>Approved On: </td>
                                <td>
                                  {new Date(
                                    this.state.data.application.approvedDate
                                  ).toDateString()}
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                      {this.state.data.approvedBy.length > 0 && (
                        <>
                          Remarks: <br />
                          <table className="table tbale-sm">
                            <tbody>
                              {this.state.data.approvedBy.map((p) => (
                                <tr key={p.designation}>
                                  <td>@{p.designation}</td>
                                  <td>{p.remark}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
                      <form onSubmit={this.updateStatus}>
                        <table className="table table-hover table-sm">
                          <thead className="thead-dark">
                            <tr>
                              <th>Status</th>
                              <th>
                                {this.state.data.completionStatus === "Pending"
                                  ? "Pending"
                                  : "Approved"}
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr
                              className={
                                this.state.data.docs.AttendanceStatus ===
                                "Pending"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Attendance</td>
                              <td>
                                {this.state.data.docs.AttendanceStatus}
                                <div className="float-right">
                                  {this.state.data.docs.AttendanceStatus ===
                                  "Pending" ? (
                                    <input
                                      className="form-check-input position-static"
                                      name="AttendanceStatus"
                                      type="checkbox"
                                      id="AttendanceStatus"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr
                              className={
                                this.state.data.docs.ApplicationStatus ===
                                "Pending"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Application</td>
                              <td>
                                {this.state.data.docs.ApplicationStatus}
                                <div className="float-right">
                                  {this.state.data.docs.ApplicationStatus ===
                                  "Pending" ? (
                                    <input
                                      className="form-check-input position-static"
                                      name="ApplicationStatus"
                                      type="checkbox"
                                      id="ApplicationStatus"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr
                              className={
                                this.state.data.docs.UndertakingStatus ===
                                "Pending"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Undertaking</td>
                              <td>
                                {this.state.data.docs.UndertakingStatus}
                                <div className="float-right">
                                  {this.state.data.docs.UndertakingStatus ===
                                  "Pending" ? (
                                    <input
                                      className="form-check-input position-static"
                                      name="UndertakingStatus"
                                      type="checkbox"
                                      id="UndertakingStatus"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr
                              className={
                                this.state.data.docs.OfferLetterStatus ===
                                "Pending"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Offer Letter</td>
                              <td>
                                {this.state.data.docs.OfferLetterStatus}
                                <div className="float-right">
                                  {this.state.data.docs.OfferLetterStatus ===
                                  "Pending" ? (
                                    <input
                                      className="form-check-input position-static"
                                      name="OfferLetterStatus"
                                      type="checkbox"
                                      id="OfferLetterStatus"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <tr
                              className={
                                this.state.data.docs.MarksheetsStatus ===
                                "Pending"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Marksheets</td>
                              <td>
                                {this.state.data.docs.MarksheetsStatus}
                                <div className="float-right">
                                  {this.state.data.docs.MarksheetsStatus ===
                                  "Pending" ? (
                                    <input
                                      className="form-check-input position-static"
                                      name="MarksheetsStatus"
                                      type="checkbox"
                                      id="MarksheetsStatus"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </td>
                            </tr>

                            {this.state.showButton && (
                              <tr>
                                <td colSpan="3" className="bg-dark">
                                  <div className="float-right">
                                    <button className="btn btn-success btn-sm">
                                      Update Status
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        {this.state.data.files.length > 0 && (
                          <>
                            <hr />
                            Files:
                            <div id="files" className="row"></div>
                          </>
                        )}
                      </form>
                    </div>
                    <div className="card-footer text-right">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleReject(this.state.data)}
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-success btn-sm mx-2"
                        onClick={() => this.handleClick(this.state.data)}
                      >
                        {this.state.data.holder.designation === "Principal"
                          ? "Approve"
                          : "Forward"}
                      </button>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(
  connect(
    (store) => ({
      auth: store.auth,
      internships: store.internships,
    }),

    {
      getCurrentInternship,
      deleteInternship,
      forwardInternship,
      approveInternship,
      updateInternship,
      rejectInternship,
    }
  )(InternshipView)
);
