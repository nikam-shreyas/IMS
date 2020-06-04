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
        const internships=this.props.internships.map(internship => <li  key={internship._id}>{internship.holder}</li>);


    return <Fragment><ul>{internships}hi</ul></Fragment>
    }

}



export default connect(store=>({
    auth: store.auth,
    internships: store.internships
}),{getInternships,getStudentInternships,getCurrentInternship})(Internships);