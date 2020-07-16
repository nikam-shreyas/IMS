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
      },
      approvedBy: [],
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

    this.state.data.remark = remark;
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
  loadData(internship) {
    this.setState({ data: internship });
    for (const [key, value] of Object.entries(this.state.data.docs)) {
      if (value === "N") this.setState({ showButton: true });
    }
  }
  updateStatus(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    if (
      this.state.data.docs.AttendanceStatus === "N" &&
      formData.get("AttendanceStatus") === "on"
    ) {
      this.state.data.docs.AttendanceStatus = "Approved";
    }
    if (
      this.state.data.docs.ApplicationStatus === "N" &&
      formData.get("ApplicationStatus") === "on"
    ) {
      this.state.data.docs.ApplicationStatus = "Approved";
    }
    if (
      this.state.data.docs.UndertakingStatus === "N" &&
      formData.get("UndertakingStatus") === "on"
    ) {
      this.state.data.docs.UndertakingStatus = "Approved";
    }
    if (
      this.state.data.docs.OfferLetterStatus === "N" &&
      formData.get("OfferLetterStatus") === "on"
    ) {
      this.state.data.docs.OfferLetterStatus = "Approved";
    }
    if (
      this.state.data.docs.MarksheetsStatus === "N" &&
      formData.get("MarksheetsStatus") === "on"
    ) {
      this.state.data.docs.MarksheetsStatus = "Approved";
    }
    alert("Updated!");
  }
  handleReject() {
    let reason = prompt(
      "Enter a reason for the rejection of this application."
    );
    if (reason) {
      this.state.data.comments = reason;
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
                      {/* {this.state.data.comments && (
                        <div className="alert alert-danger">
                          Reason: {this.state.data.comments}
                        </div>
                      )} */}
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
                                {this.state.data.completionStatus === "N"
                                  ? "Pending"
                                  : "Approved"}
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr
                              className={
                                this.state.data.docs.AttendanceStatus === "N"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Attendance</td>
                              <td>
                                {this.state.data.docs.AttendanceStatus}
                                <div className="float-right">
                                  {this.state.data.docs.AttendanceStatus ===
                                  "N" ? (
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
                                this.state.data.docs.ApplicationStatus === "N"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Application</td>
                              <td>
                                {this.state.data.docs.ApplicationStatus}
                                <div className="float-right">
                                  {this.state.data.docs.ApplicationStatus ===
                                  "N" ? (
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
                                this.state.data.docs.UndertakingStatus === "N"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Undertaking</td>
                              <td>
                                {this.state.data.docs.UndertakingStatus}
                                <div className="float-right">
                                  {this.state.data.docs.UndertakingStatus ===
                                  "N" ? (
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
                                this.state.data.docs.OfferLetterStatus === "N"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Offer Letter</td>
                              <td>
                                {this.state.data.docs.OfferLetterStatus}
                                <div className="float-right">
                                  {this.state.data.docs.OfferLetterStatus ===
                                  "N" ? (
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
                                this.state.data.docs.MarksheetsStatus === "N"
                                  ? "table-warning"
                                  : "table-success"
                              }
                            >
                              <td>Marksheets</td>
                              <td>
                                {this.state.data.docs.MarksheetsStatus}
                                <div className="float-right">
                                  {this.state.data.docs.MarksheetsStatus ===
                                  "N" ? (
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
                      </form>
                      {/* {this.state.data.completionStatus === "N" && (
                        <>
                          Application is currently viewed by:{" "}
                          {this.state.data.holder.designation} <br />
                        </>
                      )} */}
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
