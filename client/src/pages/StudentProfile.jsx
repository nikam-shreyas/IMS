import React, { Component, useState } from "react";
import Sidenav from "../components/Sidenav";
import { updateStudent, getStudent } from "../store/actions";
import { connect } from "react-redux";
class StudentProfile extends Component {
  state = {
    isLoading: true,
    data: {
      name: {
        firstname: "Shreyas",
        lastname: "Nikam",
      },
      currentClass: {
        year: "TE",
        div: "2",
      },
      rollNo: "31241",
      prevSemAttendance: ">75",
    },
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const { getStudent } = this.props;
    getStudent()
      .then(this.setState({ isLoading: false }))
      .then(() => this.loadData(this.props.auth.user));
  }
  loadData(user) {
    console.log(user);
    if (user.prevSemAttendance !== undefined) this.setState({ data: user });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { updateStudent } = this.props;
    var formData = new FormData(event.target);
    const data = {};
    data["name"] = {
      firstname: formData.get("firstname") || this.state.data.name.firstname,
      lastname: formData.get("lastname") || this.state.data.name.lastname,
    };
    data["currentClass"] = {
      year: formData.get("year") || this.state.data.currentClass.year,
      div: formData.get("div") || this.state.data.currentClass.div,
    };
    data["prevSemAttendance"] =
      formData.get("prevSemAttendance") || this.state.data.prevSemAttendance;
    data["rollNo"] = formData.get("rollNo") || this.state.data.rollNo;
    updateStudent(data);
    alert("Profile Updated!");
    window.location.reload(false);
  }
  editform() {
    var form = document.getElementById("form");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = !elements[i].readOnly;
    }
    var editButton = document.getElementById("editButton");
    editButton.classList.toggle("btn-danger");
    editButton.innerHTML = editButton.innerHTML === "Edit" ? "Cancel" : "Edit";
  }
  render() {
    return (
      <>
        <div className="row no-gutters">
          <div className="col-sm-2">
            <Sidenav activeComponent="2" />
          </div>
          <div className="col-sm-10">
            <div className="container">
              <h4>My Profile</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  Personal Details:
                  <hr />
                  <div className="container">
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        First Name:
                        <input
                          readOnly
                          type="text"
                          name="firstname"
                          id="firstname"
                          className="form-control"
                          placeholder={this.state.data.name.firstname}
                        />
                      </div>
                      <div className="col-sm-6">
                        Last Name:
                        <input
                          readOnly
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder={this.state.data.name.lastname}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Roll No:
                        <input
                          readOnly
                          type="number"
                          className="form-control"
                          id="rollNo"
                          name="rollNo"
                          placeholder={this.state.data.rollNo}
                        />
                      </div>
                      <div className="col-sm-6">
                        Attendance:
                        <div className="input-group">
                          <div className="input-group">
                            <input
                              readOnly
                              type="number"
                              name="prevSemAttendance"
                              id="prevSemAttendance"
                              placeholder={this.state.data.prevSemAttendance}
                              className="form-control"
                            />
                            <div className="input-group-append">
                              <span className="input-group-text">%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Year:
                        <input
                          readOnly
                          type="text"
                          name="year"
                          id="year"
                          placeholder={this.state.data.currentClass.year}
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Division:
                        <input
                          readOnly
                          type="number"
                          name="div"
                          id="div"
                          placeholder={this.state.data.currentClass.div}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="text-right">
                    <button
                      type="button"
                      id="editButton"
                      className="btn btn-secondary"
                      onClick={this.editform}
                    >
                      Edit
                    </button>
                    <button className="btn border-dark mx-2" type="reset">
                      Reset
                    </button>
                    <button type="submit" className="btn btn-dark">
                      Update Profile
                    </button>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
  }),
  { updateStudent, getStudent }
)(StudentProfile);
