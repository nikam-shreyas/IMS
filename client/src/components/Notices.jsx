import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getNotices } from "../store/actions";
import {
  MdLink,
  MdAccessTime,
  MdLocationCity,
  MdContactPhone,
  MdMailOutline,
  MdSearch,
} from "react-icons/md";
class Notices extends Component {
  filter(e) {
    var filter, cards, cardContent, i;
    filter = e.target.value.toUpperCase();
    cards = document.getElementsByClassName("outer-card");
    for (i = 0; i < cards.length; i++) {
      cardContent = cards[i].querySelector(".individual-card");
      if (
        cardContent &&
        cardContent.innerText.toUpperCase().indexOf(filter) > -1
      ) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      notices: [
        {
          subject: null,
          description: null,
          link: null,
          createdDate: null,
          designation: null,
          duration: null,
          stipend: null,
          workplace: null,
          contact: null,
          emailId: null,
          location: null,
          positions: null,
          domain: null,
          requirements: null,
        },
      ],
    };
  }

  componentDidMount() {
    const { getNotices } = this.props;
    getNotices().then(() => this.loadData(this.props.notices));
  }
  loadData(notices) {
    this.setState({ notices: notices });
  }

  render() {
    return (
      <Fragment>
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
            placeholder="Filter Notices"
            onChange={this.filter}
            aria-describedby="filtersearch"
          />
        </div>
        <hr />

        <div id="accordion">
          {this.state.notices.map((notice) => (
            <div key={notice._id} className="outer-card card my-2">
              <div className="individual-card">
                <div
                  className="card-header"
                  id={notice._id}
                  data-toggle="collapse"
                  data-target={"#collapse" + notice._id}
                  aria-expanded="true"
                  aria-controls={"collapse" + notice._id}
                >
                  {notice.subject}
                  <br />
                  {notice.designation && (
                    <small className="text-info">
                      {notice.designation}
                      <br />
                    </small>
                  )}
                </div>

                <div
                  id={"collapse" + notice._id}
                  className="collapse"
                  aria-labelledby={notice._id}
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <div className="card-title">
                      {notice.workplace && (
                        <h2>
                          <span className="badge badge-secondary">
                            {notice.workplace}
                            <br />
                          </span>
                        </h2>
                      )}
                      <small className="text-muted">
                        {new Date(notice.createdDate).toDateString()}
                      </small>
                    </div>

                    {notice.description && (
                      <div className="card my-3">
                        <div className="card-body text-dark">
                          {notice.description}
                          {notice.requirements && (
                            <div>
                              <strong>Requirements:</strong>
                              <ul className="ml-4">
                                {notice.requirements.split(",").map((r) => (
                                  <li key={r}>{r}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {notice.duration && (
                            <div>
                              <span className="mx-2">
                                <MdAccessTime
                                  style={{ margin: -1, padding: -1 }}
                                  size="22"
                                />
                              </span>
                              {notice.duration} months
                            </div>
                          )}
                          {notice.location && (
                            <div>
                              <span className="mx-2">
                                <MdLocationCity
                                  style={{ margin: -1, padding: -1 }}
                                  size="22"
                                />
                              </span>
                              {notice.location}
                            </div>
                          )}
                          {notice.contact && (
                            <div>
                              <span className="mx-2">
                                <MdContactPhone
                                  style={{ margin: -1, padding: -1 }}
                                  size="22"
                                />
                              </span>
                              {notice.contact}
                            </div>
                          )}
                          {notice.emailId && (
                            <div>
                              <span className="mx-2">
                                <MdMailOutline
                                  style={{ margin: -1, padding: -1 }}
                                  size="22"
                                />
                              </span>
                              {notice.emailId}
                            </div>
                          )}
                          {notice.link && (
                            <div>
                              <span className="mx-2">
                                <MdLink
                                  style={{ margin: -1, padding: -1 }}
                                  size="22"
                                />
                              </span>
                              <a href={notice.link} target="_new">
                                {notice.link}
                              </a>
                              <br />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {notice.positions && (
                      <div>
                        Number of positions: {notice.positions}
                        <br />
                      </div>
                    )}
                    {notice.domain && (
                      <div>
                        Domain(s): {notice.domain}
                        <br />
                      </div>
                    )}
                    {notice.stipend && (
                      <button className="btn btn-success mt-2">
                        Rs. {notice.stipend}/month
                        <br />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    notices: store.notices,
  }),
  { getNotices }
)(Notices);
