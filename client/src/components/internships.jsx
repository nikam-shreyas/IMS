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
        var p=0;


        
    function On_Reset(p){
                var ele1=document.getElementById("accept"+p);
                var ele2=document.getElementById("reject"+p);
                ele1.checked=false;
                ele2.checked=false;
    }
    
    function On_Submit(temp){
        alert(temp);
       const internships=this.props.internships.map(internship=>
        {if(internship._id===temp){
            internship.approvedBy.push(temp);
        }}
        )
    }
        
       // const {auth,getInternships,getStudentInternships} =this.props;
        const internships=this.props.internships.map(internship => 
            
        <tr   key={internship._id} style={{height:"120px"}}>
            <td><b>{internship.docs.ApplicationStatus}</b></td>
            <td><b>{internship.docs.UndertakingStatus}</b></td>
            <td><b>{internship.docs.OfferLetterStatus}</b></td>
            <td><b>{internship.docs.MarksheetsStatus}</b></td>
            <td><b>{internship.docs.AttendanceStatus}</b></td>
            <td><b>{internship.approvedBy}</b></td>
            <td><b>{internship.completionStatus}</b></td>
            
            <td><b>{internship.student}</b></td>
            {/* <td><pre>{JSON.stringify(internship.application.submittedDate,null,2)}</pre></td> */}
            <td><b>{new Date(internship.application.submittedDate).toLocaleDateString()}</b></td>
            <td><b>{new Date(internship.application.approvedDate).toLocaleDateString()}</b></td>
            <td><b>{internship.application.workplace}</b></td>
            <td><b>{internship.application.durationOfInternship}</b></td>
            <td><b>{internship.application.reference}</b></td>
            <td><b>{internship.application.offerLetter}</b></td>
            <td>
                
                <form onSubmit={()=>this.On_Submit(internship._id)}>
                <input style={{display:"none"}} type="radio" className="accept" value={"accept"+p} id={"accept"+p} name="option"/>
                <label className="accept" htmlFor={"accept"+p}>ACCEPT</label>
                
                <input style={{display:"none"}} type="radio" className="reject" value={"reject"+p} id={"reject"+p} name="option"/>
                <label className="reject" htmlFor={"reject"+p}>REJECT</label>
                <div style={{textAlign:"center"}}>
              
                <button  className="btn btn-success">Submit</button>
                
                </div>
                </form>

               
            </td>
           {p++}
            
        </tr>);


    return <Fragment>
       <div style={{textAlign:"center"},{marginTop:"20px"}}>
          <h3>
            Internship Detais
            <hr />
          </h3>
          
        </div>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
            
            <div className="card" id="InternshipCard" style={{margin:"5rem"},{overflowX:"scroll"}}>
        <table  className="table">
            <thead className="thead-dark">
                <tr>
                    <th colSpan="5" style={{border:"1px solid white"},{textAlign:"center"}}>DOCUMENT DETAILS</th>
                    <th colSpan="3"></th>
                    <th colSpan="6" style={{border:"1px solid white"},{textAlign:"center"}}>APPLICATION DETAILS</th>
                    <th colSpan="1"></th>
                </tr>
                <tr>
                <th >Application Status</th>
                <th>Undertaking Status</th>
                <th>Offer Letter Status</th>
                <th>Marksheets Status</th>
                <th>Attendance Status</th>
                <th>Approved By</th>
                <th>Completion Status</th>
               
                <th>Student</th>
                <th>Submitted Date</th>
                <th>Approved Date</th>
                <th>Workplace</th>
                <th>Duration Of Internship</th>
                <th>Reference</th>
                <th>OfferLetter</th>
                <th>Approve/Reject</th>
                </tr>
            </thead><tbody>
        {internships}</tbody></table></div></Fragment>
        
    }

}



export default connect(store=>({
    auth: store.auth,
    internships: store.internships
}),{getInternships,getStudentInternships,getCurrentInternship})(Internships);