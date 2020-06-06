import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Student_Home from "../pages/Student_Home";
import Faculty_Home from "../pages/Faculty_Home";
import Admin_Home from "../pages/Admin_Home";
import Auth_Page from "../pages/Auth_Page";
import Auth_Page_2 from "../pages/Auth_Page_2";
import Internships from "../components/internships";
//import { internships } from '../store/reducers/internships';
const RouteViews = ({ auth }) => (
  <main>
    <Switch>
      <Route
        exact
        path="/login"
        render={() => (
          <Auth_Page
            authType="login"
            isAuthenticated={auth.isAuthenticated}
            isAuthenticated_f={auth.isAuthenticated_f}
            isAuthenticated_a={auth.isAuthenticated_a}
          />
        )}
      />
      <Route
        exact
        path="/Register"
        render={() => (
          <Auth_Page_2
            authType="register"
            isAuthenticated={auth.isAuthenticated}
          />
        )}
      />
      <Route exact path="/internships" render={() => <Internships />} />
      <Route exact path="/student" render={() => <Student_Home />} />
      <Route exact path="/faculty" render={() => <Faculty_Home />} />
      <Route exact path="/admin" render={() => <Admin_Home />} />
    </Switch>
  </main>
);

//export default RouteViews;

export default withRouter(
  connect((store) => ({ auth: store.auth }))(RouteViews)
);
