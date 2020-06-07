import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class Teacher_Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        ></link>
      </Fragment>
    );
  }
}

export default connect(() => ({}), {})(Teacher_Dashboard);
