import React, { Component } from "react";
import { getCurrentInternship } from "../store/actions";
import { connect } from "react-redux";
import Sidenav from "../components/Sidenav";

class InternshipDetails extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const { getCurrentInternship } = this.props;
    let c = window.location.href.split("/");
    let internshipId = c[4];
    getCurrentInternship(internshipId).then(
      this.setState({ internship: this.props.internship })
    );
  }
  render() {
    const internship = this.state.internship;
    return (
      <>
        {/* <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Sidenav activeComponent="1" />
          </div>
          <div className="col-sm-10 of">
            <div className="card m-3 border-dark">
              <div className="card-header">
                {internship.application.submittedDate}
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    internships: store.internships,
  }),
  { getCurrentInternship }
)(InternshipDetails);
