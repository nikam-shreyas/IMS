import React,{Component} from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";

class AddFaculty extends Component{
constructor(props){
super(props);
this.handleSubmit = this.handleSubmit.bind(this);
}
// async componentDidMount() {
//     const { getStudent } = this.props;
//     getStudent()
//       .then(this.setState({ isLoading: false }))
//       .then(() => this.loadData(this.props.auth.user));
//   }
  loadData(user) {
    if (user.emailId !== undefined) this.setState({ data: user });
    console.log(user);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { updateStudent } = this.props;
    var formData = new FormData(event.target);
    const data = {};
    data["name"] = {
      firstname: formData.get("firstname") || this.state.data.name.firstname,
      lastname: formData.get("lastname") || this.state.data.name.lastname,
    };
    data["currentClass"] = {
      year: formData.get("year") || this.state.data.currentClass.year,
      div: formData.get("div") || this.state.data.currentClass.div,
    };
    data["prevSemAttendance"] =
      formData.get("prevSemAttendance") || this.state.data.prevSemAttendance;
    data["rollNo"] = formData.get("rollNo") || this.state.data.rollNo;
    data["emailId"] = formData.get("emailId") || this.state.data.emailId;
    updateStudent(data);
    alert("Profile Updated!");
    window.location.reload(false);
  }
render(){
    return (
        <div>
            <div className="row no-gutters">
                <div className="col-sm-2">
                    <Admin_Sidenav activeComponent="3" />
                </div>
                <div className="col-sm-10">
            <div className="container">
              <h4 className="mt-2">Add New Faculty</h4>
              <hr />
              {
                <form id="form" onSubmit={this.handleSubmit}>
                  Fill in the details:
                  <hr />
                  <div className="container">
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        First Name:
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          className="form-control"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="col-sm-6">
                        Last Name:
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder="Enter last name"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-6">
                       Designation:
                        <input
                          type="text"
                          className="form-control"
                          id="designation"
                          name="designation"
                          placeholder="Enter designation"
                        />
                      </div>
                      <div className="col-sm-6">
                        Department:
                        <div className="input-group">
                          <div className="input-group">
                            <input
                              type="number"
                              name="department"
                              id="department"
                              placeholder="Enter department"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-row my-2">
                      <div className="col-sm-6">
                        Year:
                        <input
                          type="text"
                          name="year"
                          id="year"
                          placeholder="Enter year"
                          className="form-control"
                        />
                      </div>
                      <div className="col-sm-6">
                        Division:
                        <input
                          type="number"
                          name="div"
                          id="div"
                          placeholder="Enter division"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row my-2">
                      <div className="col-sm-12">
                        Email Id:
                        <input
                          type="email"
                          name="emailId"
                          id="emailId"
                          placeholder="Enter email"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="text-right">
                    <button className="btn border-dark mx-2" type="reset">
                      Reset
                    </button>
                    <button type="submit" className="btn btn-dark">
                      Add Profile
                    </button>
                  </div>
                </form>
              }
            </div>
          </div>


            </div>
        </div>
    );
}
}

export default connect ((store)=>({
    auth:store.auth,
    }),{})(AddFaculty);