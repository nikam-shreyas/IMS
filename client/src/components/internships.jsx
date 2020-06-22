import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getInternships } from "../store/actions";
import Sidenav_f from "./SideNav_f";
class Internships extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getInternships } = this.props;
    getInternships().then(console.log(this.props));
  }

  render() {
    console.log(this.props);
    // var p = 0;

    // const {auth,getInternships,getStudentInternships} =this.props;
    // const internships = this.props.internships.map((internship) => (
    //   <tr key={internship._id} style={{ height: "120px" }}>
    //     <td>
    //       <ol>
    //         {internship.approvedBy.map((p) => (
    //           <li>{p.designation}</li>
    //         ))}
    //       </ol>
    //     </td>
    //     <td>
    //       <b>{internship.completionStatus}</b>
    //     </td>

    //     <td>
    //       <b>{console.log(internship)}</b>
    //     </td>
    //     {/* <td><pre>{JSON.stringify(internship.application.submittedDate,null,2)}</pre></td> */}
    //     <td>
    //       <b>
    //         {new Date(
    //           internship.application.submittedDate
    //         ).toLocaleDateString()}
    //       </b>
    //     </td>
    //     <td>
    //       <b>
    //         {new Date(internship.application.approvedDate).toLocaleDateString()}
    //       </b>
    //     </td>
    //     <td>
    //       <b>{internship.application.workplace}</b>
    //     </td>
    //     <td>
    //       <b>{internship.application.durationOfInternship}</b>
    //     </td>
    //     <td>
    //       <b>{internship.application.reference}</b>
    //     </td>
    //     <td>
    //       <b>{internship.application.offerLetter}</b>
    //     </td>
    //     <td></td>
    //     {p++}
    //   </tr>
    // ));

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