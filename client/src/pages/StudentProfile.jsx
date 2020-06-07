import React, { Component } from "react";
import Sidenav from "../components/Sidenav";
import { updateStudent } from "../store/actions";
import { connect } from "react-redux";
class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { updateStudent } = this.props;
    var formData = new FormData(event.target);
    const data = {};
    data["name"] = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
    };
    data["class"] = { year: formData.get("year"), div: formData.get("div") };
    data["prevSemAttendance"] = formData.get("prevSemAttendance");
    data["rollNo"] = formData.get("rollNo");
    console.log(data);
    updateStudent(data);
    alert("Profile Updated!");
  }
  state = {};
  render() {
    return (
      <>
        <div className="row no-gutters">
          <div className="col-sm-2">
            <Sidenav activeComponent="2" />
          </div>
          <div className="col-sm-10">
            <div className="container">
              <h4>My Profile</h4>
              <hr />
              <form onSubmit={this.handleSubmit}>
                Personal Details:
                <hr />
                <div className="container">
                  <div className="form-row my-2">
                    <div className="col-sm-6">
                      First Name:
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="form-control"
                        placeholder="Shreyas"
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      Last Name:
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Nikam"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row my-2">
                    <div className="col-sm-6">
                      Roll No:
                      <input
                        type="number"
                        className="form-control"
                        id="rollNo"
                        name="rollNo"
                        placeholder="31241"
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      Attendance:
                      <div className="input-group">
                        <div className="input-group">
                          <input
                            type="number"
                            name="prevSemAttendance"
                            id="prevSemAttendance"
                            placeholder=">75"
                            className="form-control"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-row my-2">
                    <div className="col-sm-6">
                      Year:
                      <input
                        type="text"
                        name="year"
                        id="year"
                        placeholder="TE"
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-6">
                      Division:
                      <input
                        type="number"
                        name="div"
                        id="div"
                        placeholder="1"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="text-right">
                  <button className="btn border-dark mx-2" type="reset">
                    Reset
                  </button>
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </div>
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
  { updateStudent }
)(StudentProfile);
