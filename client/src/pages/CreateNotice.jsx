import React, { Component } from "react";
import NoticeForm from "../components/NoticeForm";
import Sidenav_f from "../components/SideNav_f";
class CreateNotice extends Component {
  state = {};
  render() {
    return (
      <>
      <div className="col-sm-2 sidenav" style={{float:"left"}}>
      <Sidenav_f activeComponent="1" />
        </div>
        <div className="col-sm-10 of">
        <NoticeForm style={{float:"left"}}/>
        </div>
      </>
    );
  }
}
export default CreateNotice;