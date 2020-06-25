import React, { Component } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
class NotFoundPage extends Component {
  state = {};
  handleClick() {
    window.history.back();
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron mt-5 text-center bg-secondary text-white">
          <h1 className="display-3 my-5">404, Not Found</h1>
          <hr />
          Sorry, the requested page could not be found. Please make sure that
          the URL you entered is correct.
          <hr />
          <button className="btn btn-dark" onClick={this.handleClick}>
            <span className="mr-2">
              <MdKeyboardBackspace
                style={{ margin: -1, padding: -1 }}
                color="white"
              ></MdKeyboardBackspace>
            </span>
            Click here to go back
          </button>
        </div>
        <p>PICT IMS</p>
      </div>
    );
  }
}

export default NotFoundPage;
