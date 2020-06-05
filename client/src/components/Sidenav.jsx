import React, { Component } from "react";

class Sidenav extends Component {
  state = {};
  render() {
    return (
      <div className="sidenav">
        <h3>IMS</h3>
        <hr />
        <h5>Name</h5>
        <h6>Roll no</h6>
        <hr />
        <p>Menu</p>
        <ul>
          <li>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z" />
              </svg>
            </span>
            Review Applications
          </li>
          <li>Profile</li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              width="20"
              height="20"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            Apply
          </li>
          <li>Documents</li>
          <li>Logout</li>
        </ul>
      </div>
    );
  }
}

export default Sidenav;
