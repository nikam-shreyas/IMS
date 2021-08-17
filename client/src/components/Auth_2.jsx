import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser, logout } from "../store/actions";
import { Link } from "react-router-dom";
import { MdError } from "react-icons/md";
import ErrorMessage from "../components/ErrorMessage";

class Auth_2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      emailId: "",
      confirmpassword: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    var str = this.state.username;
    var str1 = str.substring(0, 3);
    if (this.state.password === this.state.confirmpassword) {
      if (
        str1 === "C2K" ||
        str1 === "I2K" ||
        (str1 === "E2K" && str.length === 11)
      ) {
        const { username, password, emailId } = this.state;
        const { authType } = this.props;
        e.preventDefault();
        this.props.authUser(authType || "login", {
          username,
          password,
          emailId,
        });
      } else {
        alert("Invalid ID, Please check again ");
      }
    } else {
      alert("Error! Check form fields again... ");
    }
  }
  handleConfirmPassword(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.password !== e.target.value) {
      this.setState({ message: "Passwords do not match!" });
    } else {
      this.setState({ message: "" });
    }
  }

  render() {
    const { username, password, emailId, confirmpassword } = this.state;
    return (
      <div className="section">
        <div className="container">
          <div className="user signinBx">
            <div className="imgBx">
              <p>Internship Management System</p>
            </div>
            <div className="formBx">
              <form onSubmit={this.handleSubmit}>
                <div className="Errorbox">
                  <div className="my-4 text-center" style={{ zIndex: "10" }}>
                    <ErrorMessage />
                  </div>
                </div>
                <h2>Student Registration</h2>
                <input
                  required
                  type="text"
                  value={username}
                  name="username"
                  placeholder="Registration ID (eg: C2K...)"
                  className="form-control"
                  minLength="11"
                  maxLength="11"
                  autoComplete="off"
                  onChange={this.handleChange}
                />

                <input
                  required
                  type="email"
                  value={emailId}
                  name="emailId"
                  placeholder="Email ID"
                  className="form-control"
                  autoComplete="off"
                  onChange={this.handleChange}
                />

                <input
                  required
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  autoComplete="off"
                  onChange={this.handleChange}
                />

                <input
                  required
                  type="password"
                  value={confirmpassword}
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  className="form-control"
                  autoComplete="off"
                  onChange={this.handleConfirmPassword}
                />
                {this.state.message && (
                  <small className="text-danger">
                    <span className="mr-1">
                      <MdError
                        style={{ margin: -2, padding: -2 }}
                        color="crimson"
                      />
                    </span>
                    {this.state.message}
                  </small>
                )}
                <div className="text-center">
                  <Link className="btn-custom mr-2" to="/login">
                    <b>Login</b>
                  </Link>
                  <input type="submit" value="Register" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth_2);
