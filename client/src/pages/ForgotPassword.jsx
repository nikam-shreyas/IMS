import React, { Component } from "react";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { Link } from "react-router-dom";
import { forgotPassword } from "../store/actions";
import { connect } from "react-redux";
class ForgotPassword extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    let data = {};
    data["username"] = formData.get("username");
    data["emailId"] = formData.get("emailId");
    data["role"] = formData.get("role");
    const { forgotPassword } = this.props;
    forgotPassword(data);
  }
  render() {
    return (
      <>
        <div className="container mt-5">
          <div className="text-center my-4">
            <ErrorMessage />
            <SuccessMessage />
          </div>
          <div className="card bg-dark text-white">
            <div className="card-title ml-4 mt-3">
              <h4>Forgot Password?</h4>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="form-control bg-dark text-white"
                />
                <br />
                <label htmlFor="email">Email ID:</label>
                <input
                  required
                  type="email"
                  name="emailId"
                  id="emailId"
                  className="form-control bg-dark text-white"
                />
                <br />
                <label>Role:</label>
                <div className="row">
                  <div className="col-sm-4">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text bg-dark">
                          <input
                            type="radio"
                            name="role"
                            className="bg-dark"
                            value="student"
                            required
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control bg-dark text-light"
                        placeholder="Student"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-dark">
                          <input
                            type="radio"
                            name="role"
                            value="faculty"
                            required
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control bg-dark text-light"
                        placeholder="Faculty"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text bg-dark">
                          <input
                            type="radio"
                            name="role"
                            value="admin"
                            required
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        class="form-control bg-dark text-light"
                        placeholder="Admin"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <br />
                <button type="submit" className="btn btn-primary float-right">
                  Submit
                </button>

                <Link
                  to="/login"
                  className="btn btn-secondary float-right mr-2"
                >
                  Back to login
                </Link>
              </form>
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
  { forgotPassword }
)(ForgotPassword);
