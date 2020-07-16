import React from 'react';
// import 'office-ui-fabric-react/dist/css/fabric.css';
// import '../App.css';

import FinancialCharts from './AnalyticsCharts';
import Admin_Sidenav from '../components/Admin_Sidenav';

const Analytics= () =>{
return(  
  <div>
  <div className="row no-gutters">
    <div className="col-sm-2 sidenav">
    <Admin_Sidenav activeComponent="5" />
    </div>
          <div className="col-sm-10">
            <div className="container-fluid mt-2">
            <div className="main-element ms-Grid-col ms-sm10 ms-xl10">
            <div className="ms-Grid-row">            
                    <h3 style={{color:'black'}}>Monthly Application Analysis</h3>           
              </div>
              <div className="ms-Grid-row">
                <FinancialCharts />
              </div>
            </div>
    </div>          
        </div>
      </div>
    </div>
);
}

export default Analytics;
