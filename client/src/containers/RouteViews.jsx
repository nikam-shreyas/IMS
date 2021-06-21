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
import ChangePassword from "../pages/StudentChangePwd";
import NotFoundPage from "../pages/NotFound";
import InternshipView from "../pages/InternshipView";
import FacultyChangePassword from "../pages/FacultyChangepwd";
import ForgotPassword from "../pages/ForgotPassword";
import ApprovedInternships from "../pages/ApprovedInternships";
import ViewApprovedInternship from "../pages/ViewApprovedInternship";
import Restricted from "../pages/Restricted";
import Analytics from "../pages/Analysis";
import StudentList from "../pages/StudentList";
import StudentReport from "../pages/StudentReport";
import GuidelinesInternship from "../pages/GuidelinesInternship";
import FacStudentReport from "../pages/FacStudentReport";
import Report from "../pages/AICTEReport";

const RouteViews = ({ auth }) => {
  const user = localStorage.getItem("user");
  return (
    <main>
      <Switch>
        <Route
          exact
          path="/notifications"
          render={() => {
            if (user === "student") {
              return <StudentNotifications />;
            } else return <Restricted />;
          }}
        />
        <Route exact path="/test" render={() => <TestPage />} />
        <Route
          exact
          path="/studentDocs"
          render={() => {
            if (user === "student") {
              return <StudentDocuments />;
            } else return <Restricted />;
          }}
        />

        <Route
          exact
          path="/facultyprofile"
          render={() => {
            if (user === "faculty") {
              return <FacultyProfile />;
            } else return <Restricted />;
          }}
        />

        <Route
          exact
          path="/admin"
          render={() => {
            if (user === "admin") {
              return <AdminProfile />;
            } else return <Restricted />;
          }}
        />

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

        <Route
          exact
          path="/notices"
          render={() => {
            if (user === "faculty") {
              return <Notices />;
            } else return <Restricted />;
          }}
        />

        <Route
          exact
          path="/internships"
          render={() => {
            if (user === "faculty") {
              return <Internships />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/approvedinternships"
          render={() => {
            if (user === "faculty") {
              return <ApprovedInternships />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/student"
          render={() => {
            if (user === "student") {
              return <Student_Home />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/createnotice"
          render={() => {
            if (user === "faculty") {
              return <CreateNotice />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/report"
          render={() => {
            if (user === "faculty") {
              return <FacStudentReport />;
            } else return <Restricted />;
          }}
        />
        {/* <Route exact path="/admin" render={() => <AdminProfile />} /> */}
        <Route
          exact
          path="/add"
          render={() => {
            if (user === "admin") {
              return <AddFaculty />;
            } else return <Restricted />;
          }}
        />

        <Route
          exact
          path="/stats"
          render={() => {
            if (user === "admin") {
              return <Analytics user="admin" />;
            } else if (user === "faculty") {
              return <Analytics user="faculty" />;
            } else return <Restricted />;
          }}
        />

        <Route
          exact
          path="/all"
          render={() => {
            if (user === "admin") {
              return <FacultyList />;
            } else return <Restricted />;
          }}
        />
        {/* <Route exact path="/facultyprofile" render={() => <FacultyProfile />} /> */}
        <Route
          exact
          path="/deleteFaculty"
          render={() => {
            if (user === "admin") {
              return <DeleteFaculty />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/allStudents"
          render={() => {
            if (user === "admin") {
              return <StudentList />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/settings"
          render={() => {
            if (user === "admin") {
              return <AdminSetting />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/facultyNotices"
          render={() => {
            if (user === "faculty") {
              return <FacultyNotices />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/changepassword"
          render={() => {
            if (user === "student") {
              return <ChangePassword />;
            } else return <Restricted />;
          }}
        />

        <Route
          exact
          path="/facultysetting"
          render={() => {
            if (user === "faculty") {
              return <FacultyChangePassword />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/internshipdetails/:internshipid"
          render={() => {
            if (user === "student") {
              return <InternshipDetails />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/internshipview/:internshipid"
          render={() => {
            if (user === "faculty") {
              return <InternshipView />;
            } else return <Restricted />;
          }}
        />

        <Route
          exact
          path="/internshipviewapproved/:internshipid"
          render={() => {
            if (user === "faculty") {
              return <ViewApprovedInternship />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/apply"
          render={() => {
            if (user === "student") {
              return <InternshipApplication />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/studentprofile"
          render={() => {
            if (user === "student") {
              return <StudentProfile />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/studentReport"
          render={() => {
            if (user === "admin") {
              return <StudentReport user="admin" />;
            } else if (user === "faculty") {
              return <StudentReport user="faculty" />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/guidelines"
          render={() => {
            if (user === "student") {
              return <GuidelinesInternship />;
            } else return <Restricted />;
          }}
        />
        <Route
          exact
          path="/aicteReport"
          render={() => {
            if (user === "admin") {
              return <Report />;
            } else return <Restricted />;
          }}
        />

        <Route exact path="/forgotpassword" render={() => <ForgotPassword />} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  );
};

export default withRouter(
  connect((store) => ({ auth: store.auth }))(RouteViews)
);
