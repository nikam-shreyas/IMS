import React, { Component } from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import { getFaculty } from "../store/actions/admin";
import { Card, CardTitle, Button, CardBody, CardText } from "reactstrap";

class FacultyList extends Component {
  //   state={
  //     isLoading: true,
  //     dataNew:{
  //         username:"Srushti",
  //         address:"pune",
  //         email:"s@gmail.com",
  //         phonenumber:"7896541230",
  //     },
  // };

  constructor(props) {
    super(props);
    //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      isLoading: true,
      faculties: [
        {
          
          _id:'',
          name: { firstname: "", lastname: "" },
          currentClass: { year: "", div: "" },
          department: "",
          username: "",
          designation: "",
          emailId: "",
        },
      ],
    };
  }
  async componentDidMount() {
    const { getFaculty } = this.props;
    getFaculty()
      .then(this.setState({ isLoading: false }))
      .then(() => this.loadData(this.props.faculty));
  }
  loadData(facultylist) {
    this.setState({ faculties: facultylist });
  }
  renderCardData(){
    return this.state.faculties.map((faculty) => {
      const {
        _id,
        username,
        name,
        currentClass,
        department,
        designation,
        emailId,
      } = faculty; //destructuring
      return (
        <div className='col-md-6' key={_id}>
        <Card  style={{margin:'1%',boxShadow:'5px 5px rgb(167,167,167)'}}>
        <CardBody>
        <CardTitle>
        <h4>{username}</h4>
        <small className="text-muted">
        {_id}
        </small>
        </CardTitle>
        <hr style={{ borderTop:' 1px solid black'}}/>
        <b> Name : </b>{name.firstname + " " + name.lastname}<br/>
        <b> Current Class : </b>{currentClass.year + " " + currentClass.div}<br/>
        <b> Department : </b>{department}<br/>
        <b> Designation : </b>{designation}<br/>
        <b> EmailId : </b>{emailId}<br/>      
        </CardBody>
       </Card>
       </div>
      );
    });
   
  }
  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Admin_Sidenav activeComponent="2" />
          </div>
          <div className="col-sm-10 of">
            <div className="container">
              {/* {<MDBDataTable dark data={this.state.faculties} />} */}
              <h4 className="mt-2">Faculty List</h4>
              <hr />
              <div class='row'>
                  {this.renderCardData()}                  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    faculty: store.faculty,
  }),
  { getFaculty }
)(FacultyList);
