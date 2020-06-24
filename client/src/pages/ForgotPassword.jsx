import React, { Component } from "react";

class ForgotPassword extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="container">
          <form>
            <div className="row">
              <div className="col-sm-6 offset-3">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 offset-3">
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  className="form-control"
                />
              </div>
            </div>
            <button className="btn btn-dark">Reset Password</button>
          </form>
        </div>
      </>
    );
  }
}

export default ForgotPassword;
