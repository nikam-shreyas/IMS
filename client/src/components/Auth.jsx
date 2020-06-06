import React, { Component } from "react";
import { connect } from "react-redux";
//import Auth_Page from '../pages/Auth_Page';
import {
  authUser,
  logout,
  authUser_f,
  logout_f,
  authUser_a,
} from "../store/actions";
//import { Redirect } from 'react-router-dom';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      User_type: "1",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state.User_type);
  }

  handleSubmit(e) {
    const { username, password, User_type } = this.state;
    const { authType } = this.props;
    e.preventDefault();
    if (User_type === "1") {
      this.props.authUser(authType || "login", { username, password });
    }
    if (User_type === "2") {
      this.props.authUser_f("login_faculty", { username, password });
    }
    if (User_type === "3") {
      this.props.authUser_a("login_admin", { username, password });
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="container">
        <div className="card mx-auto my-5 bg-light">
          <div className="card-header">Login...</div>
          <form className="form-group mx-3 my-3" onSubmit={this.handleSubmit}>
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="input"
              type="text"
              value={username}
              name="username"
              autoComplete="off"
              className="form-control"
              onChange={this.handleChange}
            />

            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type="password"
              value={password}
              name="password"
              className="form-control"
              autoComplete="off"
              onChange={this.handleChange}
            />

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Role:</label>
              <select
                name="User_type"
                defaultValue="1"
                onChange={this.handleChange}
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option name="student" value="1">
                  STUDENT
                </option>
                <option name="faculty" value="2">
                  FACULTY
                </option>
                <option name="admin" value="3">
                  ADMIN
                </option>
              </select>
            </div>
            {/* <Auth_Page User_type={this.state.User_type}/> */}

            <div className="button_center">
              <button className="btn btn-dark" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {
  authUser,
  logout,
  authUser_f,
  logout_f,
  authUser_a,
})(Auth);
