import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


export default class AnalyticsCharts extends Component {

constructor(props){
    super(props);
    this.state={
        chartData1:{
            labels:['Jan', 'Feb', 'March', 'April', 'May'],
            datasets:[{
                label:'income',
                data:[50,70,25,47,90],
                backgroundColor: [
                    'rgba(255,99,132,0.6)',
                    'rgba(255,99,132,0.6)',
                    'rgba(255,99,132,0.6)',
                    'rgba(255,99,132,0.6)',
                    'rgba(255,99,132,0.6)'
                    
                ]
            },{
                label:'expense',
                data:[30,50,15,33,75],
                backgroundColor: [
                    
                    'rgba(54,152,235,0.6)',
                    'rgba(54,152,235,0.6)',
                    'rgba(54,152,235,0.6)',
                    'rgba(54,152,235,0.6)',
                    'rgba(54,152,235,0.6)'
                    
                ]
            }]
        },
        chartData2:{
            labels:['Jan', 'Feb', 'March', 'April', 'May'],
            datasets:[{
                label:'Profit',
                data:[10,0,30,42,0],
                backgroundColor: [
                    'rgba(255,99,132,0.6)',
                    'rgba(255,99,132,0.6)',
                    'rgba(255,99,132,0.6)',
                    'rgba(255,99,132,0.6)',
                    'rgba(255,99,132,0.6)'
                    
                ]
            },{
                label:'Loss',
                data:[0,5,0,0,10],
                backgroundColor: [
                    
                    'rgba(54,152,235,0.6)',
                    'rgba(54,152,235,0.6)',
                    'rgba(54,152,235,0.6)',
                    'rgba(54,152,235,0.6)',
                    'rgba(54,152,235,0.6)'
                    
                ]
            }]
        }
    }

}

static defaultProps={
    displayTitle:true,
    displayLegend: true,
    legendPosition: 'right'
}

  render() {
    return ( 
      <div>
        
    


<Bar
          data={this.state.chartData1}
          options={{
            responsive:true,
            title:{
                display:this.props.displayTitle,
                text:'Income and Expense',
                fontSize:20
          },
        legend:{
            display:true,
            position: 'right',
            labels:{
                fontColor:'#000'
            }
        },
        layout:{
            padding:{
                left:50,
                right:0,
                bottom:50,
                top:50
            }
        },        
    tooltips:{
        enabled: true
    }}}
        />

        
<Line
          data={this.state.chartData2}
          options={{
            responsive:true,
            title:{
                display:this.props.displayTitle,
                text:'Profit and Loss',
                fontSize:20
          },
        legend:{
            display:true,
            position: 'right',
            labels:{
                fontColor:'#000'
            }
        },
        layout:{
            padding:{
                left:50,
                right:0,
                bottom:50,
                top:50
            }
        },        
    tooltips:{
        enabled: true
    }}}
        />
      </div>
    );
  }
}
