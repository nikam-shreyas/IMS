import React, { Component } from "react";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import { getStudentList , deleteStudents ,Search } from "../store/actions/admin";
import {
  MdFormatListBulleted,
  MdAssignmentInd,
  MdSupervisorAccount,
  MdViewAgenda,
  MdLocalLibrary,
  MdBuild,
  MdSearch,
} from "react-icons/md";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
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
           name: { firstname: null, lastname: null },
           currentClass: { year: null, div: null },
           rollNo: null,
          username: null,
         // emailId: "",
         YEAR:"",
         DIV:"",
        },
      ],
      ids:[],
    };
    this.deleteall=this.deleteall.bind(this);
    this.search=this.search.bind(this);
  }
  async componentDidMount() {
    const { getStudentList } = this.props;
    console.log(this.props);
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
selectall(){
  // alert("no");
  var p=document.getElementsByName("check");
  console.log(p.length+"lengh is ");
  for(var i=0;i<p.length;i++){
    p[i].checked=true;
  }
}


deletesingle=(e)=>{
console.log(e.target.value);
var g=document.getElementById(e.target.value);
if(g.checked==true){
console.log("selected");
}else{
  alert("Not Selected");
}
}


deleteall(){
  var p=document.getElementsByName("check");
  var obj=[];
  for(var i=0;i<p.length;i++){
    if(p[i].checked===true){
      obj.push(p[i].id);
    }
  }

  console.log(obj.length);
  if(obj.length==0){
    alert("No Students to delete.")
  }else{
    const { deleteStudents }=this.props;
    deleteStudents(obj);
  }
}

async search(){

  var year=document.getElementById("year");
  var div=document.getElementById("div");
  await this.setState({ YEAR: year.value });
  await this.setState({ DIV: div.value });
  
  if(year.value=="--"){
  alert("year not selected");
  }else if(div.value=="--"){
    alert("division not selected");
  }else{
   const {YEAR , DIV} =this.state;
   const { Search }=this.props;
   console.log({YEAR }+{DIV});
   Search({YEAR ,DIV });
  }
}

renderCardData1() {
  return this.state.students.map((students) => {
    const {
      _id,
      username,
       name,
      currentClass,
       rollNo,
      // emailId,
    } = students; //destructuring
    return (
      
      <tr key={_id}>
        <td>{username}</td>
        <td>{rollNo}</td>
      <td>{name.firstname}</td>
      <td>{name.lastname}</td>
    <td>{currentClass.year}</td>
    <td>{currentClass.div}</td>
    <td>
      
  </td>
      </tr>
    );
  });
}


  renderCardData() {
    return this.state.students.map((students) => {
      const {
        _id,
        username,
         name,
        currentClass,
         rollNo,
        // emailId,
      } = students; //destructuring
      console.log(username);
      return (
        
        <tr key={_id}>
          <td>{username}</td>
          <td>{rollNo}</td>
        <td>{name.firstname}</td>
        <td>{name.lastname}</td>
      <td>{currentClass.year}</td>
      <td>{currentClass.div}</td>
      <td>
        <input type="checkbox" name="check" id={_id} value={_id}/>
        
    </td>
        </tr>
      );
    });
  }
  
  render() {
    return (
      <div className="row no-gutters">
         <div className="col-sm-2 sidenav">
            <Admin_Sidenav activeComponent="3" />
          </div>
        {/* <div>Student List</div>
        <hr/>
        <div></div> */}
        <div className="col-sm-10 of" style={{padding:"1%"}}>
          <h2 style={{textAlign:"center"}}>Student List</h2>
          <hr/>
          <div>
            <select id="year">
              <option value="--">--</option>
              <option value="FE">FE</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>
            <select id="div">
              <option value="--">--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
            </select>
            <button id="search_button" onClick={this.search} className="btn btn-primary"> 
              Search
            </button>
            <button id="selectall" onClick={this.selectall}  className="btn btn-primary"> 
              Select all
            </button>
            <button id="deleteselected" onClick={this.deleteall}  className="btn btn-danger"> 
              Delete Selected
            </button>
            <div className="col-sm-6 mt-4">
            <ErrorMessage />
            <SuccessMessage />
          </div>
          </div>
          <hr/>
          <table  className="table" style={{width:"100%"}}>
            <thead>
              <tr className="thead-dark">
                <th>Username</th>
                <th>Roll No.</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Year</th>
                <th>Div</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
                {this.state.isLoading==true? this.renderCardData1():this.renderCardData()}
                
                 
            </tbody>
          </table>
        </div>
       
      </div>

      

    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    //students: store.studentlist,
    students: store.someStudentlist,
  }),
  { getStudentList,deleteStudents , Search }
)(StudentList);