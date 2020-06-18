import React, { Component, useState } from "react";
// import { showProfile } from "../store/actions";
import { connect } from "react-redux";
import Admin_Sidenav from "../components/Admin_Sidenav";
import {
    getAdmin,
    resetPassword
} from "../store/actions/admin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AdminSetting extends Component {
  state = {
    isLoading: true,
    data: {
      _id:null,
      name: {
        firstname: "s",
        lastname: "s",
      },
      department: "s",
      designation: "s",
      emailId: "srush@gmail.com",
      username:'srush',
    },
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
   }
  async componentDidMount() {    
    const {
      getAdmin
    } = this.props;
    getAdmin()
    .then(this.setState({ isLoading: false }))
    .then(() => this.loadData(this.props.admin));
   }
  loadData(user) {
    this.setState({ data: user });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { resetPassword } = this.props;
    var formData = new FormData(event.target);
    const updatedata = {};
    // updatedata["name"] = {
    //   firstname: formData.get("firstname") || this.state.data.name.firstname,
    //   lastname: formData.get("lastname") || this.state.data.name.lastname,
    // };
    updatedata["oldpassword"] = formData.get("oldpassword") || this.state.data.password;
    updatedata["newpassword"] = formData.get("newpassword");
    updatedata["newpasswordC"] = formData.get("newpasswordC");
    
    if(updatedata.newpassword!==updatedata.newpasswordC){
        toast("Passwords don't match!!");
    }else{
        resetPassword(this.state.data._id,updatedata)
        .then(console.log(this.props.admin))
        .then(toast("Password Changed!"));
        window.location.reload(false);
    }
   
  }


  render() {
    console.log(this.state.data)
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2">
            <Admin_Sidenav activeComponent="5" />
          </div>
          <div className="col-sm-10">
            <div className="container">
              <h4 className="mt-2">Change Password</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  <div className="container">
                  <div className="form-row my-2">
                  <div className="col-sm-6">
                    Old Password:
                    <input
                      type="password"
                      name="oldpassword"
                      id="oldpassword"
                      className="form-control"
                      placeholder="Enter Old Password"
                    />
                  </div>
                </div>                  
                <div className="form-row my-2">
                <div className="col-sm-6">
                New Password:
                <input
                  type="password"
                  name="newpassword"
                  id="newpassword"
                  placeholder="Enter New Password"
                  className="form-control"
                />
                </div>
                <div className="col-sm-6">
                Confirm Password:
                  <input
                    type="password"
                    name="newpasswordC"
                    id="newpasswordC"
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
    admin:store.currentAdmin,
  }),
  {
    getAdmin,
    resetPassword
  }
)(AdminSetting);
