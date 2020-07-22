import React, { Component } from "react";
import Sidenav from "../components/Sidenav";

class GuidelinesInternship extends Component {
  state = {};

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <Sidenav activeComponent="7" />
        </div>
        <div className="col-sm-10 of">
          <div className="container-fluid">
            <div class="alert alert-light" role="alert">
              <hr />
              <h4 style={{ color: "#000" }} class="alert-heading">
                Guidelines
              </h4>
              <hr />
              <ol>
                <li style={{ color: "#000" }}>
                  Internship may be full time or part time.
                </li>
                <li style={{ color: "#000" }}>
                  Internship may be paid or unpaid.
                </li>
                <li style={{ color: "#000" }}>
                  Internship duration is including vaction period as follows :
                  <ul>
                    <li>Maximum of 2 months: for UG after 6th semester</li>
                    <li>
                      Maximum of 1.5 months: for UG after 2nd and 4th semester
                    </li>
                  </ul>
                </li>
                <li style={{ color: "#000" }}>
                  <strong>
                    {" "}
                    Eligibilty criteria : Minimum 75% attendance is compulsory
                    and more than 7 CGPA in previous consecutive years.
                  </strong>
                </li>
                <li style={{ color: "#000" }}>
                  {" "}
                  No student will be permitted for internship without prior
                  permission of institute.
                </li>
                <li style={{ color: "#000" }}>
                  {" "}
                  The intern will demonstrate punctuality and a willingness to
                  learn during internship programme.{" "}
                </li>
                <li style={{ color: "#000" }}>
                  {" "}
                  The intern will obey policies, rules and regulations of the
                  company/institute and comply with the institues/company's
                  business practices and procedures.
                </li>
                <li style={{ color: "#000" }}>
                  {" "}
                  The intern will maintain a regular internship schedule
                  determined by the institue or company
                </li>
              </ol>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GuidelinesInternship;
