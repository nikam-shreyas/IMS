import React, { Component } from "react";
import { HorizontalBar, Doughnut, Line, Bar, Pie } from "react-chartjs-2";
import { getAllInternshipStats } from "../store/actions";
import { connect } from "react-redux";
class AnalyticsCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rlabel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      horizontalBarChartData: {},
      doughnutData: { datasets: [{ data: [0, 0, 0, 0] }] },
      lineChartData: {},
      radarChartData: {},
      mBarData: {},
    };
    this.setData = this.setData.bind(this);
  }
  sortKeys(obj_1) {
    var key = Object.keys(obj_1).sort(function order(key1, key2) {
      if (key1 < key2) return -1;
      else if (key1 > key2) return +1;
      else return 0;
    });

    var temp = {};

    for (var i = 0; i < key.length; i++) {
      temp[key[i]] = obj_1[key[i]];
      delete obj_1[key[i]];
    }
    for (var j = 0; j < key.length; j++) {
      obj_1[key[j]] = temp[key[j]];
    }
    return obj_1;
  }
  setData(chartsData) {
    let hlabel = [],
      llabel = [],
      plabel = [];
    let hdata = [],
      ldata = [],
      pdata = [];

    for (let i = 0; i < chartsData.top5workplaces.length; i++) {
      const element = chartsData.top5workplaces[i];
      hlabel.push(element._id);
      hdata.push(element.count);
    }
    for (let i = 0; i < chartsData.yearwiseDistribution.length; i++) {
      const element = chartsData.yearwiseDistribution[i];
      plabel.push(element._id);
      pdata.push(element.count);
    }
    for (let i = 0; i < chartsData.totalMonthwise.length; i++) {
      const element = chartsData.totalMonthwise[i];
      llabel.push(element._id.sdate);
      ldata.push(element.count);
    }
    let tdata = {};

    for (let i = 0; i < chartsData.datewiseStatusDistribution.length; i++) {
      const element = chartsData.datewiseStatusDistribution[i];
      tdata[element._id.sdate] = tdata[element._id.sdate] || {
        N: 0,
        Approved: 0,
        Rejected: 0,
      };
      tdata[element._id.sdate][element._id.status] = element.count;
    }
    this.sortKeys(tdata);
    let set = { Pending: [], Approved: [], Rejected: [] };
    let tdate = [];
    for (const k in tdata) {
      if (tdata.hasOwnProperty(k)) {
        const element = tdata[k];
        tdate.push(k);
        set["Pending"].push(element["Pending"]);
        set["Approved"].push(element["Approved"]);
        set["Rejected"].push(element["Rejected"]);
      }
    }
    this.setState({
      mBarData: {
        labels: tdate,
        datasets: [
          {
            label: "Pending",
            data: set["Pending"],
            backgroundColor: "#FF6384",
          },
          {
            label: "Approved",
            data: set["Approved"],
            backgroundColor: "#36A2EB",
          },
          {
            label: "Rejected",
            data: set["Rejected"],
            backgroundColor: "#FFCE56",
          },
        ],
      },
    });
    let rdata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let rdataset = {
      FE: [
        {
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#fcba03",
            "#03FC39",
            "#0398FC",
            "#CFCAD1",
            "#FF5F00",
            "#0040FF",
            "#FF002B",
            "#B503FC",
          ],
          data: [...rdata],
        },
      ],
      SE: [
        {
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#fcba03",
            "#03FC39",
            "#0398FC",
            "#CFCAD1",
            "#FF5F00",
            "#0040FF",
            "#FF002B",
            "#B503FC",
          ],

          data: [...rdata],
        },
      ],
      TE: [
        {
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#fcba03",
            "#03FC39",
            "#0398FC",
            "#CFCAD1",
            "#FF5F00",
            "#0040FF",
            "#FF002B",
            "#B503FC",
          ],

          data: [...rdata],
        },
      ],
      BE: [
        {
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#fcba03",
            "#03FC39",
            "#0398FC",
            "#CFCAD1",
            "#FF5F00",
            "#0040FF",
            "#FF002B",
            "#B503FC",
          ],

          data: [...rdata],
        },
      ],
    };
    for (let i = 0; i < chartsData.classwiseDistribution.length; i++) {
      const element = chartsData.classwiseDistribution[i];
      if (element._id.year === "FE") {
        rdataset.FE[0].data[parseInt(element._id.div) - 1] = element.count;
      } else if (element._id.year === "SE") {
        rdataset.SE[0].data[parseInt(element._id.div) - 1] = element.count;
      } else if (element._id.year === "TE") {
        rdataset.TE[0].data[parseInt(element._id.div) - 1] = element.count;
      } else {
        rdataset.BE[0].data[parseInt(element._id.div) - 1] = element.count;
      }
    }
    this.setState({
      radarChartData: rdataset,
    });
    this.setState({
      lineChartData: {
        labels: llabel,
        datasets: [
          {
            label: "Month-wise distribution",
            fill: true,
            data: ldata,
          },
        ],
        options: {
          scales: {
            xAxes: [
              {
                type: "date",
                distribution: "linear",
              },
            ],
          },
        },
      },
    });
    this.setState({
      doughnutData: {
        datasets: [
          {
            data: pdata,
            backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED"],
            label: "Year-wise Distribution",
          },
        ],
        labels: plabel,
      },
    });
    this.setState({
      horizontalBarChartData: {
        labels: hlabel,
        datasets: [
          {
            label: "Companies",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: hdata,
            barPercentage: 1.0,
            categoryPercentage: 0.5,
          },
        ],
      },
    });
  }

  async componentDidMount() {
    const { getAllInternshipStats } = this.props;
    getAllInternshipStats().then(() => this.setData(this.props.chart));
  }

  render() {
    return (
      <div className="container-fluid mt-2">
        <h4>Statistics</h4>
        <hr />
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              id="nav-t5w-tab"
              data-toggle="tab"
              href="#nav-t5w"
              role="tab"
              aria-controls="nav-t5w"
              aria-selected="true"
            >
              Top 5 Workplaces
            </a>
            <a
              className="nav-item nav-link"
              id="nav-ywd-tab"
              data-toggle="tab"
              href="#nav-ywd"
              role="tab"
              aria-controls="nav-ywd"
              aria-selected="false"
            >
              Year-wise
            </a>
            <a
              className="nav-item nav-link"
              id="nav-mwd-tab"
              data-toggle="tab"
              href="#nav-mwd"
              role="tab"
              aria-controls="nav-mwd"
              aria-selected="false"
            >
              Month-wise
            </a>
            <a
              className="nav-item nav-link"
              id="nav-dwd-tab"
              data-toggle="tab"
              href="#nav-dwd"
              role="tab"
              aria-controls="nav-dwd"
              aria-selected="false"
            >
              Division-wise
            </a>
            <a
              class="nav-item nav-link"
              id="nav-ovw-tab"
              data-toggle="tab"
              href="#nav-ovw"
              role="tab"
              aria-controls="nav-ovw"
              aria-selected="false"
            >
              Overview
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-t5w"
            role="tabpanel"
            aria-labelledby="nav-t5w-tab"
          >
            <div className="container">
              <div className="card card-body mt-5">
                <div className="row">
                  <div className="col-sm-8">
                    <HorizontalBar
                      data={this.state.horizontalBarChartData}
                      options={{
                        scales: {
                          xAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  </div>
                  <div className="col-sm-4 mt-5">
                    <h5>Top 5 Companies</h5>
                    <hr />
                    The chart shows the distribution of our students through
                    various companies. The top 5 companies are displayed where
                    our students have interned.
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-ywd"
            role="tabpanel"
            aria-labelledby="nav-ywd-tab"
          >
            <div className="container">
              <div className="card card-body mt-5">
                <div className="row mt-2">
                  <div className="col-sm-5">
                    <h5>Year-Wise Distribution</h5>
                    <hr />
                    The following pie chart accounts for the distribution of the
                    students interning at various places throughout the 4 years
                    at PICT.
                  </div>
                  <div className="col-sm-7">
                    <Pie data={this.state.doughnutData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-mwd"
            role="tabpanel"
            aria-labelledby="nav-mwd-tab"
          >
            <div className="container">
              <div className="card card-body mt-2">
                <div className="row">
                  <div className="col-sm-10 offset-1">
                    <Line data={this.state.lineChartData} />
                    <p style={{ textAlign: "center" }}>
                      {" "}
                      <small className="text-muted">
                        The above graph shows the number of students interning
                        through time.
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-dwd"
            role="tabpanel"
            aria-labelledby="nav-dwd-tab"
          >
            <div className="container">
              <div className="card card-body mt-5">
                <div className="row">
                  <div className="col-sm-4 mt-5">
                    <div
                      className="nav flex-column nav-pills"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <h5>Division-wise Distribution</h5>
                      <hr />
                      <a
                        className="nav-link active"
                        id="v-pills-fe-tab"
                        data-toggle="pill"
                        href="#v-pills-fe"
                        role="tab"
                        aria-controls="v-pills-t5w"
                        aria-selected="true"
                      >
                        First Year
                      </a>
                      <a
                        className="nav-link"
                        id="v-pills-se-tab"
                        data-toggle="pill"
                        href="#v-pills-se"
                        role="tab"
                        aria-controls="v-pills-ywd"
                        aria-selected="false"
                      >
                        Second Year
                      </a>
                      <a
                        className="nav-link"
                        id="v-pills-te-tab"
                        data-toggle="pill"
                        href="#v-pills-te"
                        role="tab"
                        aria-controls="v-pills-messages"
                        aria-selected="false"
                      >
                        Third Year
                      </a>
                      <a
                        className="nav-link"
                        id="v-pills-be-tab"
                        data-toggle="pill"
                        href="#v-pills-be"
                        role="tab"
                        aria-controls="v-pills-settings"
                        aria-selected="false"
                      >
                        Fourth Year
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="tab-content" id="v-pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="v-pills-fe"
                        role="tabpanel"
                        aria-labelledby="v-pills-fe-tab"
                      >
                        <Doughnut
                          data={{
                            labels: this.state.rlabel.map((e) => "FE " + e),
                            datasets: this.state.radarChartData.FE,
                          }}
                        />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-se"
                        role="tabpanel"
                        aria-labelledby="v-pills-ywd-se"
                      >
                        <Doughnut
                          data={{
                            labels: this.state.rlabel.map((e) => "SE " + e),
                            datasets: this.state.radarChartData.SE,
                          }}
                        />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-te"
                        role="tabpanel"
                        aria-labelledby="v-pills-te-tab"
                      >
                        <Doughnut
                          data={{
                            labels: this.state.rlabel.map((e) => "TE " + e),
                            datasets: this.state.radarChartData.TE,
                          }}
                        />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-be"
                        role="tabpanel"
                        aria-labelledby="v-pills-be-tab"
                      >
                        <Doughnut
                          data={{
                            labels: this.state.rlabel.map((e) => "BE " + e),
                            datasets: this.state.radarChartData.BE,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-ovw"
            role="tabpanel"
            aria-labelledby="nav-ovw-tab"
          >
            <div className="container">
              <div className="card card-body mt-2">
                <div className="row">
                  <div className="col-sm-10 offset-1">
                    <div className="my-2" style={{ textAlign: "center" }}>
                      Month-wise Distribution of Internship Status
                    </div>
                    <Bar data={this.state.mBarData} />
                  </div>
                </div>
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
    chart: store.charts,
  }),
  { getAllInternshipStats }
)(AnalyticsCharts);
