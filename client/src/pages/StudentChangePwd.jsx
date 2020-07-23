import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getStudent,
  resetStudentPassword,
  removeSuccess,
} from "../store/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import SideNav from "../components/Sidenav";
class ChangePassword extends Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.handleconfirmPassword = this.handleconfirmPassword.bind(this);
  }
  async componentDidMount() {
    const { getStudent } = this.props;
    getStudent()
      .then(this.setState({ isLoading: false }))
      .then(() => this.loadData(this.props.auth.user));
  }
  componentWillUnmount() {
    const { removeSuccess } = this.props;
    removeSuccess();
  }
  loadData(user) {
    this.setState({ data: user });    
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newpassword === this.state.confirmPassword) {
      const { resetStudentPassword } = this.props;
      var formData = new FormData(event.target);
      const updatedata = {};
      updatedata["oldpassword"] =
        formData.get("oldpassword") || this.state.data.password;
      updatedata["newpassword"] = formData.get("newpassword");
      updatedata["newpasswordC"] = formData.get("newpasswordC");
      resetStudentPassword(this.state.data._id, updatedata).then();
    }
  }

  handleconfirmPassword(e) {
    this.setState({ [e.target.name]: e.target.value });
       

    if (this.state.newpassword !== e.target.value) {
      this.setState({ message: "Passwords do not match!" });
    } else {
      this.setState({ message: "" });
    }
    this.setState({ confirmPassword: e.target.value });
  }
  render() {    
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <SideNav activeComponent="6" />
          </div>
          <div className="col-sm-10">
            <div className="container-fluid mt-2">
              {this.state.errMessage && (
                <div className="alert alert-danger">
                  {this.state.errMessage}
                </div>
              )}
              <h4>Change Password</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  <div className="container-fluid">
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Old Password:
                        <input
                          required
                          type="password"
                          name="oldpassword"
                          id="oldpassword"
                          className="form-control"
                          placeholder="Enter Old Password"
                        />
                      </div>
                      <div className="col-sm-6 mt-4">
                        <ErrorMessage />
                        <SuccessMessage />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        New Password:
                        <input
                          required
                          type="password"
                          name="newpassword"
                          id="newpassword"
                          onChange={this.handleChange}
                          placeholder="Enter New Password"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Confirm Password:
                        <span className="float-right">
                          <small className="text-danger">
                            {this.state.message}
                          </small>
                        </span>
                        <input
                          required
                          type="password"
                          name="newpasswordC"
                          id="newpasswordC"
                          onChange={this.handleconfirmPassword}
                          placeholder="Confirm Password"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="text-right">
                    <button
                      type="submit"
                      id="submitButton"
                      className="btn btn-secondary"
                    >
                      Save
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
  }),
  {
    getStudent,
    resetStudentPassword,
    removeSuccess,
  }
)(ChangePassword);
