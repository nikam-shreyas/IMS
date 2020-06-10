import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Student_Home from "../pages/Student_Home";
import Admin_Home from "../pages/Admin_Home";
import Auth_Page from "../pages/Auth_Page";
import Auth_Page_2 from "../pages/Auth_Page_2";
import Internships from "../components/internships";
import InternshipDetails from "../pages/InternshipDetails";
import InternshipApplication from "../pages/InternshipApplication";
import StudentProfile from "../pages/StudentProfile";
import StudentDocuments from "../pages/StudentDocuments";
import TestPage from "../pages/testPage";
import CreateNotice from "../pages/CreateNotice";
import Notices from "../components/Notices";
import StudentNotifications from "../pages/StudentNotifications";
//import { internships } from '../store/reducers/internships';

const RouteViews = ({ auth }) => (
  <main>
    <Switch>
      <Route
        exact
        path="/notifications"
        render={() => <StudentNotifications />}
      />

      <Route exact path="/test" render={() => <TestPage />} />
      <Route exact path="/studentDocs" render={() => <StudentDocuments />} />
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
        path="/"
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
        path="/register"
        render={() => (
          <Auth_Page_2
            authType="register"
            isAuthenticated={auth.isAuthenticated}
          />
        )}
      />
      <Route exact path="/notices" render={() => <Notices />} />
      <Route exact path="/internships" render={() => <Internships />} />
      <Route exact path="/internships" render={() => <Internships />} />
      <Route exact path="/student" render={() => <Student_Home />} />
      <Route exact path="/faculty" render={() => <CreateNotice />} />
      <Route exact path="/admin" render={() => <Admin_Home />} />
      <Route
        exact
        path="/internshipdetails/:internshipid"
        render={() => <InternshipDetails />}
      />
      <Route exact path="/apply" render={() => <InternshipApplication />} />
      <Route exact path="/studentprofile" render={() => <StudentProfile />} />
    </Switch>
  </main>
);

//export default RouteViews;

export default withRouter(
  connect((store) => ({ auth: store.auth }))(RouteViews)
);
