import React, { Component } from "react";
import { connect } from "react-redux";
import { getApprovedInternships } from "../store/actions";
import { Link } from "react-router-dom";
import { MdFormatListBulleted, MdViewAgenda, MdSearch } from "react-icons/md";
import SideNav_f from "../components/SideNav_f";
class Internships extends Component {
  state = {
    displayCount: "null",
    displayCountDiv: "none",
    internships: [
      {
        _id: null,
        application: {
          workplace: null,
          submittedDate: null,
          offerLetter: null,
          durationOfInternship: null,
          startDate: null,
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
          designation: null,
        },
        completionStatus: null,
        comments: null,
      },
    ],
  };
  filter(e) {
    var filter, cards, cardContent, i;
    filter = e.target.value.toUpperCase();
    cards = document.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
      cardContent = cards[i].querySelector(".individual-card");
      if (cardContent.innerText.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
  componentDidMount() {
    const { getApprovedInternships } = this.props;
    getApprovedInternships().then(console.log(this.props));
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
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <SideNav_f activeComponent="3" />
        </div>
        <div className="col-sm-10 of">
          <div className="container-fluid">
            <h4 className="mt-2">
              Approved Applications
              <div className="float-right">
                <div
                  className="btn-group btn-group-toggle btn-sm"
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
                    <MdFormatListBulleted
                      style={{ margin: -1, padding: -1 }}
                      color="white"
                    />
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
                    <MdViewAgenda
                      style={{ margin: -1, padding: -1 }}
                      color="white"
                    />
                  </label>
                </div>
              </div>
            </h4>
            <hr />
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="filtersearch">
                  <span>
                    <MdSearch style={{ padding: -2, margin: -2 }} />
                    {"  "} Search
                  </span>
                </span>
              </div>
              <input
                type="text"
                name="filter"
                id="filter"
                className="form-control"
                placeholder="Filter Applications (By name, id, holder, ...)"
                onChange={this.filter}
                aria-describedby="filtersearch"
              />
            </div>
            <hr />
            <div>
              {this.state.internships[0].holder.designation === null && (
                <div className="alert alert-info">
                  <b>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => this.loadData(this.props.internships)}
                    >
                      Click here
                    </span>
                  </b>{" "}
                  to fetch applications.
                </div>
              )}
              {this.state.internships[0].holder.designation !== null &&
                this.state.internships.map((internship) => (
                  <>
                    <div
                      key={internship._id}
                      className={
                        internship.completionStatus === "Pending"
                          ? "card my-3 border-secondary"
                          : "card my-3 border-success"
                      }
                    >
                      <div className="individual-card">
                        <div className="card-header">
                          {internship.application.workplace}
                          <span className="float-right">
                            <Link
                              to={{
                                pathname: `/internshipviewapproved/${internship._id}`,
                              }}
                              className="btn btn-primary btn-border mx-2"
                            >
                              View
                            </Link>
                          </span>
                          <br />
                          <small className="text-muted">
                            {internship.student.name.firstname +
                              " " +
                              internship.student.name.lastname}
                          </small>
                        </div>
                        <div className="card-body">
                          <table className="table table-hover table-sm">
                            <thead className="thead-dark">
                              <tr>
                                <th>Status</th>
                                <th>
                                  {internship.completionStatus === "Pending"
                                    ? "Pending"
                                    : "Approved"}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                className={
                                  internship.docs.AttendanceStatus === "Pending"
                                    ? "table-warning"
                                    : "table-success"
                                }
                              >
                                <td>Attendance</td>
                                <td>{internship.docs.AttendanceStatus}</td>
                              </tr>
                              <tr
                                className={
                                  internship.docs.ApplicationStatus ===
                                  "Pending"
                                    ? "table-warning"
                                    : "table-success"
                                }
                              >
                                <td>Application</td>
                                <td>{internship.docs.ApplicationStatus}</td>
                              </tr>
                              <tr
                                className={
                                  internship.docs.UndertakingStatus ===
                                  "Pending"
                                    ? "table-warning"
                                    : "table-success"
                                }
                              >
                                <td>Undertaking</td>
                                <td>{internship.docs.UndertakingStatus}</td>
                              </tr>
                              <tr
                                className={
                                  internship.docs.OfferLetterStatus ===
                                  "Pending"
                                    ? "table-warning"
                                    : "table-success"
                                }
                              >
                                <td>Offer Letter</td>
                                <td>{internship.docs.OfferLetterStatus}</td>
                              </tr>
                              <tr
                                className={
                                  internship.docs.MarksheetsStatus === "Pending"
                                    ? "table-warning"
                                    : "table-success"
                                }
                              >
                                <td>Marksheets</td>
                                <td>{internship.docs.MarksheetsStatus}</td>
                              </tr>
                            </tbody>
                          </table>

                          {internship.completionStatus === "Pending" && (
                            <>
                              Application is currently viewed by:{" "}
                              {internship.holder.designation} <br />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    internships: store.internships,
  }),
  { getApprovedInternships }
)(Internships);
