import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Router, Route } from "react-router-dom";
import { getStudentInternships } from "../store/actions";
import { MdFormatListBulleted, MdViewAgenda, MdCached } from "react-icons/md";
class MainContent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    internships: [
      {
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
        holder: {
          id: null,
          designation: null,
        },
        completionStatus: null,
        comments: null,
      },
    ],
  };
  async componentDidMount() {
    const { getStudentInternships } = this.props;
    getStudentInternships().then(this.setState(this.props.internships));
  }
  loadData(internships) {
    if (internships.length > 0) this.setState({ internships: internships });
  }
  enableListview() {
    var elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
  enableCardview() {
    var elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
    }
  }
  render() {
    return (
      <Fragment>
        <div className="container my-1 of">
          <div className="mt-2 mr-2">
            <h4>My Applications</h4>
            <button
              className="btn btn-sm mx-auto btn-secondary"
              onClick={() => this.loadData(this.props.internships)}
            >
              <span className="mr-2">
                <MdCached />
              </span>
              Fetch Data
            </button>
            <div
              className="btn-group btn-group-toggle btn-sm float-right"
              data-toggle="buttons"
            >
              <label
                className="btn btn-secondary btn-sm"
                onClick={this.enableListview}
              >
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  autoComplete="off"
                  checked
                />
                <MdFormatListBulleted color="white" />
              </label>
              <label
                className="btn btn-secondary active btn-sm"
                onClick={this.enableCardview}
              >
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  autoComplete="off"
                />
                <MdViewAgenda color="white" />
              </label>
            </div>
          </div>

          <hr />
          <div>
            {this.state.internships[0].holder.designation !== null &&
              this.state.internships.map((internship) => (
                <div
                  key={internship._id}
                  className={
                    internship.completionStatus === "N"
                      ? "card my-3 border-secondary"
                      : "card my-3 border-success"
                  }
                >
                  <div className="card-header">
                    {internship.application.workplace}
                    <span className="float-right">
                      <Link
                        to={{
                          pathname: `/internshipdetails/${internship._id}`,
                        }}
                        className="btn btn-primary btn-border mx-2"
                      >
                        View
                      </Link>
                    </span>
                    <br />
                    <small className="text-muted">{internship._id}</small>
                  </div>
                  <div className="card-body">
                    <table className="table table-hover table-sm">
                      <thead className="thead-dark">
                        <tr>
                          <th>Status</th>
                          <th>
                            {internship.completionStatus === "N"
                              ? "Pending"
                              : "Approved"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          className={
                            internship.docs.AttendanceStatus === "N"
                              ? "table-warning"
                              : "table-success"
                          }
                        >
                          <td>Attendance</td>
                          <td>{internship.docs.AttendanceStatus}</td>
                        </tr>
                        <tr
                          className={
                            internship.docs.ApplicationStatus === "N"
                              ? "table-warning"
                              : "table-success"
                          }
                        >
                          <td>Application</td>
                          <td>{internship.docs.ApplicationStatus}</td>
                        </tr>
                        <tr
                          className={
                            internship.docs.UndertakingStatus === "N"
                              ? "table-warning"
                              : "table-success"
                          }
                        >
                          <td>Undertaking</td>
                          <td>{internship.docs.UndertakingStatus}</td>
                        </tr>
                        <tr
                          className={
                            internship.docs.OfferLetterStatus === "N"
                              ? "table-warning"
                              : "table-success"
                          }
                        >
                          <td>Offer Letter</td>
                          <td>{internship.docs.OfferLetterStatus}</td>
                        </tr>
                        <tr
                          className={
                            internship.docs.MarksheetsStatus === "N"
                              ? "table-warning"
                              : "table-success"
                          }
                        >
                          <td>Marksheets</td>
                          <td>{internship.docs.MarksheetsStatus}</td>
                        </tr>
                      </tbody>
                    </table>
                    {internship.completionStatus === "N" && (
                      <>
                        Application is currently viewed by:{" "}
                        {internship.holder.designation} <br />
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    internships: store.internships,
  }),
  { getStudentInternships }
)(MainContent);
