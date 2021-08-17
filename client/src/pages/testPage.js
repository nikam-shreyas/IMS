// ****************************** Trial page not used in application **********************************//

import React, { Component } from "react";
import { connect } from "react-redux";
import { FaRegFilePdf } from "react-icons/fa";
import {
  getAdmin,
  getCurrentTeacher,
  getFaculty,
  deleteTeacher,
  setCurrentTeacher,
  createTeacher,
  setCurrentAdmin,
  setFaculty,
} from "../store/actions/admin";
class TestPage extends Component {
  async componentDidMount() {
    const downloadPDFLink = document.getElementById("downloadPDFLink");
    const downloadPDFResponse = await fetch(
      "http://localhost:4002/api/internships/getFile",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: [{ NOC: "Resumefinal.pdf" }] }),
      }
    );
    const downloadPDFBlob = await downloadPDFResponse.blob();
    const downloadPDFObjectURL = URL.createObjectURL(downloadPDFBlob);
    downloadPDFLink.href = downloadPDFObjectURL;
  }

  loadFile(f) {
    this.setState({ file: f });
  }

  render() {
    return (
      <div>
        <div>
          <div class="container-fluid mt-2">
            <div class="row">
              <div class="col-sm-2">
                <a
                  id="downloadPDFLink"
                  href="#"
                  download="41244_NOC.pdf"
                  className="card card-body"
                  style={{
                    borderRadius: 10,
                    padding: 3,
                    width: "100px",
                  }}
                >
                  <h1 className="text-center">
                    {" "}
                    <FaRegFilePdf
                      color="red"
                      style={{
                        marginBottom: -2,
                        marginRight: 3,
                        marginTop: "15px",
                      }}
                    />
                  </h1>
                  <hr style={{ marginTop: -2 }} />
                  <small class="text-muted text-center">
                    <strong
                      style={{
                        whiteSpace: "nowrap",
                        width: "80px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      41244_NOC.pdf
                    </strong>
                  </small>
                </a>
              </div>
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
    faculty: store.faculty,
    currentTeacher: store.currentTeacher,
    currentAdmin: store.currentAdmin,
  }),
  {
    getAdmin,
    getCurrentTeacher,
    getFaculty,
    deleteTeacher,
    setCurrentTeacher,
    createTeacher,
    setCurrentAdmin,
    setFaculty,
  }
)(TestPage);
// ****************************** Trial page not used in application **********************************//
