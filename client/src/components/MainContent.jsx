import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Router, Route } from "react-router-dom";
import { getStudentInternships } from "../store/actions";
import { MdFormatListBulleted, MdViewAgenda } from "react-icons/md";
class MainContent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getStudentInternships } = this.props;
    getStudentInternships();
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
  handleView(id) {}
  render() {
    const internships =
      this.props.internships.length > 0 &&
      this.props.internships.map((internship) => (
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
                Application is currently viewed by: {internship.holder} <br />
              </>
            )}
          </div>
        </div>
      ));
    return (
      <Fragment>
        <div className="container my-1 of">
          <h4 className="mt-2">
            My Applications
            <div
              class="btn-group btn-group-toggle btn-sm float-right"
              data-toggle="buttons"
            >
              <label
                class="btn btn-secondary btn-sm"
                onClick={this.enableListview}
              >
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  autocomplete="off"
                  checked
                />
                <MdFormatListBulleted color="white" />
              </label>
              <label
                class="btn btn-secondary active btn-sm"
                onClick={this.enableCardview}
              >
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  autocomplete="off"
                />
                <MdViewAgenda color="white" />
              </label>
            </div>
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
  { getStudentInternships }
)(MainContent);
