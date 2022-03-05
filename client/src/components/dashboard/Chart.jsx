 import React, {useEffect,useContext,useState} from 'react';
 import axios from 'axios';
 import { UserStatsContext } from '../UserStatsContext';
 import {Line, Bar, Chart} from 'react-chartjs-2'
 import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' 
    },
    title: {
      display: true,
      text: 'Your Visits',
    }
  },
  scales:{
    x:{
      grid:{
        display:false
      }
    },
    y:{
      grid:{
        display:false
      },
      ticks:{
        precision:0
      }
    }
  },
  maintainAspectRatio: false
};




function Charts() {

  const{info}=useContext(UserStatsContext)
 
  const [chartData, setChartData]=useState({
    labels: [],
    datasets: [{},{}],
  })

  function prepChartData(){
    
    if(info.userStats){
        let labels=info.userStats.monthlyData.months
        let monthlyData=info.userStats.monthlyData.data
        let cumulativeData=info.userStats.cumulativeData.data
        chart(labels,monthlyData,cumulativeData)
    }
  }

  const chart =(labels,monthlyData,cumulativeData) =>{
    setChartData({
      labels: labels,
      datasets: [
        {
          type:"line",
          label: 'Total Visits',
          data: cumulativeData,
          borderColor: '#2d303f',
          backgroundColor: '#2d303f',
          hoverBorderColor: "white",
          hoverBorderWidth: 3
        },
        {
          type:"bar",
          label: 'Monthly Visits',
          data: monthlyData,
          borderColor: '#B9C3FF',
          backgroundColor: '#b9c3ff',
          borderWidth: 3,
        }, 
      ],
    })
  }
  useEffect(() => { 
    prepChartData()
  },[info])




  return (
    <div className='chartHolder'>
    <Chart className={"chart"} type='bar' data={chartData} options={options}/>
    </div>
   
  )
}

export default Charts
