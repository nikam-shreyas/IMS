import React from "react";
import { Redirect } from "react-router-dom";

import Auth_2 from "../components/Auth_2";
import ErrorMessage from "../components/ErrorMessage";
import NavBar from "../containers/NavBar";
const Auth_Page_2 = ({ authType, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/student" />;
  }

  return (
    <div>
      <NavBar></NavBar>
      <div className="mt-4 text-center">
        <ErrorMessage />
      </div>
      <Auth_2 authType={authType} />
    </div>
  );
};

export default Auth_Page_2;
