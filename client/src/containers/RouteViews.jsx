import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../components/Auth";
import Auth_2 from "../components/Auth_2";
import StudentDashboard from "../pages/StudentDashboard";
const RouteViews = () => (
  <main>
    <Switch>
      <Route exact path="/login" render={() => <Auth authType="login" />} />
      <Route
        exact
        path="/register"
        render={() => <Auth_2 authType="register" />}
      />
      <Route
        exact
        path="/studentDashboard"
        render={() => <StudentDashboard />}
      />
    </Switch>
  </main>
);

export default RouteViews;
