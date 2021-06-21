import React, { Component } from "react";
import { createNotice } from "../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class NoticeForm extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    let data = {};
    for (var [key, value] of formData.entries()) {
      data[key] = value;
    }
    const { createNotice } = this.props;
    createNotice(data).then(() => {
      this.props.history.push("/facultyNotices");
    });
  }
  render() {
    return (
      <>
        <h4 className="mt-2">New Internship Opportunity: </h4>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="form-row my-2">
            <div className="col-sm-12">
              Subject:
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Title..."
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="form-row my-2">
            <div className="col-sm-12">
              Description:
              <textarea
                name="description"
                id="description"
                rows="3"
                placeholder="Enter the description for the internship...."
                className="form-control"
                required
              ></textarea>
            </div>
          </div>
          <div className="form-row my-2">
            <div className="col-sm-4">
              Workplace:
              <input
                type="text"
                name="workplace"
                id="workplace"
                placeholder="Google"
                className="form-control"
              />
            </div>
            <div className="col-sm-4">
              Location:
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Work From Home"
                className="form-control"
              />
            </div>
            <div className="col-sm-4">
              Designation:
              <input
                type="text"
                name="designation"
                id="designation"
                placeholder="Software Developer"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row my-2">
            <div className="col-sm-12">
              Requirements:
              <input
                type="text"
                name="requirements"
                id="requirements"
                placeholder="Python, Tensorflow, ..."
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row my-2">
            <div className="col-sm-4">
              Domain:
              <input
                type="text"
                name="domain"
                id="domain"
                placeholder="Machine Learning"
                className="form-control"
              />
            </div>
            <div className="col-sm-3">
              Duration:
              <div className="input-group">
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  placeholder="1"
                  className="form-control"
                />
                <div className="input-group-append">
                  <span className="input-group-text">month(s)</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              Stipend:
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrependRs">
                    Rs.{" "}
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="stipend"
                  name="stipend"
                  placeholder="10000"
                  aria-describedby="inputGroupPrependRs"
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text">/month</span>
                </div>
              </div>
            </div>

            <div className="col-sm-2">
              Positions:
              <input
                type="number"
                name="positions"
                id="positions"
                placeholder="3"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row my-2"></div>
          <div className="form-row my-2">
            <div className="col-sm-4">
              Email:
              <input
                type="email"
                name="emailId"
                id="emailId"
                placeholder="example@gmail.com"
                className="form-control"
              />
            </div>
            <div className="col-sm-4">
              Contact:
              <input
                type="tel"
                name="contact"
                id="contact"
                placeholder="+91 91580 33533"
                className="form-control"
              />
            </div>
            <div className="col-sm-4">
              Link:
              <input
                type="url"
                name="link"
                id="link"
                placeholder="https://form.example.com/exampleForm"
                className="form-control"
              />
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
      </>
    );
  }
}
export default withRouter(
  connect(
    (store) => ({
      auth: store.auth,
      notices: store.notices,
    }),
    { createNotice }
  )(NoticeForm)
);
