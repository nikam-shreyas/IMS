import React from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { getAicteReport } from "../store/actions";
import { Component } from "react";
import { MdExpandMore } from "react-icons/md";
import { connect } from "react-redux";
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internships: [],
      count: null,
      csvData: [],
      prevYear: [],
    };
  }
  async componentDidMount() {
    const { getAicteReport } = this.props;
    getAicteReport().then(() => this.loadData(this.props.internships));
  }
  loadData(internship) {
    this.setState({ internships: internship });
    this.setState({ count: internship.length });
    this.setState({ prevYear: internship.previousYear });
  }
  renderTable() {
    console.log(this.state.prevYear);
    let Ccountfe1 = 0,
      Ccountse1 = 0,
      Ccountse2 = 0,
      Ccountte1 = 0,
      Ccountte2 = 0,
      Ccountbe1 = 0,
      Ccountbe2 = 0,
      Icountse1 = 0,
      Icountse2 = 0,
      Icountte1 = 0,
      Icountte2 = 0,
      Icountbe1 = 0,
      Icountbe2 = 0,
      Ecountse1 = 0,
      Ecountse2 = 0,
      Ecountte1 = 0,
      Ecountte2 = 0,
      Ecountbe1 = 0,
      Ecountbe2 = 0;
    console.log(this.state.internships.previousYear);
    this.state.internships.previousYear.map((element) => {
      if (element._id.department === "FE") {
        Ccountfe1 = element.total;
      } else if (element._id.department === "SE") {
        Ccountse1 = element.total;
        console.log(Ccountse1);
      } else if (element._id.department === "TE") {
        Ccountte1 = element.total;
      } else if (element._id.department === "BE") {
        Ccountbe1 = element.total;
      }
    });
    console.log(Ccountte1);
    var year = new Date().getFullYear();
    // this.state.internships.forEach((internship) => {
    //   var date = new Date(internship.application.submittedDate);
    //   if (internship.student.currentClass.year === "SE") {
    //     if (internship.student.currentClass.div <= 4) {
    //       if (
    //         (date.getFullYear() === year && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ccountse1++;
    //       } else if (
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 2 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ccountse2++;
    //       }
    //     } else if (
    //       internship.student.currentClass.div <= 8 &&
    //       internship.student.currentClass.div > 4
    //     ) {
    //       if (
    //         (date.getFullYear() === year && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ecountse1++;
    //       } else if (
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 2 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ecountse2++;
    //       }
    //     } else if (
    //       internship.student.currentClass.div <= 11 &&
    //       internship.student.currentClass.div > 8
    //     ) {
    //       if (
    //         (date.getFullYear() === year && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 > 6)
    //       ) {
    //         Icountse1++;
    //       } else if (
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 2 && date.getMonth() + 1 > 6)
    //       ) {
    //         Icountse2++;
    //       }
    //     }
    //   } else if (internship.student.currentClass.year === "TE") {
    //     if (internship.student.currentClass.div <= 4) {
    //       if (
    //         (date.getFullYear() === year && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ccountte1++;
    //       } else if (
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 2 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ccountte2++;
    //       }
    //     } else if (
    //       internship.student.currentClass.div <= 8 &&
    //       internship.student.currentClass.div > 4
    //     ) {
    //       if (
    //         (date.getFullYear() === year && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ecountte1++;
    //       } else if (
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 2 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ecountte2++;
    //       }
    //     } else if (
    //       internship.student.currentClass.div <= 11 &&
    //       internship.student.currentClass.div > 8
    //     ) {
    //       if (
    //         (date.getFullYear() === year && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 > 6)
    //       ) {
    //         Icountte1++;
    //       } else if (
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 2 && date.getMonth() + 1 > 6)
    //       ) {
    //         Icountte2++;
    //       }
    //     }
    //   } else if (internship.student.currentClass.year === "BE") {
    //     if (internship.student.currentClass.div <= 4) {
    //       if (
    //         (date.getFullYear() === year && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ccountbe1++;
    //       } else if (
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 2 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ccountbe2++;
    //       }
    //     } else if (
    //       internship.student.currentClass.div <= 8 &&
    //       internship.student.currentClass.div > 4
    //     ) {
    //       if (
    //         (date.getFullYear() === year && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ecountbe1++;
    //       } else if (
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 2 && date.getMonth() + 1 > 6)
    //       ) {
    //         Ecountbe2++;
    //       }
    //     } else if (
    //       internship.student.currentClass.div <= 11 &&
    //       internship.student.currentClass.div > 8
    //     ) {
    //       if (
    //         (date.getFullYear() === year && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 > 6)
    //       ) {
    //         Icountbe1++;
    //       } else if (
    //         (date.getFullYear() === year - 1 && date.getMonth() + 1 <= 6) ||
    //         (date.getFullYear() === year - 2 && date.getMonth() + 1 > 6)
    //       ) {
    //         Icountbe2++;
    //       }
    //     }
    //   }
    // });

    var SETOTAL =
      Ccountse1 + Ccountse2 + Icountse1 + Icountse2 + Ecountse1 + Ecountse2;
    var BETOTAL =
      Ccountbe1 + Ccountbe2 + Icountbe1 + Icountbe2 + Ecountbe1 + Ecountbe2;
    var TETOTAL =
      Ccountte1 + Ccountte2 + Icountte1 + Icountte2 + Ecountte1 + Ecountte2;
    var TOTAL = SETOTAL + BETOTAL + TETOTAL;
    return (
      <tbody>
        <tr>
          <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
            COMPUTER ENGG
          </td>
        </tr>
        <tr>
          <td>{year - 1 + "-" + year}</td>
          <td>{Ccountfe1}</td>
          <td>{Ccountse1}</td>
          <td>{Ccountte1}</td>
          <td>{Ccountbe1}</td>
          <td>{Ccountse1 + Ccountte1 + Ccountbe1}</td>
        </tr>
        <tr>
          <td>{year - 2 + "-" + (year - 1)}</td>
          <td>0</td>
          <td>{Ccountse2}</td>
          <td>{Ccountte2}</td>
          <td>{Ccountbe2}</td>
          <td>{Ccountse2 + Ccountte2 + Ccountbe2}</td>
        </tr>
        <tr>
          <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
            ENTC ENGG
          </td>
        </tr>
        <tr>
          <td>{year - 1 + "-" + year}</td>
          <td>0</td>
          <td>{Ecountse1}</td>
          <td>{Ecountte1}</td>
          <td>{Ecountbe1}</td>
          <td>{Ecountse1 + Ecountte1 + Ecountbe1}</td>
        </tr>
        <tr>
          <td>{year - 2 + "-" + (year - 1)}</td>
          <td>0</td>
          <td>{Ecountse2}</td>
          <td>{Ecountte2}</td>
          <td>{Ecountbe2}</td>
          <td>{Ecountse2 + Ecountte2 + Ecountbe2}</td>
        </tr>
        <tr>
          <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
            IT ENGG
          </td>
        </tr>
        <tr>
          <td>{year - 1 + "-" + year}</td>
          <td>{Icountse1}</td>
          <td>{Icountte1}</td>
          <td>{Icountbe1}</td>
          <td>0</td>
          <td>{Icountse1 + Icountte1 + Icountbe1}</td>
        </tr>
        <tr>
          <td>{year - 2 + "-" + (year - 1)}</td>
          <td>0</td>
          <td>{Icountse2}</td>
          <td>{Icountte2}</td>
          <td>{Icountbe2}</td>
          <td>{Icountse2 + Icountte2 + Icountbe2}</td>
        </tr>
        <tr>
          <td>
            <b> PICT Research Internship</b>
          </td>
        </tr>
        <tr>
          <td>
            <b>Total</b>
          </td>
          <td>0</td>
          <td>{SETOTAL}</td>
          <td>{TETOTAL}</td>
          <td>{BETOTAL}</td>
          <td>{TOTAL}</td>
        </tr>
      </tbody>
    );
  }
  renderCurrentYear() {
    var Ccountse1 = 0,
      Ccountse2 = 0,
      Ccountte1 = 0,
      Ccountte2 = 0,
      Ccountbe1 = 0,
      Ccountbe2 = 0,
      Icountse1 = 0,
      Icountse2 = 0,
      Icountte1 = 0,
      Icountte2 = 0,
      Icountbe1 = 0,
      Icountbe2 = 0,
      Ecountse1 = 0,
      Ecountse2 = 0,
      Ecountte1 = 0,
      Ecountte2 = 0,
      Ecountbe1 = 0,
      Ecountbe2 = 0;

    var year = new Date().getFullYear();
    this.state.internships.forEach((internship) => {
      var date = new Date(internship.application.submittedDate);
      if (internship.student.currentClass.year === "SE") {
        if (internship.student.currentClass.div <= 4) {
          if (date.getFullYear() === year && date.getMonth() + 1 >= 6) {
            Ccountse1++;
          } else if (date.getFullYear() === year && date.getMonth() + 1 < 6) {
            Ccountse2++;
          }
        } else if (
          internship.student.currentClass.div <= 8 &&
          internship.student.currentClass.div > 4
        ) {
          if (date.getFullYear() === year && date.getMonth() + 1 >= 6) {
            Ecountse1++;
          } else if (date.getFullYear() === year && date.getMonth() + 1 < 6) {
            Ecountse2++;
          }
        } else if (
          internship.student.currentClass.div <= 11 &&
          internship.student.currentClass.div > 8
        ) {
          if (date.getFullYear() === year && date.getMonth() + 1 >= 6) {
            Icountse1++;
          } else if (date.getFullYear() === year && date.getMonth() + 1 < 6) {
            Icountse2++;
          }
        }
      } else if (internship.student.currentClass.year === "TE") {
        if (internship.student.currentClass.div <= 4) {
          if (date.getFullYear() === year && date.getMonth() + 1 >= 6) {
            Ccountte1++;
          } else if (date.getFullYear() === year && date.getMonth() + 1 < 6) {
            Ccountte2++;
          }
        } else if (
          internship.student.currentClass.div <= 8 &&
          internship.student.currentClass.div > 4
        ) {
          if (date.getFullYear() === year && date.getMonth() + 1 >= 6) {
            Ecountte1++;
          } else if (date.getFullYear() === year && date.getMonth() + 1 < 6) {
            Ecountte2++;
          }
        } else if (
          internship.student.currentClass.div <= 11 &&
          internship.student.currentClass.div > 8
        ) {
          if (date.getFullYear() === year && date.getMonth() + 1 >= 6) {
            Icountte1++;
          } else if (date.getFullYear() === year && date.getMonth() + 1 < 6) {
            Icountte2++;
          }
        }
      } else if (internship.student.currentClass.year === "BE") {
        if (internship.student.currentClass.div <= 4) {
          if (date.getFullYear() === year && date.getMonth() + 1 >= 6) {
            Ccountbe1++;
          } else if (date.getFullYear() === year && date.getMonth() + 1 < 6) {
            Ccountbe2++;
          }
        } else if (
          internship.student.currentClass.div <= 8 &&
          internship.student.currentClass.div > 4
        ) {
          if (date.getFullYear() === year && date.getMonth() + 1 >= 6) {
            Ecountbe1++;
          } else if (date.getFullYear() === year && date.getMonth() + 1 < 6) {
            Ecountbe2++;
          }
        } else if (
          internship.student.currentClass.div <= 11 &&
          internship.student.currentClass.div > 8
        ) {
          if (date.getFullYear() === year && date.getMonth() + 1 >= 6) {
            Icountbe1++;
          } else if (date.getFullYear() === year && date.getMonth() + 1 < 6) {
            Icountbe2++;
          }
        }
      }
    });
    var SETOTAL =
      Ccountse1 + Ccountse2 + Icountse1 + Icountse2 + Ecountse1 + Ecountse2;
    var BETOTAL =
      Ccountbe1 + Ccountbe2 + Icountbe1 + Icountbe2 + Ecountbe1 + Ecountbe2;
    var TETOTAL =
      Ccountte1 + Ccountte2 + Icountte1 + Icountte2 + Ecountte1 + Ecountte2;
    var TOTAL = SETOTAL + BETOTAL + TETOTAL;
    return (
      <tbody>
        <tr>
          <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
            COMPUTER ENGG
          </td>
        </tr>
        <tr>
          <td>{"Current Semester"}</td>
          <td>0</td>
          <td>{Ccountse1}</td>
          <td>{Ccountte1}</td>
          <td>{Ccountbe1}</td>
          <td>{Ccountse1 + Ccountte1 + Ccountbe1}</td>
        </tr>
        <tr>
          <td>{"Previous Semester"}</td>
          <td>0</td>
          <td>{Ccountse2}</td>
          <td>{Ccountte2}</td>
          <td>{Ccountbe2}</td>
          <td>{Ccountse2 + Ccountte2 + Ccountbe2}</td>
        </tr>
        <tr>
          <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
            ENTC ENGG
          </td>
        </tr>
        <tr>
          <td>{"Current Semester"}</td>
          <td>0</td>
          <td>{Ecountse1}</td>
          <td>{Ecountte1}</td>
          <td>{Ecountbe1}</td>
          <td>{Ecountse1 + Ecountte1 + Ecountbe1}</td>
        </tr>
        <tr>
          <td>{"Previous Semester"}</td>
          <td>0</td>
          <td>{Ecountse2}</td>
          <td>{Ecountte2}</td>
          <td>{Ecountbe2}</td>
          <td>{Ecountse2 + Ecountte2 + Ecountbe2}</td>
        </tr>
        <tr>
          <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
            IT ENGG
          </td>
        </tr>
        <tr>
          <td>{"Current Semester"}</td>
          <td>0</td>
          <td>{Icountse1}</td>
          <td>{Icountte1}</td>
          <td>{Icountbe1}</td>
          <td>{Icountse1 + Icountte1 + Icountbe1}</td>
        </tr>
        <tr>
          <td>{"Previous Semester"}</td>
          <td>0</td>
          <td>{Icountse2}</td>
          <td>{Icountte2}</td>
          <td>{Icountbe2}</td>
          <td>{Icountse2 + Icountte2 + Icountbe2}</td>
        </tr>
        <tr>
          <td>
            <b> PICT Research Internship</b>
          </td>
        </tr>
        <tr>
          <td>
            <b>Total</b>
          </td>
          <td>0</td>
          <td>{SETOTAL}</td>
          <td>{TETOTAL}</td>
          <td>{BETOTAL}</td>
          <td>{TOTAL}</td>
        </tr>
      </tbody>
    );
  }
  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Admin_Sidenav activeComponent="8" />
          </div>
          <div className="col-sm-10 of">
            <div className="container mt-2">
              <h4>AICTE Report</h4>
              <hr />
              <nav>
                <div className="nav nav-tabs mt-2" id="nav-tab" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="tab-CurrentYear"
                    data-toggle="tab"
                    href="#CurrentYear"
                    role="tab"
                    aria-controls="CurrentYear"
                    aria-selected="true"
                  >
                    Current Year
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-lastYear"
                    data-toggle="tab"
                    href="#lastYear"
                    role="tab"
                    aria-controls="lastYear"
                    aria-selected="false"
                  >
                    Previous 2 Years
                  </a>
                </div>
              </nav>
            </div>

            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="CurrentYear"
                role="tabpanel"
                aria-labelledby="tab-CurrentYear"
              ></div>
              <div
                className="tab-pane fade show active"
                id="lastYear"
                role="tabpanel"
                aria-labelledby="tab-lastYear"
              >
                <div className="container-fluid mt-2">
                  <table className="table table-sm table-bordered table-hover">
                    <thead className="thead-light">
                      <tr>
                        <th>
                          Acedemic Year
                          <MdExpandMore style={{ margin: -1, padding: -1 }} />
                        </th>
                        <th>
                          FE{" "}
                          <MdExpandMore style={{ margin: -1, padding: -1 }} />
                        </th>
                        <th>
                          SE{" "}
                          <MdExpandMore style={{ margin: -1, padding: -1 }} />
                        </th>
                        <th>
                          TE{" "}
                          <MdExpandMore style={{ margin: -1, padding: -1 }} />
                        </th>
                        <th>
                          BE{" "}
                          <MdExpandMore style={{ margin: -1, padding: -1 }} />
                        </th>

                        <th>
                          Total{" "}
                          <MdExpandMore style={{ margin: -1, padding: -1 }} />
                        </th>
                      </tr>
                    </thead>
                    {this.state.prevYear.length === 0 ? (
                      <div></div>
                    ) : (
                      this.renderTable()
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    internships: store.internships,
  }),
  {
    getAicteReport,
  }
)(Report);
