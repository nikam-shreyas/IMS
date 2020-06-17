import React, { Component, useState } from "react";
// import { showProfile } from "../store/actions";
import { connect } from "react-redux";
import Admin_Sidenav from "../components/Admin_Sidenav";
import {
    deleteTeacher,
    getCurrentTeacher,
} from "../store/actions/admin";
import {
  Card, CardTitle,Button,CardBody,CardText
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class DeleteFaulty extends Component {
    state = {
        showMessage:false,
        isLoading: true,
        data: {
          _id:null,
          name: {
            firstname: "s",
            lastname: "s",
          },
          department: "s",
          designation: "s",
          emailId: "srush@gmail.com",
          applicationsReceived : [ ],
          applicationsApproved : [ ],
          currentClass : {
            year : "TE",
            div : 2
          },
          username : "srushti",
        },
      };
      constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
       }
       handleSubmit(event) {
        event.preventDefault();
        const { getCurrentTeacher } = this.props;
        var formData = new FormData(event.target);
        const username= formData.get("username") || null;
        if(username===null){
          toast("Username cannot be empty !");
          }
        getCurrentTeacher(username)
        .then(()=> this.loadData(this.props.teacher))
        .then(()=>this.setState({showMessage:true}));
        // alert("Faculty Added!");
        // window.location.reload(false);
      }
      //  handleChange({ target }) {
      //   this.setState({
      //     [target.name]: target.value
      //   });
      // }
    //   async componentDidMount() {    
    //         const {
    //             getCurrentTeacher
    //         } = this.props;

    //         getCurrentTeacher()
    //         .then(this.setState({ isLoading: false }))
    //         .then(() => this.loadData(this.props.admin));
    //     }
    loadData(user) {
    console.log(user)

            this.setState({ data: user });
    }
    handleClick(username) {
        if (window.confirm("Are you sure you want to delete this application?")) {
        const { deleteTeacher } = this.props;
        deleteTeacher(username)
        .then(toast("Faculty Deleted!"));
        }
    }

  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2">
            <Admin_Sidenav activeComponent="4" />
          </div>
          <div className="col-sm-10">
            <div className="container">
              <hr />
              {
               <div>
                   
                Enter username of faculty member to delete :
                <form id="form" onSubmit={this.handleSubmit}>
                <div className="form-row my-2">
                <div className="col-sm-6">
                <input type="text" name="username" id="username" placeholder="username"  className="form-control"
                 />
                 </div>
                 <div className="col-sm-6">
                <button type="submit" className="btn btn-dark btn-sm mx-2"
                //   onClick={this._showMessage(true,this.state.username)}
                  >
                Get Information
                </button>
                </div>
                </div>
                </form>
                
                  <hr />
               
                  <hr />
                  <div className="text-right">
                  { this.state.showMessage && (
                  <div>
                  <Card>
                  <CardBody>
                    <CardTitle> <h4> {this.state.data.username} </h4></CardTitle>
                    <div className="table-responsive">
                    <table className="table-borderless text-justify">
                    <tbody>
                      
                    <tr> 
                    <td>Name : </td>
                    <td>{this.state.data.name.firstname+" "+this.state.data.name.lastname}</td>
                    </tr>
                    
                    <tr> 
                      <td>Class : </td>
                      <td>{this.state.data.currentClass.year+" "+this.state.data.currentClass.div}</td>
                      </tr>
                      
                      <tr> 
                      <td>Department : </td>
                      <td>{this.state.data.department}</td>
                      </tr>
                      
                      <tr> 
                      <td>Designation : </td>
                      <td>{this.state.data.designation}</td>
                      </tr>

                      <tr> 
                      <td>EmailId : </td>
                      <td>{this.state.data.emailId}</td>
                      </tr>
                      </tbody>
                      </table>
                        {this.state.data._id}
                      </div>
                      <Button className="btn btn-danger btn-sm mx-2"
                    onClick={() => this.handleClick(this.state.data.username)}
                    >Delete
                    </Button>
                  </CardBody>
                </Card>
                  </div>
                  ) }
                 
                  
                  </div>
                  </div>
              }
            <ToastContainer />

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
    admin:store.currentAdmin,
    teacher:store.currentTeacher
  }),
  {
    deleteTeacher,
    getCurrentTeacher,
  }
)(DeleteFaulty);
