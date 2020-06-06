import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Router, Route } from "react-router-dom";
import { getStudentInternships, deleteInternship } from "../store/actions";
class MainContent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getStudentInternships } = this.props;
    getStudentInternships();
  }
  handleClick(id) {
    if (window.confirm("Are you sure you want to delete this application?")) {
      const { deleteInternship } = this.props;
      deleteInternship(id);
      window.location.reload(false);
    }
  }
  handleView(id) {}
  render() {
    const internships = this.props.internships.map((internship) => (
      <div
        key={internship._id}
        className={
          internship.completionStatus === "N"
            ? "card mx-auto my-3 border-secondary"
            : "card mx-auto my-3 border-success"
        }
      >
        <div className="card-header">
          {internship.application.workplace}
          <br />
          <small className="text-muted">{internship._id}</small>
        </div>
        <div className="card-body">
          <table className="table table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th>Status</th>
                <th>
                  {internship.completionStatus === "N" ? "Pending" : "Approved"}
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
              Application is currently viewed by: {internship.holder} <br />
            </>
          )}
          <small className="text-muted">
            Submitted on:{" "}
            {new Date(
              internship.application.submittedDate
            ).toLocaleDateString()}
          </small>
        </div>
        <div className="card-footer text-right">
          <div
            className="btn btn-danger btn-sm mx-2"
            onClick={() => this.handleClick(internship._id)}
          >
            Delete
          </div>
          <Link
            to={{
              pathname: `/internshipdetails/${internship._id}`,
            }}
            className="btn btn-primary btn-sm mx-2"
          >
            View
          </Link>
        </div>
      </div>
    ));
    return (
      <Fragment>
        <div className="container my-1 of">
          <h4>
            My Applications
            <hr />
          </h4>
          {internships}
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
  { getStudentInternships, deleteInternship }
)(MainContent);
