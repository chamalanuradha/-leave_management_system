import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};


function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export default function LeaveStatusChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    api.get('/leaves/status-summary').then(res => {
      const data = res.data.data;

      const labels = data.map(item => item.status);
      const totals = data.map(item => item.total);

     
      const backgroundColors = labels.map(() => getRandomColor());

      setChartData({
        labels,
        datasets: [{
          data: totals,
          backgroundColor: backgroundColors,
        }],
      });
    }).catch(() => {
      setChartData(null);
    });
  }, []);

  if (!chartData) return <p>Loading Chart...</p>;

  return (
    <div className="max-w-md mx-auto" style={{ width: 400, height: 400 }}>
      <Pie data={chartData} options={options} />
    </div>
  );
}
