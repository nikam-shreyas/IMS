import React, { Component } from "react";
import Sidenav from "../components/Sidenav";
import PersonalNotices from "../components/PersonalNotices";
import Notices from "../components/Notices";
import { MdSearch } from "react-icons/md";
class StudentNotifications extends Component {
  state = {};
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
  render() {
    return (
      <>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Sidenav activeComponent="5" />
          </div>
          <div className="col-sm-10 of">
            <div className="container-fluid">
              <h4 className="mt-2">Personal Notices:</h4>
              <hr />
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="filtersearch">
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
                  placeholder="Filter Applications"
                  onChange={this.filter}
                  aria-describedby="filtersearch"
                />
              </div>
              <hr />
              <PersonalNotices />
              <hr />
              <h4>Public Notices:</h4>
              <hr />
              <Notices />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default StudentNotifications;
