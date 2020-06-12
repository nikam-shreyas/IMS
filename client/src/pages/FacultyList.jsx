import React,{Component} from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";


class FacultyList extends Component{

  
  
  renderTable(){

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
                <h4>All Faculty Members</h4>

              </div>
              </div>
            </div>
          </div>
        )
    }
}


export default connect(
    (store) => ({
      auth: store.auth,
    }),
    {  }
  )(FacultyList);
  