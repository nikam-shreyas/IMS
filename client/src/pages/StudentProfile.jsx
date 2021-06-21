import React, { Component } from "react";
import Sidenav from "../components/Sidenav";
import { updateStudent, getStudent } from "../store/actions";
import { connect } from "react-redux";
class StudentProfile extends Component {
  state = {
    isLoading: true,
    data: {
      name: {
        firstname: "eg. John",
        lastname: "eg. Doe",
      },
      currentClass: {
        year: "eg. TE",
        div: "eg. 2",
      },
      rollNo: "eg. 31241",
      prevSemAttendance: "eg. 75.5",
      emailId: "example@gmail.com",
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
    if (user.prevSemAttendance !== undefined) this.setState({ data: user });

    this.setState({ data: { ...this.state.data, emailId: user["emailId"] } });
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
    data["emailId"] = formData.get("emailId") || this.state.data.emailId;
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

    let ele = document.getElementById("year");
    ele.disabled = !ele.disabled;
    var updateButton = document.getElementById("updateBtn");
    updateButton.disabled = !updateButton.disabled;

    var editButton = document.getElementById("editButton");
    editButton.classList.toggle("btn-danger");
    editButton.innerHTML = editButton.innerHTML === "Edit" ? "Cancel" : "Edit";
  }
  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Sidenav activeComponent="2" />
          </div>
          <div className="col-sm-10">
            <div className="container-fluid ctb">
              <h4 className="mt-2">My Profile</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  Fill in the details:
                  <hr />
                  <div className="container-fluid">
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
                        <select
                          readOnly
                          disabled
                          name="year"
                          id="year"
                          className="form-control"
                        >
                          <option value={this.state.data.currentClass.year}>
                            {this.state.data.currentClass.year}
                          </option>
                          <option disabled>――――――――</option>

                          <option value="FE">FE</option>
                          <option value="SE">SE</option>
                          <option value="TE">TE</option>
                          <option value="BE">BE</option>
                        </select>
                      </div>
                      <div className="col-sm-6">
                        Division:
                        <input
                          readOnly
                          type="number"
                          name="div"
                          id="div"
                          min="1"
                          max="11"
                          placeholder={this.state.data.currentClass.div}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-12">
                        Email Id:
                        <input
                          readOnly
                          type="email"
                          name="emailId"
                          id="emailId"
                          placeholder={this.state.data.emailId}
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
                    <button
                      type="submit"
                      className="btn btn-dark"
                      id="updateBtn"
                      disabled
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
  }),
  { updateStudent, getStudent }
)(StudentProfile);
