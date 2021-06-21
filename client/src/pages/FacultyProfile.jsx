import React, { Component } from "react";
import Sidenav_f from "../components/SideNav_f";
import { getFacultyProfile } from "../store/actions/faculty";
import { updateFaculty } from "../store/actions/faculty";
import { connect } from "react-redux";
class FacultyProfile extends Component {
  state = {
    isLoading: true,
    data: {
      name: {
        firstname: "Sahil",
        lastname: "Patil",
      },
      currentClass: {
        year: "TE",
        div: "2",
      },
      designation: "Class Coordinator",
      department: "example@gmail.com",
    },
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const { getFacultyProfile } = this.props;
    getFacultyProfile()
      .then(console.log(this.props))
      .then(this.setState({ isLoading: false }))
      .then(() => this.loadData(this.props.faculty));
  }
  loadData(user) {
    if (user.designation !== undefined) this.setState({ data: user });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { updateFaculty } = this.props;
    var formData = new FormData(event.target);
    const updatedata = {};
    updatedata["firstname"] =
      formData.get("firstname") || this.state.data.name.firstname;
    updatedata["lastname"] =
      formData.get("lastname") || this.state.data.name.lastname;
    updatedata["year"] =
      formData.get("year") || this.state.data.currentClass.year;
    updatedata["div"] = formData.get("div") || this.state.data.currentClass.div;
    updatedata["department"] =
      formData.get("department") || this.state.data.department;
    updatedata["designation"] =
      formData.get("designation") || this.state.data.designation;
    updatedata["username"] =
      formData.get("username") || this.state.data.username;
    updatedata["emailId"] = formData.get("emailId") || this.state.data.emailId;

    updateFaculty(this.state.data._id, updatedata);
    window.location.reload(false);
  }
  editform() {
    var form = document.getElementById("form");
    var elements = form.elements;
    for (var i = 0, len = elements.length - 3; i < len; ++i) {
      elements[i].readOnly = !elements[i].readOnly;
    }
    elements[elements.length - 4].disabled =
      !elements[elements.length - 4].disabled;

    var updateButton = document.getElementById("updateBtn");
    updateButton.disabled = !updateButton.disabled;

    var editButton = document.getElementById("editButton");
    editButton.classList.toggle("btn-danger");
    editButton.innerHTML = editButton.innerHTML === "Edit" ? "Cancel" : "Edit";
  }
  render() {
    let dropdownOptions = [
      "Class Coordinator",
      "Department Internship Coordinator",
      "College Internship Coordinator",
      "Admin",
      "Principal",
    ];
    let options = dropdownOptions.map((o) => {
      return (
        <option
          value={o.replace(" ", "").replace(" ", "")}
          selected={
            o.replace(" ", "").replace(" ", "") === this.state.data.designation
              ? "selected"
              : ""
          }
        >
          {o}
        </option>
      );
    });
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Sidenav_f activeComponent="1" />
          </div>
          <div className="col-sm-10 of">
            <div className="container-fluid">
              <h4 className="mt-2">My Profile</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  Fill in the details:
                  <hr />
                  <div className="container-fluid">
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Firstname:
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
                        Lastname:
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
                        Current Class Year:
                        <input
                          readOnly
                          type="number"
                          className="form-control"
                          id="year"
                          name="year"
                          placeholder={this.state.data.currentClass.year}
                        />
                      </div>
                      <div className="col-sm-6">
                        Current Class Division
                        <div className="input-group">
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

                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        emailId:
                        <div className="input-group">
                          <input
                            readOnly
                            type="text"
                            name="emailId"
                            id="emailId"
                            placeholder={this.state.data.emailId}
                            className="form-control"
                          />
                        </div>
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
                      <div className="col-sm-6">
                        Username:
                        <input
                          readOnly
                          type="text"
                          name="username"
                          id="username"
                          placeholder={this.state.data.username}
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Designation:
                        <select
                          disabled
                          id="designation"
                          name="designation"
                          className="form-control"
                        >
                          {options}
                        </select>
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
    faculty: store.get_Faculty_Profile,
  }),
  { getFacultyProfile, updateFaculty }
)(FacultyProfile);
