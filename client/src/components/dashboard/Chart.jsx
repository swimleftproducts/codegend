 import React, {useEffect,useState} from 'react';
 import axios from 'axios';
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
      text: 'Visits Per Month',
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
      }
    }
  },
  maintainAspectRatio: false
};




function Charts() {
  const [info,setInfo]=useState({})
  const [chartData, setChartData]=useState({
    labels: [],
      datasets: [
        {
         
        },
        {
         
        },
      ],
  })

  async function getUserStats(){
    let response = await axios('/api/analytics/userStats/622161f2f5d6d6e7587e0c33/6')
    let userStats= await response.data
    let labels=userStats.monthlyData.months
    let monthlyData=userStats.monthlyData.data
    let cumulativeData=userStats.cumulativeData.data
    setInfo(userStats)
    chart(labels,monthlyData,cumulativeData)
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
          label: 'Dataset 2',
          data: monthlyData,
          borderColor: '#424ead',
          backgroundColor: '#424ead',
        },
      ],
    })
  }
  useEffect(() => { 
    getUserStats()
  },[])




  return (
    <div className='chartHolder'>
    <Chart className={"chart"} type='bar' data={chartData} options={options}/>
    </div>
   
  )
}

export default Charts
