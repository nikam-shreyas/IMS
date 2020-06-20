import React from "react";
import { Redirect } from "react-router-dom";

import Auth_2 from "../components/Auth_2";
import ErrorMessage from "../components/ErrorMessage";
const Auth_Page_2 = ({ authType, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/student" />;
  }

  return (
    <div>
      <ErrorMessage />
      <Auth_2 authType={authType} />
    </div>
  );
};

export default Auth_Page_2;
