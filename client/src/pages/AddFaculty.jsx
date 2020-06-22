import React, { Component } from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import { createTeacher } from "../store/actions/admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorMessage from "../components/ErrorMessage";

class AddFaculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: null,
        name: {
          firstname: "s",
          lastname: "s",
        },
        currentClass: {
          year: "s",
          div: "s",
        },
        department: "s",
        designation: "s",
        emailId: "srush@gmail.com",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { createTeacher } = this.props;
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
    data["department"] =
      formData.get("department") || this.state.data.department;
    data["designation"] =
      formData.get("designation") || this.state.data.designation;
    data["username"] = formData.get("username") || this.state.data.username;
    data["password"] = formData.get("password") || this.state.data.password;
    data["emailId"] = formData.get("emailId") || this.state.data.emailId;

    createTeacher(data)
      .then(console.log(this.props))
      // .catch(toast('Cannot update! Try again later.'));
      // alert("Faculty Added!");
    // window.location.reload(false);
  }
  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Admin_Sidenav activeComponent="3" />
          </div>
          <div className="col-sm-10 of">
            <div className="container">
              <h4 className="mt-2">Add New Faculty</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  Fill in the details:
                  <span>
                    <ErrorMessage />
                  </span>
                  <hr />
                  <div className="container">
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        First Name:
                        <input
                          required
                          type="text"
                          name="firstname"
                          id="firstname"
                          className="form-control"
                          placeholder="eg. John"
                        />
                      </div>
                      <div className="col-sm-6">
                        Last Name:
                        <input
                          required
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder="eg. Doe"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Designation:
                        <select
                          id="designation"
                          name="designation"
                          className="form-control"
                        >
                          <option value="ClassCoordinator">
                            Class Coordinator
                          </option>
                          <option value="DepartmentIntershipCoordinator">
                            Department Internship Coordinator
                          </option>
                          <option value="CollegeInternshipCoordinator">
                            College Internship Coordinator
                          </option>
                          <option value="Principal">Principal</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                      <div className="col-sm-6">
                        Department:
                        <div className="input-group">
                          <div className="input-group">
                            <input
                              required
                              type="text"
                              name="department"
                              id="department"
                              placeholder="eg. Computer"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Year:
                        <input
                          required
                          type="text"
                          name="year"
                          id="year"
                          placeholder="eg. TE"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Division:
                        <input
                          required
                          type="number"
                          name="div"
                          id="div"
                          placeholder="eg. 2"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Username:{" "}
                        <small className="text-info">(Should be unique)</small>
                        <input
                          required
                          type="text"
                          name="username"
                          id="username"
                          placeholder="Enter Username"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Password:{" "}
                        <small className="text-info">(Default password)</small>
                        <input
                          required
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter Password"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-12">
                        Email Id:
                        <input
                          required
                          type="email"
                          name="emailId"
                          id="emailId"
                          placeholder="example@gmail.com"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="text-right">
                    <button className="btn border-dark mx-2" type="reset">
                      Reset
                    </button>
                    <button type="submit" className="btn btn-dark">
                      Add Profile
                    </button>
                  </div>
                </form>
              }
              <ToastContainer />
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
    faculty: store.faculty,
  }),
  { createTeacher }
)(AddFaculty);
