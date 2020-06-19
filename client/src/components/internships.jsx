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
    getInternships()
    .then(console.log("im here"))
    .then(console.log(this.props));
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
                
                <form onSubmit={()=>this.On_Submit(internship._id)}>
                <input style={{display:"none"}} type="radio" className="accept" value={"accept"+p} id={"accept"+p} name="option"/>
                <label className="accept" htmlFor={"accept"+p}>ACCEPT</label>
                
                <input style={{display:"none"}} type="radio" className="reject" value={"reject"+p} id={"reject"+p} name="option"/>
                <label className="reject" htmlFor={"reject"+p}>REJECT</label>
                <div style={{textAlign:"center"}}>
              
                <button  className="btn btn-success">Submit</button>
                
                </div>
                </form>

               
            </td>
        {p++}
      </tr>
    ));

    return (
      <Fragment>
        
    
        <div className="row no-gutters">
        <div className="col-sm-2">
            <Sidenav_f activeComponent="3"/>
          </div>
          <div className="col-sm-10" >
          <div className="card" style={{width:"100%"},{height:"70%"},{overflowX:"scroll"}}>
          <div class="card-header" style={{textAlign:"center"}}>
                <h1>Internship Details</h1>
                <hr/>
          </div>
          <table className="table table-hover table-responsive" style={{height:"80rem"},{border:"1px solid black"}}>
          <thead className="thead-dark" style={{position:"absolute"}}>
            <tr>
            <th style={{textAlign:"center"}} colSpan="5">Documents Details</th>
            <th colSpan="1"></th>
            <th colSpan="1"></th>
            <th colSpan="1"></th>
            <th style={{textAlign:"center"}} colSpan="6">Application</th>
            <th colSpan="1"></th>
            </tr>
            <tr>
              <th>Application Status</th>
              <th>Undertaking Status</th>
              <th>OfferLetter Status</th>
              <th>Marksheet Status</th>
              <th>Attendance Status</th>
              <th>Approved By</th>
              <th>Completion Status</th>
              <th>Student</th>
              <th>Submitted Date</th>
              <th>Approved Date</th>
              <th>Workplace</th>
              <th>Duration Of Internship</th>
              <th>Referenece</th>
              <th>Offer Letter</th>
              <th>Accept/Reject</th>
              
              
            </tr>
            <tbody>
              {internships}
            </tbody>
          </thead>
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

