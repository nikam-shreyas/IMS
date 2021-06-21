import React, { Component } from "react";

class Setup extends Component {
  state = {};
  adminSample = {
    name: {
      firstname: "Shrush",
      lastname: "Raybhoge",
    },
    currentClass: {
      year: "_",
      div: 0,
    },
    department: "Office",
    username: "admin",
    password: "$2a$10$fJjTrYuJT9wG4NBLwSaReuXGdgQPqJYNPyrjAK6AwIaJhXyD4SHCy", //P.S. Password is generated using JWT token
    designation: "Admin",
    emailId: "srush@gmail.com",
  };
  render() {
    return (
      <>
        <nav id="navbar-example2" class="navbar navbar-dark bg-dark text-light">
          PICT IMS Documentation
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" href="#overview">
                Overview
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#setup">
                Setup
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#api">
                API
              </a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-sm-12">
              <div
                data-spy="scroll"
                className="setupContent"
                data-target="#navbar-example2"
                data-offset="0"
              >
                <h2 id="overview">Overview</h2>
                <div>
                  Internship Management System for PICT. This web application is
                  based on MERN Stack - (MongoDB, Express, React, Node.js). The
                  documentation is organized into two parts: Setup and API
                  <br />
                  <br />
                  <h4>Pre requisites:</h4>
                  <pre>
                    MongoDB shell version v4+
                    <br />
                    Node v12+
                    <br />
                    NPM v7+
                    <br />
                  </pre>
                  The other dependencies will be installed automaticlly in Step
                  1 of setup.
                </div>
                <br />
                <h2 id="setup">Setup</h2>
                <div>
                  For organization purposes, the code is divided into two parts:{" "}
                  <code>client(FrontEnd)</code> and <code>server(BackEnd)</code>
                </div>
                <div>
                  <h4>Step 1: </h4>
                  Install the requirements by changing directories into the
                  client and server folders independently and run the command{" "}
                  <code>npm install</code>. This command will take care of
                  installing the dependencies required by the project. For
                  example:
                  <small>
                    <pre>
                      $ cd /IMS/client/
                      <br />$ npm install
                      <br />
                      <br />$ cd /IMS/server/
                      <br />$ npm install
                    </pre>
                  </small>
                  <h4>Step 2:</h4>
                  Create a .env file (Path is given by: "/IMS/.env"). Set-up the
                  credentials in the .env file. Credentials information:
                  <ul className="ml-4">
                    <li>
                      <code>PORT</code> stores the port number where the backend
                      is hosted.
                    </li>
                    <li>
                      <code>DATABASE</code> stores the path to the mongodb
                      database.
                    </li>
                    <li>
                      <code>SECRET</code> stores the symmetric key that is used
                      to sign JWT for authentication and storing passwords in
                      the database. Note: To be changed before deployment by
                      authorised personel.
                    </li>
                    <li>
                      <code>EMAILFROM</code> stores the Email ID for the PICT
                      SMTP service, that is used for sending notification to the
                      faculty and students about the updates and changes.
                    </li>
                    <li>
                      <code>PASSWORD</code> stores the password for the above
                      email service.
                    </li>
                  </ul>
                  <h4>Step 3:</h4>
                  Setting up the MongoDB database: Create a database named{" "}
                  <code>internship</code> within MongoDB. If you wish to chode
                  other names, update accordingly within the .env file, under{" "}
                  <code>DATABASE</code>.
                  <br />
                  Create an <code>admin</code> with a default username and
                  password, and designation as <code>Admin</code>. A sample is
                  given below:
                  <small>
                    <pre>{JSON.stringify(this.adminSample, null, 2)}</pre>
                  </small>
                  <u>P.S.</u> Password is generated using JWT token. <br />
                  The other faculty members can be created by the admin by
                  logging in and using the <code>Add New Faculty</code> Page.
                  <br />
                  <u>Note to developers:</u> Make sure to create at least one
                  faculty for each of the following in the database:
                  <ol className="ml-4">
                    <li>Class Coordinator</li>
                    <li>Department Internship Coordinator</li>
                    <li>College Internship Coordinator</li>
                    <li>HOD</li>
                    <li>Principal</li>
                    <li>Admin</li>
                  </ol>
                  <h4>Step 4:</h4>
                  Start the servers by changing directories into the client and
                  server folders independently and run the following commands:
                  <small>
                    <pre>
                      $ cd /IMS/server/
                      <br />$ node index.js
                      <br />
                      <br />$ cd /IMS/client/
                      <br />$ npm start
                    </pre>
                  </small>
                </div>
                <h2 id="api">API</h2>
                <div>
                  <table className="table table-hover table-sm">
                    <thead>
                      <tr>
                        <th>Method</th>
                        <th>API</th>
                        <th>Information</th>
                      </tr>
                    </thead>
                    <tbody>
                      {" "}
                      <tr>
                        <td className="bg-dark text-light" colspan="3">
                          <b>ADMIN</b>
                          <br />
                          <small>
                            base: <code>/admin</code>
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/find/:user</pre>
                        </td>
                        <td>Returns the particular faculty member's details</td>
                      </tr>
                      <tr>
                        <td>DELETE</td>
                        <td>
                          <pre>/find/:user</pre>
                        </td>
                        <td>Deletes the particular faculty member's details</td>
                      </tr>
                      <tr>
                        <td>PUT</td>
                        <td>
                          <pre>/update/:id</pre>
                        </td>
                        <td>
                          Updates the particular faculty profile's details
                        </td>
                      </tr>
                      <tr>
                        <td>PUT</td>
                        <td>
                          <pre>/reset/:id</pre>
                        </td>
                        <td>Resets password for the particular faculty</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/login_admin</pre>
                        </td>
                        <td>For logging in the admin</td>
                      </tr>
                      <tr>
                        <td className="bg-dark text-light" colspan="3">
                          <b>AUTHENTICATION</b>
                          <br />
                          <small>
                            base: <code>/auth</code>
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/register</pre>
                        </td>
                        <td>For registering students</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/login</pre>
                        </td>
                        <td>To handle student login</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/forgotpassword</pre>
                        </td>
                        <td>To reset password</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/login_faculty</pre>
                        </td>
                        <td>To handle faculty login</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/student</pre>
                        </td>
                        <td>Updates the particular student's details</td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/student</pre>
                        </td>
                        <td>Fetches the particular student's details</td>
                      </tr>
                      <tr>
                        <td>PUT</td>
                        <td>
                          <pre>/student/reset/:id</pre>
                        </td>
                        <td>
                          Handles reset password for the particular student
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-dark text-light" colspan="3">
                          <b>FACULTY</b>
                          <br />
                          <small>
                            base: <code>/faculty</code>
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/profile</pre>
                        </td>
                        <td>Fetches the particular faculty's details</td>
                      </tr>
                      <tr>
                        <td>PUT</td>
                        <td>
                          <pre>/update/:id</pre>
                        </td>
                        <td>
                          Updates the particular faculty profile's details
                        </td>
                      </tr>
                      <tr>
                        <td>PUT</td>
                        <td>
                          <pre>/reset/:id</pre>
                        </td>
                        <td>
                          Handles reset password for the particular faculty
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-dark text-light" colspan="3">
                          <b>INTERNSHIP</b>
                          <br />
                          <small>
                            base: <code>/internship</code>
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/</pre>
                        </td>
                        <td>
                          Fetch all received internship applications of a
                          particular faculty
                        </td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/</pre>
                        </td>
                        <td>Add a new internship</td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/approved</pre>
                        </td>
                        <td>
                          Fetch approved internship applications of a particular
                          faculty
                        </td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/student</pre>
                        </td>
                        <td>Fetch the particular student's internships</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/forward</pre>
                        </td>
                        <td>
                          Forward internship application to the next concerned
                          faculty
                        </td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/update</pre>
                        </td>
                        <td>Update internship details</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/approve</pre>
                        </td>
                        <td>Approve a particular internship application</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/reject</pre>
                        </td>
                        <td>Reject a particular internship application</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/uploadDocument</pre>
                        </td>
                        <td>Handle uploading of documents</td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/allStats</pre>
                        </td>
                        <td>Get overall internship statistics</td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/all</pre>
                        </td>
                        <td>Fetch all internships</td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/report</pre>
                        </td>
                        <td>Fetch internship details for report generation</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/getFile</pre>
                        </td>
                        <td>Fetch a particular file</td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/aictereport</pre>
                        </td>
                        <td>
                          Fetch internship details for AICTE report generation
                        </td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/:id</pre>
                        </td>
                        <td>
                          Get a particular internship application's details
                        </td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/delete</pre>
                        </td>
                        <td>Delete a particular internship application</td>
                      </tr>
                      <tr>
                        <td className="bg-dark text-light" colspan="3">
                          <b>NOTICES</b>
                          <br />
                          <small>
                            base: <code>/notices</code>
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/</pre>
                        </td>
                        <td>Fetch all notices</td>
                      </tr>
                      <tr>
                        <td>POST</td>
                        <td>
                          <pre>/</pre>
                        </td>
                        <td>Create a new notice</td>
                      </tr>
                      <tr>
                        <td>GET</td>
                        <td>
                          <pre>/student</pre>
                        </td>
                        <td>
                          Fetch the comments of the internship application of a
                          particular student
                        </td>
                      </tr>
                      <tr>
                        <td>DELETE</td>
                        <td>
                          <pre>/:id</pre>
                        </td>
                        <td>Delete a notice</td>
                      </tr>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Setup;
