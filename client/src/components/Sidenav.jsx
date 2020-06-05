import React, { Component } from "react";
import { MdPermIdentity } from "react-icons/md";
import { MdDns } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";

class Sidenav extends Component {
  state = {};
  render() {
    return (
      <div className="sidenav">
        <p>Menu</p>
        <ul>
          <li>
            <span className="mx-2">
              <MdDns />
            </span>
            Review Applications
          </li>
          <li>
            <span className="mx-2">
              <MdPermIdentity />
            </span>
            Profile
          </li>
          <li>
            <span className="mx-2">
              <MdAddCircle />
            </span>
            Apply
          </li>
          <li>
            <span className="mx-2">
              <MdDescription />
            </span>
            Documents
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidenav;
