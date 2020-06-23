import React, { Fragment } from "react";
import { connect } from "react-redux";

const SuccessMessage = ({ success }) => (
  <Fragment>
    {success.message && (
      <span id="err" className="alert alert-success mx-3">
        {" "}
        {success.message}
      </span>
    )}
  </Fragment>
);

export default connect((store) => ({ success: store.success }))(SuccessMessage);
