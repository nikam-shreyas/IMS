import React, { Component } from "react";
import { connect } from "react-redux";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { getAdmin, updateAdmin } from "../store/actions/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AdminProfile extends Component {
  state = {
    isLoading: true,
    data: {
      _id: null,
      name: {
        firstname: "s",
        lastname: "s",
      },
      department: "s",
      designation: "s",
      emailId: "srush@gmail.com",
      username: "srush",
    },
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const { getAdmin } = this.props;
    getAdmin()
      .then(this.setState({ isLoading: false }))
      .then(() => this.loadData(this.props.admin));
  }
  loadData(user) {
    this.setState({ data: user });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { updateAdmin } = this.props;
    var formData = new FormData(event.target);
    const updatedata = {};

    updatedata["firstname"] =
      formData.get("firstname") || this.state.data.name.firstname;
    updatedata["lastname"] =
      formData.get("lastname") || this.state.data.name.lastname;
    updatedata["department"] =
      formData.get("department") || this.state.data.department;
    updatedata["designation"] =
      formData.get("designation") || this.state.data.designation;
    updatedata["emailId"] = formData.get("emailId") || this.state.data.emailId;
    updateAdmin(this.state.data._id, updatedata);
    window.location.reload(false);
  }

  editform() {
    var form = document.getElementById("form");
    var select = document.getElementById("designation");
    select.disabled = !select.disabled;
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = !elements[i].readOnly;
    }
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
            <Admin_Sidenav activeComponent="1" />
          </div>
          <div className="col-sm-10">
            <div className="container-fluid mt-2">
              <h4>My Profile</h4>
              <div className="text-muted">
                Username: {this.state.data.username}
              </div>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  <div className="alert alert-info">
                    Click <strong>Edit</strong> to fill in the details and{" "}
                    <strong>Update</strong> the information :
                  </div>
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
                        Designation:
                        <select
                          id="designation"
                          defaultValue="Admin"
                          name="designation"
                          className="form-control"
                          disabled
                        >
                          <option value="ClassCoordinator">
                            Class Coordinator
                          </option>
                          <option value="DepartmentIntershipCoordinator">
                            Department Intership Coordinator
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
                        <input
                          readOnly
                          type="text"
                          name="department"
                          id="department"
                          placeholder={this.state.data.department}
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
    admin: store.currentAdmin,
  }),
  {
    getAdmin,
    updateAdmin,
  }
)(AdminProfile);
