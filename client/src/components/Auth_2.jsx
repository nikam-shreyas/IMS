import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser, logout } from "../store/actions";
import image from "./assets/Pictlogo.jpeg";
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
    if (this.state.password == this.state.confirmpassword) {
      const { username, password, emailId } = this.state;
      const { authType } = this.props;
      e.preventDefault();
      this.props.authUser(authType || "login", { username, password, emailId });
    } else {
      alert("Error! Check form fields again...");
    }
  }
  handleConfirmPassword(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.password != e.target.value) {
      this.setState({ message: "Passwords do not match!" });
    } else {
      this.setState({ message: "" });
    }
  }

  render() {
    const { username, password, emailId, confirmpassword } = this.state;
    return (
      <div class="section">
        <div class="container-fluid">
          <div class="user signinBx">
            <div class="imgBx">
              <img src={image} />
            </div>
            <div class="formBx">
              <form onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <input
                  type="text"
                  value={username}
                  name="username"
                  placeholder="Username"
                  className="form-control"
                  autoComplete="off"
                  onChange={this.handleChange}
                />

                <input
                  type="email"
                  value={emailId}
                  name="emailId"
                  placeholder="Email ID"
                  className="form-control"
                  autoComplete="off"
                  onChange={this.handleChange}
                />

                <input
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  autoComplete="off"
                  onChange={this.handleChange}
                />

                <input
                  type="password"
                  value={confirmpassword}
                  name="confirmpassword"
                  placeholder="Re-confirm Password"
                  className="form-control"
                  autoComplete="off"
                  onChange={this.handleConfirmPassword}
                />

                <input type="submit" value="Register" />
                {/* <p class="signup"><a href="#ForgotPassword">Forgot password?</a></p> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth_2);
