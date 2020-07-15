import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createInternship,uploadDocument } from "../store/actions";
import Sidenav from "../components/Sidenav";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class InternshipApplication extends React.Component {
  state = {
    startDate: new Date()
  };
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitFile=this.submitFile.bind(this);
  }
  
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleUpload(id, labelId) {
    var fileName = document.getElementById(id).value.split("\\").pop();
    document.getElementById(labelId).classList.add("selected");
    document.getElementById(labelId).innerHTML = fileName;
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    const data = { application: {} };
    for (var [key, value] of formData.entries()) {
      data["application"][key] = value;
    }
    // data["application"]["startDate"] = formData.get('startDate');
    data["application"]["submittedDate"] = new Date().toUTCString();
    data["application"]["offerLetter"] = formData.get('offerLetter');
    const { uploadDocument } = this.props;
    // uploadDocument();
    // console.log('heee')

    console.log(data.application.offerLetter);

    const { createInternship } = this.props;

    createInternship(data).then(() => {
      this.props.history.push("/student");
    });
  }
  submitFile(event){
    const { uploadDocument } = this.props;

    uploadDocument();
    console.log('heee')
  }
  render() {
    return (
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <Sidenav activeComponent="3" />
        </div>
        <div className="col-sm-10">
          <div className="container-fluid">
            <h4 className="mt-2">Apply</h4>
            <div
              className="alert alert-secondary alert-dismissible fade show"
              role="alert"
            >
              <strong>P.S. </strong> Please complete your profile before
              applying.
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr />
            <form onSubmit={this.handleSubmit}>
              Internship Details:
              <hr />
              <div className="container-fluid">
                <div className="form-row my-2">
                  <div className="col-sm-6">
                    Company:
                    <input
                      type="text"
                      name="workplace"
                      id="workplace"
                      className="form-control"
                      placeholder="eg. Google"
                      required
                    />
                  </div>
                  <div className="col-sm-3">
                    Start Date:
                    <div className="input-group">                           
                      <DatePicker
                        name="startDate"
                        id="startDate"
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        z-index = "10"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        minDate={new Date()}
                        // maxDate={addMonths(new Date(), 5)}
                        showDisabledMonthNavigation
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    Duration:
                    <div className="input-group">
                      <input
                        type="number"
                        name="durationOfInternship"
                        id="durationOfInternship"
                        placeholder="eg. 1"
                        className="form-control"
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">month(s)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row my-2">
                  <div className="col-sm-5">
                    Stipend:
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroupPrependRs"
                        >
                          Rs.{" "}
                        </span>
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        id="stipend"
                        name="stipend"
                        placeholder="eg. 10000"
                        aria-describedby="inputGroupPrependRs"
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">/month</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-7">
                    Reference:
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroupPrependSalutation"
                        >
                          Mr./Mrs.
                        </span>
                      </div>
                      <input
                        type="text"
                        name="reference"
                        id="reference"
                        aria-describedby="inputGroupPrependSalutation"
                        placeholder="eg. John Doe"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                
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
           <div className="col-sm-12">
                Upload Offer Letter:
                <div className="custom-file">
                <input
                type="file"
                        className="custom-file-input"
                        name="offerLetter"
                        id="offerLetter"
                        onChange={() =>
                          this.handleUpload("offerLetter", "offerLetterLabel")
                        }
                        required
                        />
                        <label
                        className="custom-file-label"
                        id="offerLetterLabel"
                        htmlFor="offerLetter"
                        >
                        Choose file
                        </label>
                        </div>
                        <button type="submit" className="btn btn-dark" style={{marginTop:'5px'}}>
                        Submit File
                      </button>
                        </div>
                        
                        </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (store) => ({
      auth: store.auth,
      internships: store.internships,
    }),
    { createInternship,uploadDocument }
  )(InternshipApplication)
);
