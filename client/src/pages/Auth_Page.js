import React from "react";
import { Redirect } from "react-router-dom";

import Auth from "../components/Auth";
import ErrorMessage from "../components/ErrorMessage";
const Auth_Page = ({
  authType,
  isAuthenticated,
  isAuthenticated_f,
  isAuthenticated_a,
}) => {
  if (isAuthenticated) return <Redirect to="/student" />;
  if (isAuthenticated_f) return <Redirect to="/faculty" />;
  if (isAuthenticated_a) return <Redirect to="/admin/" />;

  return (
    <div>
      <ErrorMessage />
      <Auth authType={authType} />
    </div>
  );
};

export default Auth_Page;
