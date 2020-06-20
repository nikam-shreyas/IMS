import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getInternships } from "../store/actions";
import { Link, Router, Route } from "react-router-dom";
import { MdFormatListBulleted, MdViewAgenda, MdCached } from "react-icons/md";
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
        holder: null,
        completionStatus: null,
        comments: null,
      },
    ],
  };

  componentDidMount() {
    const { getInternships } = this.props;
    getInternships()
    .then(this.loadData(this.props.internships));
  }



  loadData(internships) {
    this.setState({ internships: internships });
    //console.log(internships);
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
    console.log("this is years ");
    var p = 0;

    

    return (
      <Fragment>
        
    
        <div className="row no-gutters">
        <div className="col-sm-2">
            <Sidenav_f activeComponent="3"/>
          </div>
          
          {this.state.internships.map((internship) => (
            <p>{internship.application.workplace}</p>
          ))}

        
          
          
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

