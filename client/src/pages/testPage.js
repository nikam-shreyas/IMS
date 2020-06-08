import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class TestPage extends Component {
  render() {
    return <Fragment>{/* Put your components here */}</Fragment>;
  }
}

export default connect(() => ({}), {})(TestPage);
