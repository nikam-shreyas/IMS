import React, { Component } from "react";
import Sidenav_f from "../components/SideNav_f";
import { updateStudent, getStudent } from "../store/actions";
import {getFacultyProfile} from "../store/actions/faculty"
import { connect } from "react-redux";
class FacultyProfile extends Component {
  state = {
    isLoading: true,
    data: {
      designation: "3129",
      username: ">75",
      department: "example@gmail.com",
      created:"",
    },
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const { getFacultyProfile } = this.props;
    getFacultyProfile()
      .then(this.setState({ isLoading: false }))
      .then(() => this.loadData(this.props.auth.user));
  }
  loadData(user) {
    if (user.designation !== undefined) this.setState({ data: user });
  }
  handleSubmit(event) {
    // event.preventDefault();
    // const { updateStudent } = this.props;
    // var formData = new FormData(event.target);
    // const data = {};
    // data["name"] = {
    //   firstname: formData.get("firstname") || this.state.data.name.firstname,
    //   lastname: formData.get("lastname") || this.state.data.name.lastname,
    // };
    // data["currentClass"] = {
    //   year: formData.get("year") || this.state.data.currentClass.year,
    //   div: formData.get("div") || this.state.data.currentClass.div,
    // };
    // data["prevSemAttendance"] =
    //   formData.get("prevSemAttendance") || this.state.data.prevSemAttendance;
    // data["rollNo"] = formData.get("rollNo") || this.state.data.rollNo;
    // data["emailId"] = formData.get("emailId") || this.state.data.emailId;
    // updateStudent(data);
    // alert("Profile Updated!");
    // window.location.reload(false);
  }
  editform() {
    // var form = document.getElementById("form");
    // var elements = form.elements;
    // for (var i = 0, len = elements.length; i < len; ++i) {
    //   elements[i].readOnly = !elements[i].readOnly;
    // }
    // var editButton = document.getElementById("editButton");
    // editButton.classList.toggle("btn-danger");
    // editButton.innerHTML = editButton.innerHTML === "Edit" ? "Cancel" : "Edit";
  }
  render() {
    console.log("im in faculty "+this.props.faculty.department);
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2">
            <Sidenav_f activeComponent="2" />
          </div>
          <div className="col-sm-10">
            <div className="container">
              <h4 className="mt-2">My Profile</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  Fill in the details:
                  <hr />
                  <div className="container">
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        UserName
                        <input
                          readOnly
                          type="text"
                          name="firstname"
                          id="firstname"
                          className="form-control"
                          placeholder={this.props.faculty.username}
                        />
                      </div>
                      <div className="col-sm-6">
                        Designation
                        <input
                          readOnly
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder={this.props.faculty.designation}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        ID:
                        <input
                          readOnly
                          type="number"
                          className="form-control"
                          id="rollNo"
                          name="rollNo"
                          placeholder={this.props.faculty._id}
                        />
                      </div>
                      <div className="col-sm-6">
                       Department:
                        <div className="input-group">
                          <div className="input-group">
                            <input
                              readOnly
                              type="number"
                              name="prevSemAttendance"
                              id="prevSemAttendance"
                              placeholder={this.props.faculty.department}
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
                        Username:
                        <input
                          readOnly
                          type="text"
                          name="year"
                          id="year"
                          placeholder={this.state.data.department}
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                      Email Id:
                        <input
                          readOnly
                          type="number"
                          name="div"
                          id="div"
                          placeholder={this.state.data.department}
                          className="form-control"
                        />
                      </div>
                    </div>
                    {/* <div className="form-row my-2">
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
                    </div> */}
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
      </div>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    faculty: store.get_Faculty_Profile,
  }),
  { getFacultyProfile }
)(FacultyProfile);