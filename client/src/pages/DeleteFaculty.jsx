import React, { Component } from "react";
import { connect } from "react-redux";
import Admin_Sidenav from "../components/Admin_Sidenav";
import {
  deleteTeacher,
  getCurrentTeacher,
  removeSuccess,
} from "../store/actions";
import { Card, CardTitle, Button, CardBody } from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessMessage from "../components/SuccessMessage";
class DeleteFaulty extends Component {
  state = {
    showMessage: false,
    errMessage: "",
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
      applicationsReceived: [],
      applicationsApproved: [],
      currentClass: {
        year: "TE",
        div: 2,
      },
      username: "srushti",
    },
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillUnmount() {
    const { removeSuccess } = this.props;
    removeSuccess();
  }
  handleSubmit(event) {
    event.preventDefault();
    const { getCurrentTeacher } = this.props;
    var formData = new FormData(event.target);
    const username = formData.get("username") || null;
    getCurrentTeacher(username).then(() => this.loadData(this.props.teacher));
  }

  loadData(user) {
    if (
      user.department !== undefined &&
      this.state.data !== user &&
      this.state.username !== user.username
    ) {
      this.setState({ data: user, showMessage: true, errMessage: "" });
    } else {
      this.setState({
        showMessage: false,
        errMessage: "Username does not exist.",
      });
    }
  }
  handleClick(username) {
    if (
      window.confirm("Are you sure you want to delete this faculty member?")
    ) {
      const { deleteTeacher } = this.props;
      deleteTeacher(username).then(this.setState({ showMessage: false }));
    }
  }

  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Admin_Sidenav activeComponent="5" />
          </div>
          <div className="col-sm-10">
            <div className="container-fluid mt-2">
              <h4>Delete faculty</h4>
              <hr />
              {
                <div>
                  Enter username of faculty member to delete :
                  <form id="form" onSubmit={this.handleSubmit}>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
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
                        <button
                          type="submit"
                          className="btn btn-dark btn-sm mx-2"
                          name="getinfo"
                        >
                          Get Information
                        </button>
                      </div>
                    </div>
                  </form>
                  <hr />
                  <div>
                    {this.state.errMessage && (
                      <div className="alert alert-danger mx-3">
                        {this.state.errMessage}
                      </div>
                    )}

                    <SuccessMessage />
                    {this.state.showMessage && (
                      <div>
                        <Card>
                          <CardBody>
                            <CardTitle>
                              <h4>{this.state.data.username}</h4>
                              <small className="text-muted">
                                {this.state.data._id}
                              </small>
                            </CardTitle>
                            <hr />
                            <table className="table table-hover table-sm table-striped">
                              <tbody>
                                <tr>
                                  <td>Name</td>
                                  <td>
                                    {this.state.data.name.firstname +
                                      " " +
                                      this.state.data.name.lastname}
                                  </td>
                                </tr>

                                <tr>
                                  <td>Class</td>
                                  <td>
                                    {this.state.data.currentClass.year +
                                      " " +
                                      this.state.data.currentClass.div}
                                  </td>
                                </tr>

                                <tr>
                                  <td>Department</td>
                                  <td>{this.state.data.department}</td>
                                </tr>

                                <tr>
                                  <td>Designation</td>
                                  <td>{this.state.data.designation}</td>
                                </tr>

                                <tr>
                                  <td>Email Id</td>
                                  <td>{this.state.data.emailId}</td>
                                </tr>
                                <tr>
                                  <td>Applications Handled</td>
                                  <td>
                                    {
                                      this.state.data.applicationsApproved
                                        .length
                                    }
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="text-right">
                              <Button
                                className="btn btn-danger btn-sm mx-2"
                                onClick={() =>
                                  this.handleClick(this.state.data.username)
                                }
                                name="deletebtn"
                              >
                                Delete
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
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
    teacher: store.currentTeacher,
  }),
  {
    deleteTeacher,
    getCurrentTeacher,
    removeSuccess,
  }
)(DeleteFaulty);
