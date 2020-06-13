import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getInternships } from "../store/actions";

class Internships extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getInternships } = this.props;
    getInternships();
  }

  render() {
    var p = 0;

    // const {auth,getInternships,getStudentInternships} =this.props;
    const internships = this.props.internships.map((internship) => (
      <tr key={internship._id} style={{ height: "120px" }}>
        <td>
          <b>{internship.docs.ApplicationStatus}</b>
        </td>
        <td>
          <b>{internship.docs.UndertakingStatus}</b>
        </td>
        <td>
          <b>{internship.docs.OfferLetterStatus}</b>
        </td>
        <td>
          <b>{internship.docs.MarksheetsStatus}</b>
        </td>
        <td>
          <b>{internship.docs.AttendanceStatus}</b>
        </td>
        <td>
          <b>{internship.approvedBy}</b>
        </td>
        <td>
          <b>{internship.completionStatus}</b>
        </td>

        <td>
          <b>{internship.student}</b>
        </td>
        {/* <td><pre>{JSON.stringify(internship.application.submittedDate,null,2)}</pre></td> */}
        <td>
          <b>
            {new Date(
              internship.application.submittedDate
            ).toLocaleDateString()}
          </b>
        </td>
        <td>
          <b>
            {new Date(internship.application.approvedDate).toLocaleDateString()}
          </b>
        </td>
        <td>
          <b>{internship.application.workplace}</b>
        </td>
        <td>
          <b>{internship.application.durationOfInternship}</b>
        </td>
        <td>
          <b>{internship.application.reference}</b>
        </td>
        <td>
          <b>{internship.application.offerLetter}</b>
        </td>
        <td>
          <form>
            <input
              type="checkbox"
              className="accept"
              value="accept"
              id={"accept" + p}
              name="accept"
            />
            <label className="accept" htmlFor={"accept" + p}>
              ACCEPT
            </label>

            <input
              type="checkbox"
              className="reject"
              value="reject"
              id={"reject" + p}
              name="reject"
            />
            <label className="reject" htmlFor={"reject" + p}>
              REJECT
            </label>
          </form>
        </td>
        {p++}
      </tr>
    ));

    return (
      <Fragment>
        <div style={({ textAlign: "center" }, { marginTop: "20px" })}>
          <h3>
            Internship Detais
            <hr />
          </h3>
        </div>

        <div className="card" style={{ margin: "3rem" }}>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th
                  colSpan="5"
                  style={
                    ({ border: "1px solid white" }, { textAlign: "center" })
                  }
                >
                  DOCUMENT DETAILS
                </th>
                <th colSpan="3"></th>
                <th
                  colSpan="6"
                  style={
                    ({ border: "1px solid white" }, { textAlign: "center" })
                  }
                >
                  APPLICATION DETAILS
                </th>
                <th colSpan="1"></th>
              </tr>
              <tr>
                <th>Application Status</th>
                <th>Undertaking Status</th>
                <th>Offer Letter Status</th>
                <th>Marksheets Status</th>
                <th>Attendance Status</th>
                <th>Approved By</th>
                <th>Completion Status</th>

                <th>Student</th>
                <th>Submitted Date</th>
                <th>Approved Date</th>
                <th>Workplace</th>
                <th>Duration Of Internship</th>
                <th>Reference</th>
                <th>OfferLetter</th>
                <th>Approve/Reject</th>
              </tr>
            </thead>
            {internships}
          </table>
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