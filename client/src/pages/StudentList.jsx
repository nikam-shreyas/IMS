import React, { Component } from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import { getStudentList } from "../store/actions/admin";
import {
  MdFormatListBulleted,
  MdAssignmentInd,
  MdSupervisorAccount,
  MdViewAgenda,
  MdLocalLibrary,
  MdBuild,
  MdSearch,
} from "react-icons/md";
class StudentList extends Component {
  constructor(props) {
    super(props);
    //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      isLoading: true,
      students: [
        {
          _id: "",
        //   name: { firstname: "", lastname: "" },
        //   currentClass: { year: "", div: "" },
        //   rollNo: "",
          username: "",
         // emailId: "",
        },
      ],
    };
  }
  async componentDidMount() {
    const { getStudentList } = this.props;
    getStudentList()
      .then(this.setState({ isLoading: false }))
      .then(() => this.loadData(this.props.students));
  }
  loadData(studentlist) {
    this.setState({ students: studentlist });
  }
  handleListView() {
    let elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
  filter(e) {
    var filter, cards, cardContent, i;
    filter = e.target.value.toUpperCase();
    cards = document.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
      cardContent = cards[i].querySelector(".individual-card");
      console.log(cardContent.innerText);
      if (cardContent.innerText.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
  handleCardView() {
    let elements = document.getElementsByClassName("card-body");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
    }
  }
  expandInline(e) {
    e.target.parentElement.lastChild.style.display = "block";
  }
  // handlefilter(e) {
  //   if (e.target.value !== "") {
  //     var elements = document.querySelectorAll(
  //       "div[id='*" + e.target.value + "*']"
  //     );
  //     console.log(elements);
  //   }
  // }
  renderCardData() {
    return this.state.students.map((students) => {
      const {
        _id,
        username,
        //name,
        //currentClass,
        //rollNo,
        //emailId,
      } = students; //destructuring
      return (
        <div
          className="col-sm-6"
          key={_id}
          id={
            username //+
            // name.firstname +
            // name.lastname +
            // currentClass.year +
            // currentClass.div +
            // rollNo
          }
        >
          <div className="card my-2">
            <div className="individual-card">
              <div
                className="card-header"
                onClick={this.expandInline.bind(this)}
              >
                {/* Prof. {name.firstname + " " + name.lastname} */}
                
                <br />
                <small className="text-muted">Username: {username}</small>
              </div>
              <div className="card-body">
                <b> Current Class : </b>
                {/* {currentClass.year}{" "}
                {currentClass.div === 0 ? "" : currentClass.div} */}
                <br />
               
                <b> RollNo : </b>
                {/* {rollNo} */}
                <br />
                <b> Email Id : </b>
                {/* {emailId} */}
                <br />
              </div>
            </div>
          </div>
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
            <div className="container-fluid">
              {/* {<MDBDataTable dark data={this.state.faculties} />} */}
              <h4 className="mt-2">
                Faculty List
                <div className="float-right">
                  <div
                    className="btn-group btn-group-toggle btn-sm"
                    data-toggle="buttons"
                  >
                    <label
                      className="btn btn-secondary btn-sm"
                      onClick={this.handleListView}
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        autoComplete="off"
                      />
                      <MdFormatListBulleted
                        style={{ margin: -1, padding: -1 }}
                        color="white"
                      />
                    </label>
                    <label
                      className="btn btn-secondary active btn-sm"
                      onClick={this.handleCardView}
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        autoComplete="off"
                      />
                      <MdViewAgenda
                        style={{ margin: -1, padding: -1 }}
                        color="white"
                      />
                    </label>
                  </div>
                </div>
              </h4>
              <hr />
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="filtersearch">
                    <span>
                      <MdSearch style={{ padding: -2, margin: -2 }} />
                      {"  "} Search
                    </span>
                  </span>
                </div>
                <input
                  type="text"
                  name="filter"
                  id="filter"
                  className="form-control"
                  placeholder="Filter Faculty"
                  onChange={this.filter}
                  aria-describedby="filtersearch"
                />
              </div>
              <hr />
              <div className="row">{this.renderCardData()}</div>
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
    students: store.students,
  }),
  { getStudentList }
)(StudentList);
