import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Student_Home from "../pages/Student_Home";
import Auth_Page from "../pages/Auth_Page";
import Auth_Page_2 from "../pages/Auth_Page_2";
import Internships from "../components/internships";
import InternshipDetails from "../pages/InternshipDetails";
import InternshipApplication from "../pages/InternshipApplication";
import StudentProfile from "../pages/StudentProfile";
import StudentDocuments from "../pages/StudentDocuments";
import TestPage from "../pages/testPage";
import AdminProfile from "../pages/AdminProfile";
import AddFaculty from "../pages/AddFaculty";
import CreateNotice from "../pages/CreateNotice";
import Notices from "../components/Notices";
import StudentNotifications from "../pages/StudentNotifications";
import FacultyProfile from "../pages/FacultyProfile";
import FacultyList from "../pages/FacultyList";
import DeleteFaculty from "../pages/DeleteFaculty";
import AdminSetting from "../pages/AdminSetting";
import FacultyNotices from "../pages/FacultyNotices";
import ForgotPassword from "../pages/ForgotPassword";

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
      <Route exact path="/student" render={() => <Student_Home />} />
      <Route exact path="/faculty" render={() => <CreateNotice />} />
      <Route exact path="/admin/" render={() => <AdminProfile />} />
      <Route exact path="/add" render={() => <AddFaculty />} />
      <Route exact path="/all" render={() => <FacultyList />} />
      <Route exact path="/facultyprofile" render={() => <FacultyProfile />} />
      <Route exact path="/deleteFaculty" render={() => <DeleteFaculty />} />
      <Route exact path="/settings" render={() => <AdminSetting />} />
      <Route exact path="/facultyNotices" render={() => <FacultyNotices />} />
      <Route exact path="/ForgotPassword" render={() => <ForgotPassword />} />

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

export default withRouter(
  connect((store) => ({ auth: store.auth }))(RouteViews)
);
