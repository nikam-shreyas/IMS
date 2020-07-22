import React from "react";
import { Redirect } from "react-router-dom";

import Auth from "../components/Auth";
import ErrorMessage from "../components/ErrorMessage";
const Auth_Page = ({ authType }) => {
  if (localStorage.getItem("user") === "student")
    return <Redirect to="/studentprofile" />;
  if (localStorage.getItem("user") === "faculty")
    return <Redirect to="/facultyprofile" />;
  if (localStorage.getItem("user") === "admin") return <Redirect to="/admin" />;

  return (
    <div>
      {/* <div className="my-4 text-center">
        <ErrorMessage />
      </div> */}
      <Auth authType={authType} />
    </div>
  );
};

export default Auth_Page;
