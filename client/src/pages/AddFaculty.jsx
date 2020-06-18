import React,{Component} from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import {createTeacher} from '../store/actions/admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddFaculty extends Component{
constructor(props){
super(props);
this.state={
  data: {
    _id:null,
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
}

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
    data["department"] = formData.get("department") || this.state.data.department;
    data["designation"] = formData.get("designation") || this.state.data.designation;
    data["username"] = formData.get("username") || this.state.data.username;
    data["password"] = formData.get("password") || this.state.data.password;
    data["emailId"] = formData.get("emailId") || this.state.data.emailId;
    console.log(data);
    createTeacher(data).then( toast("Faculty Added!"));
    // alert("Faculty Added!");
    window.location.reload(false);
  }
render(){
    return (
        <div>
            <div className="row no-gutters">
                <div className="col-sm-2">
                    <Admin_Sidenav activeComponent="3" />
                </div>
                <div className="col-sm-10">
            <div className="container">
              <h4 className="mt-2">Add New Faculty</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  Fill in the details:
                  <hr />
                  <div className="container">
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        First Name:
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          className="form-control"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="col-sm-6">
                        Last Name:
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder="Enter last name"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                       Designation:
                       <select id="designation" name="designation" className="form-control">
                        <option value="ClassCoordinator">Class Coordinator</option>
                        <option value="DepartmentIntershipCoordinator">Department Intership Coordinator</option>
                        <option value="CollegeInternshipCoordinator">College Internship Coordinator</option>
                        <option value="Principal">Principal</option>
                        <option value="Admin">Admin</option>
                      </select>
                      </div>
                      <div className="col-sm-6">
                        Department:
                        <div className="input-group">
                          <div className="input-group">
                            <input
                              type="text"
                              name="department"
                              id="department"
                              placeholder="Enter department"
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
                          type="text"
                          name="year"
                          id="year"
                          placeholder="Enter year"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Division:
                        <input
                          type="number"
                          name="div"
                          id="div"
                          placeholder="Enter division"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                       Username: <h6>(Should be unique)</h6>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          placeholder="Enter Username"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Password: <h6>(Default password)</h6>
                        <input
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
                          type="email"
                          name="emailId"
                          id="emailId"
                          placeholder="Enter email"
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

export default connect ((store)=>({
    auth:store.auth,
    faculty:store.faculty
    }),{createTeacher})(AddFaculty);