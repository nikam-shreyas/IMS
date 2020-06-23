import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getNotices } from "../store/actions";
import {
  MdLink,
  MdAccessTime,
  MdLocationCity,
  MdContactPhone,
  MdMailOutline,
} from "react-icons/md";
class Notices extends Component {
  state = {
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
  constructor(props) {
    super(props);
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
        <div id="accordion">
          {this.state.notices.map((notice) => (
            <div key={notice._id} className="card my-2">
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
                              <MdAccessTime size="22" />
                            </span>
                            {notice.duration}
                          </div>
                        )}
                        {notice.location && (
                          <div>
                            <span className="mx-2">
                              <MdLocationCity size="22" />
                            </span>
                            {notice.location}
                          </div>
                        )}
                        {notice.contact && (
                          <div>
                            <span className="mx-2">
                              <MdContactPhone size="22" />
                            </span>
                            {notice.contact}
                          </div>
                        )}
                        {notice.emailId && (
                          <div>
                            <span className="mx-2">
                              <MdMailOutline size="22" />
                            </span>
                            {notice.emailId}
                          </div>
                        )}
                        {notice.link && (
                          <div>
                            <span className="mx-2">
                              <MdLink size="22" />
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
