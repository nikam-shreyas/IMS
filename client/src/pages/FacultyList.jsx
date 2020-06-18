import React,{Component} from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import { getFaculty } from '../store/actions/admin';

class FacultyList extends Component{
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
  super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
  this.state = { //state is by default an object
      isLoading:true,
      faculties: [
        {name:{ firstname: 'Srushti',lastname:'raybhoge' },currentClass : { year : 'Te', div : 2 }, department:'comp' ,username:'srush', designation:'cc',emailId:'s@gmail.com' },
      ]
  }
}
async componentDidMount(){
  const {
    getFaculty
  } = this.props;
  getFaculty()
  .then(this.setState({ isLoading: false }))
  .then(() => this.loadData(this.props.faculty));
 }
loadData(facultylist) {
  this.setState({ faculties: facultylist });
}
renderTableData() {
  return this.state.faculties.map((faculty, index) => {
     const { username, name,currentClass, department,designation,emailId } = faculty //destructuring
     return (
        <tr key={username}>
           <td>{username}</td>
           <td>{name.firstname+" "+name.lastname}</td>
           <td>{currentClass.year+" "+currentClass.div}</td>
           <td>{department}</td>
           <td>{designation}</td>
           <td>{emailId}</td>

        </tr>
     )
  })
}

    render(){
        return (
          <div>
        <div className="row no-gutters">
          <div className="col-sm-2">
            <Admin_Sidenav activeComponent="2" />
          </div>
          <div className="col-sm-10">
          <div className="container">
          <h4 className="mt-2 text-center">Faculty List</h4>
          <div className="table-responsive" >
          <table className="table table-hover table-striped">
          <thead className="bg-midnight">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Class</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">EmailID</th>
  
            </tr>
          </thead>
          <tbody>
          {this.renderTableData()}
          </tbody>
        </table>
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
      faculty:store.faculty,
    }),
    { getFaculty  }
  )(FacultyList);
  