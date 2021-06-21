import React, { Component } from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import {
  getStudentList,
  deleteStudents,
  searchStudents,
} from "../store/actions/admin";
import { MdDone, MdDelete } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSelected: false,
      isLoading: true,
      students: [
        {
          _id: "",

          name: { firstname: null, lastname: null },
          currentClass: { year: null, div: null },
          rollNo: null,
          username: null,
          YEAR: "",
          DIV: "",
        },
      ],
      ids: [],
    };

    this.deleteall = this.deleteall.bind(this);
    this.search = this.search.bind(this);

    this.selectall = this.selectall.bind(this);
  }
  async componentDidMount() {
    const { getStudentList } = this.props;
    getStudentList()
      .then(this.setState({ isLoading: false }))
      .then(() => this.loadData(this.props.students));
  }
  loadData(studentlist) {
    this.setState({ students: studentlist });
  }
  handleListView() {
    let elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }

  handleCardView() {
    let elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
    }
  }
  expandInline(e) {
    e.target.parentElement.lastChild.style.display = "block";
  }
  selectall() {
    var p = document.getElementsByName("check");
    if (this.state.allSelected) {
      for (var i = 0; i < p.length; i++) {
        p[i].checked = false;
      }
    } else {
      for (var j = 0; j < p.length; j++) {
        p[j].checked = true;
      }
    }
    this.setState({ allSelected: !this.state.allSelected });
  }

  deletesingle = (e) => {
    var g = document.getElementById(e.target.value);
    if (g.checked === true) {
    } else {
      alert("Not Selected");
    }
  };

  deleteall() {
    var p = document.getElementsByName("check");
    var obj = [];
    for (var i = 0; i < p.length; i++) {
      if (p[i].checked === true) {
        obj.push(p[i].id);
      }
    }

    if (obj.length === 0) {
      alert("No Students to delete.");
    } else {
      const { deleteStudents } = this.props;
      deleteStudents(obj);
    }
  }

  async search() {
    var year = document.getElementById("year");
    var div = document.getElementById("div");
    await this.setState({ YEAR: year.value });
    await this.setState({ DIV: div.value });

    if (year.value === "--") {
      alert("Please select Year");
    } else if (div.value === "--") {
      alert("Please Select Division");
    } else {
      const { YEAR, DIV } = this.state;
      const { searchStudents } = this.props;
      let data = {};
      data["YEAR"] = YEAR;
      data["DIV"] = DIV;
      searchStudents(data).then(() => {
        this.loadSomeStudents(this.props.someStudents);
      });
    }
  }
  loadSomeStudents(student) {
    this.setState({ students: student });
  }
  renderCardData1() {
    return this.state.students.map((students) => {
      const { _id, username, name, currentClass, rollNo, created } = students;
      return (
        <tr key={_id} className="application">
          <td>
            <input type="checkbox" name="check" id={_id} value={_id} />
          </td>
          <td>{username}</td>
          <td>{rollNo}</td>
          <td>{name.firstname + " " + name.lastname}</td>
          <td>{currentClass.year + " " + currentClass.div}</td>
          <td>{new Date(created).toDateString()}</td>
        </tr>
      );
    });
  }

  renderCardData() {
    return this.state.students.map((students) => {
      const { _id, username, name, currentClass, rollNo, created } = students;

      return (
        <tr key={_id} className="application">
          <td>
            <input type="checkbox" name="check" id={_id} value={_id} />
          </td>
          <td>{username}</td>
          <td>{rollNo}</td>
          <td>{name.firstname + " " + name.lastname}</td>
          <td>{currentClass.year + " " + currentClass.div}</td>
          <td>{new Date(created).toDateString()}</td>
        </tr>
      );
    });
  }

  filter(e) {
    var filterText, cards, i;
    filterText = e.target.value.toUpperCase();
    cards = document.getElementsByClassName("application");
    for (i = 0; i < cards.length; i++) {
      if (cards[i].innerText.toUpperCase().indexOf(filterText) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
  render() {
    return (
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <Admin_Sidenav activeComponent="3" />
        </div>
        <div className="col-sm-10 of">
          <div className="container-fluid">
            <div class="row">
              <div className="col-sm-2">
                <h4 className="mt-2">Students List</h4>
              </div>
              <div className="col-sm-10 mt-2">
                <div className="mt-2">
                  <ErrorMessage />
                  <SuccessMessage />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-7">
                <span>
                  <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-sm"
                      >
                        <MdSearch />
                      </span>
                    </div>
                    <input
                      type="text"
                      name="filter"
                      id="filter"
                      className="form-control"
                      placeholder="Filter Students"
                      onChange={this.filter}
                      aria-describedby="filtersearch"
                    />
                  </div>
                </span>
              </div>
              <div className="col-sm-5">
                <div className="container">
                  <div className="row no-gutters">
                    <div className="col-sm-8">
                      <span>
                        <div
                          className="btn-group bg-secondary"
                          style={{ borderRadius: 5 }}
                        >
                          <button className="btn btn-sm">Filter: </button>
                          <select
                            className="btn btn-secondary btn-sm"
                            id="year"
                          >
                            <option value="--">Year</option>
                            <option value="FE">FE</option>
                            <option value="SE">SE</option>
                            <option value="TE">TE</option>
                            <option value="BE">BE</option>
                          </select>
                          <select className="btn btn-secondary btn-sm" id="div">
                            <option value="--">Div</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                          </select>
                          <button
                            id="search_button"
                            onClick={this.search}
                            className="btn bg-primary text-white btn-sm"
                          >
                            Search
                          </button>
                        </div>
                      </span>
                    </div>
                    <div class="col-sm-4">
                      <span>
                        <button
                          id="deleteselected"
                          onClick={this.deleteall}
                          className="btn btn-sm btn-danger ml-2"
                        >
                          <MdDelete
                            style={{ marginBottom: -2, marginRight: 3 }}
                          />
                          Delete Selected
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table
              className="table table-sm table-hover mt-1"
              style={{ borderRadius: 1 }}
            >
              <thead>
                <tr className="thead-dark">
                  <th>
                    <MdDone
                      style={{
                        marginBottom: -2,
                        borderRadius: 2,
                        border: "1px solid white",
                        padding: 1,
                      }}
                      onClick={this.selectall}
                    />
                  </th>
                  <th>Username</th>
                  <th>Roll No.</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Created On</th>
                </tr>
              </thead>
              <tbody>
                {this.state.isLoading === true ? (
                  <p>No data</p>
                ) : (
                  this.renderCardData()
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    students: store.studentlist,
    someStudents: store.someStudentlist,
  }),

  { getStudentList, deleteStudents, searchStudents }
)(StudentList);
