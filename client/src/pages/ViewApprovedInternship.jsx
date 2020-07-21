import React, { Component } from "react";
import { getCurrentInternship, deleteInternship } from "../store/actions";
import { connect } from "react-redux";
import Sidenav_f from "../components/SideNav_f";
import { withRouter } from "react-router-dom";
class ViewApprovedInternship extends Component {
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
      holder: { id: null, designation: null },
      completionStatus: null,
      comments: null,
    },
  };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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
      this.props.history.push("/student");
    }
  }
  loadData(internship) {
    this.setState({ data: internship });
  }
  render() {
    return (
      <>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Sidenav_f activeComponent="3" />
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
    { getCurrentInternship, deleteInternship }
  )(ViewApprovedInternship)
);
