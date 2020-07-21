import React from "react";
// import 'office-ui-fabric-react/dist/css/fabric.css';
// import '../App.css';
import Admin_Sidenav from "../components/Admin_Sidenav";
import AnalyticsCharts from "./AnalysisChart";

const Analytics = () => {
  return (
    <div>
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <Admin_Sidenav activeComponent="5" />
        </div>
        <div className="col-sm-10 of">
          <AnalyticsCharts />
        </div>
      </div>
     
    </div>
  );
};

export default Analytics;
