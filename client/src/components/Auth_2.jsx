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
      // <div className="container">
      //   <div className="card mx-auto my-5">
      //     <div className="card-body">
      //       <h2 className="card-title">Register as a student.</h2>
      //       <form className="form-group my-3" onSubmit={this.handleSubmit}>
      //         <label className="form-label" htmlFor="username">
      //           Username
      //         </label>
      //         <input
      //           type="text"
      //           value={username}
      //           name="username"
      //           className="form-control"
      //           autoComplete="off"
      //           onChange={this.handleChange}
      //         />
      //         <label className="form-label" htmlFor="email">
      //           Email ID
      //         </label>
      //         <input
      //           type="email"
      //           value={emailId}
      //           name="emailId"
      //           className="form-control"
      //           autoComplete="off"
      //           onChange={this.handleChange}
      //         />

      //         <label className="form-label" htmlFor="password">
      //           Password
      //         </label>
      //         <input
      //           type="password"
      //           value={password}
      //           name="password"
      //           className="form-control"
      //           autoComplete="off"
      //           onChange={this.handleChange}
      //         />

      //         <label className="form-label" htmlFor="confirmpassword">
      //           Confirm Password
      //         </label>
      //         <input
      //           type="password"
      //           value={confirmpassword}
      //           name="confirmpassword"
      //           className="form-control"
      //           autoComplete="off"
      //           onChange={this.handleConfirmPassword}
      //         />
      //         {this.state.message != "" && (
      //           <small className="text-danger">{this.state.message}</small>
      //         )}
      //         <div className="button_center">
      //           <button className="btn btn-dark mx-auto mt-3" type="submit">
      //             Submit
      //           </button>
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // </div>
      
      <div class= "section">
      
      <div class="container">
          <div class="user signinBx">
            <div class="imgBx"><img src={image}/></div>
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
                placeholder ="Email ID"
                className="form-control"
                autoComplete="off"
                onChange={this.handleChange}
                />
                
                <input
                type="password"
                value={password}
                name="password"
                placeholder= "Password"
                className="form-control"
                autoComplete="off"
                onChange={this.handleChange}
                />

                <input
                type="password"
                value={confirmpassword}
                name="confirmpassword"
                placeholder = "Re-confirm Password"
                className="form-control"
                autoComplete="off"
                onChange={this.handleConfirmPassword}
                />
                

                <input type="submit" value="Register"/>
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
