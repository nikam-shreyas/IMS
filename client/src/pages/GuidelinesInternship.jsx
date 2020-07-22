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
              <h4 style={{ color: "#000" }} class="alert-heading">
                INTERNSHIP GUIDELINES FOR STUDENTS
              </h4>
              <a style={{ color: "#000", fontSize: "18px" }}>
                Internship is great opportunity to learn in industry environment
                without being an employee of company. Students are advised to
                set their goals prior to starting their internship and focus on
                completing them during internship.{" "}
              </a>
              <hr />
              <h4 style={{ color: "#000" }} class="alert-heading">
                Following are internship guidelines for students :{" "}
              </h4>

              <ol style={{ marginLeft: "18px" }}>
                <li style={{ color: "#000", fontSize: "18px" }}>
                  Internship may be full time or part time.
                </li>
                <li style={{ color: "#000", fontSize: "18px" }}>
                  Internship may be paid or unpaid.
                </li>
                <li style={{ color: "#000", fontSize: "18px" }}>
                  Internship duration is including vacation period as follows :
                  <ul>
                    <li style={{ marginLeft: "15px", fontSize: "18px" }}>
                      Maximum of 2 months: for UG after 6th semester.
                    </li>
                    <li style={{ marginLeft: "15px", fontSize: "18px" }}>
                      Maximum of 1.5 months: for UG after 2nd and 4th semester.
                    </li>
                  </ul>
                </li>
                <li style={{ color: "#f44336", fontSize: "18px" }}>
                  <strong>
                    {" "}
                    Eligibilty criteria : Minimum 75% attendance is compulsory
                    and more than 7 CGPA in previous consecutive years.
                  </strong>
                </li>
                <li style={{ color: "#f44336", fontSize: "18px" }}>
                  <strong>
                    {" "}
                    After completing the internship, certificate of completion
                    will have to be uploaded on the portal.
                  </strong>
                </li>
                <li style={{ color: "#000", fontSize: "18px" }}>
                  {" "}
                  No student will be permitted for internship without prior
                  permission of institute.
                </li>
                <li style={{ color: "#000", fontSize: "18px" }}>
                  {" "}
                  The intern will demonstrate punctuality and a willingness to
                  learn during internship programme.{" "}
                </li>
                <li style={{ color: "#000", fontSize: "18px" }}>
                  {" "}
                  The intern will obey policies, rules and regulations of the
                  company/institute and comply with the institues/company's
                  business practices and procedures.
                </li>
                <li style={{ color: "#000", fontSize: "18px" }}>
                  {" "}
                  The intern will maintain a regular internship schedule
                  determined by the institute or company.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GuidelinesInternship;
