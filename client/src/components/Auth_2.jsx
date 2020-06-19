import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser, logout } from "../store/actions";
class Auth_2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const { username, password } = this.state;
    const { authType } = this.props;
    e.preventDefault();
    this.props.authUser(authType || "login", { username, password });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="container">
        <div className="card mx-auto my-5 bg-light">
          <div className="card-body">
            <h2 className="card-title">Register as a student.</h2>
            <form className="form-group my-3" onSubmit={this.handleSubmit}>
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                value={username}
                name="username"
                className="form-control"
                autoComplete="off"
                onChange={this.handleChange}
              />

              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                value={password}
                name="password"
                className="form-control"
                autoComplete="off"
                onChange={this.handleChange}
              />



            {/* <label className="form-label" htmlFor="Email">
                Email
              </label>
              <input
                type="text"
                value={emailId}
                name="emailId"
                className="form-control"
                autoComplete="off"
                onChange={this.handleChange}
              /> */}




              <div className="button_center">
                <button className="btn btn-dark mx-auto mt-3" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth_2);