import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getInternships } from "../store/actions";
import Sidenav_f from "./SideNav_f";
class Internships extends Component {
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

  componentDidMount() {
    const { getInternships } = this.props;
    getInternships().then(console.log(this.props));
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
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Sidenav_f activeComponent="2" />
          </div>
          <div className="col-sm-10 of">
            <div className="container of mt-2">
              <h4>Internship Applications</h4>
              <hr />

              <table className="table table-hover table-sm table-responsive">
                <thead className="thead-dark">
                  <tr>
                    <th>Student</th>
                    <th>Workplace</th>
                    <th>Duration Of Internship</th>
                    <th>OfferLetter</th>
                    <th>Reference</th>
                    <th>Approve/Reject</th>
                  </tr>
                </thead>
                {/* <tbody>{internships}</tbody> */}
              </table>
            </div>
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
  { getInternships }
)(Internships);