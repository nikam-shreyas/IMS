import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getStudentNotices } from "../store/actions";
class PersonalNotices extends Component {
  state = {
    notices: [{}],
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getStudentNotices } = this.props;
    getStudentNotices().then(() => this.loadData(this.props));
  }
  loadData(notices) {
    console.log("notices:", notices);
  }

  render() {
    return <Fragment></Fragment>;
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    notices: store.notices,
  }),
  { getStudentNotices }
)(PersonalNotices);
