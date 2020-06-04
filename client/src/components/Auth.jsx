import React,{Component} from 'react';
import {connect} from 'react-redux';

import {authUser,logout,authUser_f,logout_f,authUser_a} from '../store/actions';
//import { Redirect } from 'react-router-dom';
class Auth extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            User_type:'1'
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

handleChange(e){
this.setState({[e.target.name]: e.target.value});
//console.log(this.state.User_type);
}

import {
  authUser,
  logout,
  authUser_f,
  logout_f,
  authUser_a,
} from "../store/actions";
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
    console.log(username, password);
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
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form-label" htmlFor="username">
            username
          </label>
          <input
            className="input"
            type="text"
            value={username}
            name="username"
            autoComplete="off"
            onChange={this.handleChange}
          />

          <label className="form-label" htmlFor="password">
            password
          </label>
          <input
            className="input"
            type="password"
            value={password}
            name="password"
            autoComplete="off"
            onChange={this.handleChange}
          />

          <select
            name="User_type"
            defaultValue="1"
            onChange={this.handleChange}
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

          <div className="button_center">
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
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
