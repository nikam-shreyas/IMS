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
            <td><pre>{JSON.stringify(internship.application.submittedDate,null,2)}</pre></td>
            <td>{internship.__v}</td>
        </tr>);


    return <Fragment>
       
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
            
        <table  class="table">
            <thead class="thead-dark">
                <tr>
                <th>ApplicationStatus</th>
                <th>UndertakingStatus</th>
                <th>OfferLetterStatus</th>
                <th>MarksheetsStatus</th>
                <th>AttendanceStatus</th>
                <th>approvedBy</th>
                <th>completionStatus</th>
                <th>holder</th>
                <th>student</th>
                <th>submittedDate</th>
                <th>approvedDate</th>
                <th>workplace</th>
                <th>durationOfInternship</th>
                <th>offerLetter</th>
                </tr>
            </thead>
        {internships}</table></Fragment>
    }

}



export default connect(store=>({
    auth: store.auth,
    internships: store.internships
}),{getInternships,getStudentInternships,getCurrentInternship})(Internships);