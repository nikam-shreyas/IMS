import React, { Fragment } from "react";
import { connect } from "react-redux";

const ErrorMessage = ({ error }) => (
  <Fragment>
    {error.message && (
      <span
        id="err"
        className="alert alert-danger alert-dismissible"
        role="alert"
      >
        {" "}
        {error.message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span
            aria-hidden="true"
            style={{ marginTop: "-10px", padding: "-20px", margin: "-10px" }}
          >
            &times;
          </span>
        </button>
      </span>
    )}
  </Fragment>
);

export default connect((store) => ({ error: store.error }))(ErrorMessage);
