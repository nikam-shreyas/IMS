import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getStudentNotices } from "../store/actions";
import { MdError, MdDoneAll } from "react-icons/md";
class PersonalNotices extends Component {
  state = {
    noMessages: true,
    studentsNotices: [
      {
        comments: "",
        _id: null,
      },
    ],
  };

  componentDidMount() {
    const { getStudentNotices } = this.props;
    getStudentNotices().then(() => this.loadData(this.props));
  }
  loadData(notices) {
    for (let i = 0; i < notices.length; i++) {
      if (notices[i]["comments"] !== "") {
        this.setState({ noMessages: false });
        this.setState({ studentsNotices: notices });
        break;
      }
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.noMessages && (
          <>
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <span className="mx-2">
                <MdDoneAll />
              </span>
              No new messages.
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </>
        )}
        {!this.state.noMessages &&
          this.state.studentsNotices.map((notice) => (
            <>
              <div className="alert alert-danger">
                <span className="mx-2">
                  <MdError />
                </span>
                {notice.comments}
              </div>
            </>
          ))}
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    studentsNotices: store.studentsNotices,
  }),
  { getStudentNotices }
)(PersonalNotices);
