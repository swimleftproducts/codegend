 import React from 'react';
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
const labels = ['January', 'February', 'March'];

export const data = {
  labels,
  datasets: [
    {
      type:"line",
      label: 'Total Visits',
      data: [1,2,3,4,5,6,7,8,9,10,11,12],
      borderColor: '#2d303f',
      backgroundColor: '#2d303f',
      hoverBorderColor: "white",
      hoverBorderWidth: 3
    },
    {
      type:"bar",
      label: 'Dataset 2',
      data: [5,6,1],
      borderColor: '#424ead',
      backgroundColor: '#424ead',
    },
  ],
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' 
    },
    title: {
      display: true,
      text: 'Visits Per Month',
    },
  },
};

function Charts() {
  return (
    <div className='chart'>
    
     <Chart type='bar' data={data} />
    
    </div>
   
  )
}

export default Charts

