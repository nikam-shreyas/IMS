import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { getAllInternships } from "../store/actions";
import { connect } from "react-redux";

class AnalyticsCharts extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      recevData: [],
      approveData: [],
      rejectData: [],
      recevBackgd: [],
      approveBackgd: [],
      rejectBackgd: [],
      chart: null,
      internships: null,
      chartData1: {
        labels: [1],
        datasets: [
          {
            label: "Received",
            data: [1],
            backgroundColor: ["#4198D8"],
          },
          {
            label: "Rejected",
            data: [1],
            backgroundColor: ["#F5C767"],
          },
          {
            label: "Approved",
            data: [1],
            backgroundColor: ["#7A61BA"],
          },
        ],
      },
    };
    this.setData = this.setData.bind(this);
  }
  setData(chart) {
    this.setState({ chartData1: chart });
  }

  async componentDidMount() {
    const { getAllInternships } = this.props;
    getAllInternships().then(() => this.setData(this.props.chart));
  }
  componentWillMount() {
    this._isMounted = false;
  }
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
  };

  render() {
    return (
      <div>
        <Bar
          data={this.state.chartData1}
          options={{
            responsive: true,
            title: {
              display: "top",
              text: "Monthly Application Analysis",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
              labels: {
                fontColor: "#000",
              },
            },
            layout: {
              padding: {
                left: 50,
                right: 0,
                bottom: 50,
                top: 50,
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            tooltips: {
              enabled: true,
            },
          }}
        />
      </div>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    chart: store.charts,
  }),
  { getAllInternships }
)(AnalyticsCharts);
