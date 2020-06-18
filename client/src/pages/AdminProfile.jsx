import React, { Component, useState } from "react";
// import { showProfile } from "../store/actions";
import { connect } from "react-redux";
import Admin_Sidenav from "../components/Admin_Sidenav";
import {
  getAdmin,
} from "../store/actions/admin";
class AdminProfile extends Component {
  state = {
    isLoading: true,
    data: {
      _id:null,
      name: {
        firstname: "Srushti",
        lastname: "Raybhoge",
      },
      department: "Computer",
      designation: "Admin",
      emailId: "srush@gmail.com",
    },
  };
  constructor(props) {
    super(props);
    //console.log(this.props);
    
    // const {
    //   getAdmin
    // } = this.props;

    
      // () => this.loadData(this.props.auth.user)
   }
  async componentDidMount() {
    
    const {
      getAdmin
    } = this.props;
    getAdmin()
    .then(this.setState({ isLoading: false }))
    .then(console.log("thisis props right here "+this.props))
    .then(() => this.loadData(this.props.auth.user));
    // console.log(this.props);
    // getAdmin()
    console.log("fello"+this.props);
    //   .then(this.setState({ isLoading: false }))
    //   .then(() => this.loadData(this.props.auth.user));
    //   console.log(this.props);
    // this.handleSubmit = this.handleSubmit.bind(this);
   }
  loadData(user) {
    this.setState({ data: user });
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
    console.log("hi after this")
    console.log(this.props.admin.designation)
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2">
            <Admin_Sidenav activeComponent="1" />
          </div>
          <div className="col-sm-10">
            <div className="container">
              <h4 className="mt-2">My Profile</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  Click edit to fill in the details and update :
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
                          //value="sahil"
                           //placeholder={admin.department}
                        />
                      </div>
                      <div className="col-sm-6">
                        Last Name:
                        <input
                          readOnly
                          type="text"
                          name="lastname"
                          id="lastname"
                          // placeholder={this.state.data.lastname}
                          className="form-control"
                        />
                      </div>
                    </div>
                   <div className="form-row my-2">
                      <div className="col-sm-6">
                        Designation:
                        <input
                          readOnly
                          type="text"
                          name="designation"
                          id="designation"
                          placeholder={this.props.admin.designation}
                          className="form-control"
                        />
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
    admin: store.currentAdmin,
  }),

  {
    getAdmin,
  }
)(AdminProfile);

