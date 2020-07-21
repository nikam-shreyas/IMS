import React ,{ Component } from "react";
import {getAllInternships} from "../store/actions";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import {CSVLink} from 'react-csv';
class StudentReport extends Component {
  constructor(props){
    super(props);
    this.state={
        internships:[],
        count:null,
        csvData:[],
    };
  }
  async componentDidMount(){
    const { getAllInternships }=this.props;
    getAllInternships().then(()=>this.loadData(this.props.internships));
  }
  loadData(internship){
    console.log(internship.length);
    this.setState({internships:internship});
    this.setState({count:internship.length});
    internship.forEach(element => {
      let csv={};
      let date = new Date(element.application.startDate);
      csv["StudentName"]=element.student.name.firstname+" "+element.student.name.lastname;
      csv["Workplace"]=element.application.workplace;
      csv["StartDate"]=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      csv["Duration"]=element.application.durationOfInternship;
      csv["Stipend"]=element.application.stipend;
      csv["Status"]=element.completionStatus;
      // console.log(csv)
      this.setState({csvData:this.state.csvData.concat(csv)})
    });
    console.log(this.state.csvData)
  }
  renderRows(){
    return this.state.internships.map((internship)=>{
      const{
        _id,
        application,
        student,
        completionStatus
      }=internship;
      let date = new Date(application.startDate);   
      return (
        <tr key={_id}>
        <td>{student.name.firstname+" "+student.name.lastname }</td>
        <td>{application.workplace}</td>
        <td>{ date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()}</td>
        <td>{application.durationOfInternship}</td>
        <td>{application.stipend}</td>
        <td>{completionStatus}</td>
        </tr>
      );
    });
  }
  render(){
    // console.log(this.state.csvData);
    return (
      <div>
      <div className="row no-gutters">
      <div className="col-sm-2 sidenav">
      <Admin_Sidenav activeComponent="6" />
      </div>
      <div className="col-sm-10 of">
      <div className="container-fluid mt-2">
      <h4>Students' Internship Report</h4>
      <div
      className="alert alert-secondary"
      role="alert"
    >
      <strong>Total Applications: {this.state.count} </strong>
    </div> 
    
    <CSVLink data={this.state.csvData} filename={"ApplicationsReport.csv"} className="btn btn-primary">Download Report</CSVLink> 
      <hr/>
      <table className="table table-hover table-sm table-striped">
      <thead className="thead-light">
      <tr>
      <th scope="col">Name</th>
      <th scope="col">Workplace</th>
      <th scope="col">Start Date</th>
      <th scope="col">Duration</th>
      <th scope="col">Stipend</th>
      <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody> 
      {this.renderRows()} 
      </tbody>
      </table>
      </div>
      </div>
      </div>
      
      </div>
      );
    }
};

export default connect((store)=>({
  internships:store.internships,
}),{
  getAllInternships,
})(StudentReport);
