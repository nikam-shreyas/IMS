import React, { Component } from "react";

class Restricted extends Component {
  render() {
    return (
      <h2>
        You do not have access to this page. This incident will be reported.
      </h2>
    );
  }
}

export default Restricted;
