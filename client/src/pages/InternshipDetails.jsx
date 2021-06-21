import React, { Component } from "react";
import { getCurrentInternship, deleteInternship } from "../store/actions";
import { connect } from "react-redux";
import Sidenav from "../components/Sidenav";
import { withRouter } from "react-router-dom";
class InternshipDetails extends Component {
  state = {
    isLoading: true,
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
      files: [],
      holder: { id: null, designation: null },
      completionStatus: null,
      comments: null,
    },
  };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.loadData = this.loadData.bind(this);
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
  handleClick(id) {
    if (window.confirm("Are you sure you want to delete this application?")) {
      const { deleteInternship } = this.props;
      deleteInternship(id);
      alert("Application Deleted!");
      // this.props.history.push("/student");
    }
  }
  async loadData(internship) {
    this.setState({ data: internship });
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
          divFileElement.className = "col-sm-5 card card-body";
          const downloadPDFBlob = await downloadPDFResponse.blob();
          const downloadPDFObjectURL = URL.createObjectURL(downloadPDFBlob);
          divFileElement.href = downloadPDFObjectURL;
          divFileElement.target = "blank";
          divFileElement.removeAttribute("download");
          fileDiv.appendChild(divFileElement);
        }
      }
    }
  }
  render() {
    return (
      <>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Sidenav activeComponent="1" />
          </div>
          <div className="col-sm-10 of">
            <div className="container-fluid">
              <h4 className="mt-2">
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  Back
                </button>
                <span className="ml-2">Application: {this.state.data._id}</span>
              </h4>
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
                      {this.state.data.comments && (
                        <div
                          className={
                            this.state.data.comments.indexOf(
                              "Congratulations"
                            ) >= 0
                              ? "alert alert-success"
                              : "alert alert-danger"
                          }
                        >
                          {this.state.data.comments}
                        </div>
                      )}
                      {this.state.data.completionStatus === "Approved" && (
                        <div className="mb-4">
                          <div className="form-row">
                            <div className="col-sm-12">
                              Completion Certificate:{" "}
                              <small className="text-info">
                                (Upload certificate after completion of
                                internship)
                              </small>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  name="completionCertificate"
                                  id="completionCertificate"
                                />
                                <label
                                  className="custom-file-label"
                                  id="completionCertificateLabel"
                                  htmlFor="completionCertificate"
                                >
                                  Choose file
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="card-title">
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
                      <table className="table table-hover table-striped table-bordered my-3">
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
                            <td>{this.state.data.docs.AttendanceStatus}</td>
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
                            <td>{this.state.data.docs.ApplicationStatus}</td>
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
                            <td>{this.state.data.docs.UndertakingStatus}</td>
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
                            <td>{this.state.data.docs.OfferLetterStatus}</td>
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
                            <td>{this.state.data.docs.MarksheetsStatus}</td>
                          </tr>
                        </tbody>
                      </table>

                      {this.state.data.completionStatus === "Pending" && (
                        <>
                          Application is currently viewed by:{" "}
                          {this.state.data.holder.designation} <br />
                        </>
                      )}
                      {this.state.data.files.length > 0 && (
                        <>
                          <hr />
                          Files:
                          <div id="files" className="row"></div>
                        </>
                      )}
                    </div>

                    {this.state.data.completionStatus === "Pending" && (
                      <div className="card-footer text-right">
                        <div
                          className="btn btn-danger btn-sm mx-2"
                          onClick={() => this.handleClick(this.state.data._id)}
                        >
                          Delete
                        </div>
                      </div>
                    )}
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
    { getCurrentInternship, deleteInternship }
  )(InternshipDetails)
);
