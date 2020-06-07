import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import { getInternships, getStudentInternships,getCurrentInternship } from '../store/actions';

class Internships extends Component{
    constructor(props){
        super(props);    
    }

    componentDidMount(){
        const {getInternships} = this.props;
        getInternships();
    }

    render(){
        
       // const {auth,getInternships,getStudentInternships} =this.props;
        const internships=this.props.internships.map(internship => 
        <tr   key={internship._id}>
            <td>{internship.docs.ApplicationStatus}</td>
            <td>{internship.docs.UndertakingStatus}</td>
            <td>{internship.docs.OfferLetterStatus}</td>
            <td>{internship.docs.MarksheetsStatus}</td>
            <td>{internship.docs.AttendanceStatus}</td>
            <td>{internship.approvedBy}</td>
            <td>{internship.completionStatus}</td>
            <td>{internship.holder}</td>
            <td>{internship.student}</td>
            {/* <td><pre>{JSON.stringify(internship.application.submittedDate,null,2)}</pre></td> */}
            <td>{new Date(internship.application.submittedDate).toLocaleDateString()}</td>
            <td>{new Date(internship.application.approvedDate).toLocaleDateString()}</td>
            <td>{internship.application.workplace}</td>
            <td>{internship.application.durationOfInternship}</td>
            <td>{internship.application.reference}</td>
            <td>{internship.application.offerLetter}</td>
            {/* <td>{internship.__v}</td> */}
        </tr>);


    return <Fragment>
       
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
            <div className="card" style={{margin:"2rem"}}>
        <table  className="table">
            <thead className="thead-dark">
                <tr>
                    <th colSpan="5" style={{border:"2px solid white"},{textAlign:"center"}}>DOCUMENT DETAILS</th>
                    <th colSpan="4"></th>
                    <th colSpan="6" style={{border:"1px solid white"},{textAlign:"center"}}>APPLICATION DETAILS</th>
                </tr>
                <tr>
                <th >Application Status</th>
                <th>Undertaking Status</th>
                <th>Offer Letter Status</th>
                <th>Marksheets Status</th>
                <th>Attendance Status</th>
                <th>Approved By</th>
                <th>Completion Status</th>
                <th>Holder</th>
                <th>Student</th>
                <th>Submitted Date</th>
                <th>Approved Date</th>
                <th>Workplace</th>
                <th>Duration Of Internship</th>
                <th>Reference</th>
                <th>OfferLetter</th>
                </tr>
            </thead>
        {internships}</table></div></Fragment>
        
    }

}



export default connect(store=>({
    auth: store.auth,
    internships: store.internships
}),{getInternships,getStudentInternships,getCurrentInternship})(Internships);