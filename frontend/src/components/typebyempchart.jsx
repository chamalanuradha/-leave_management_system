import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Import and register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,   // for "category" scale (x-axis labels)
  LinearScale,     // for numeric y-axis
  BarElement,      // for bars in bar chart
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { api } from '../services/api';

export default function LeaveTypePerUserChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    api.get('/leaves/type-per-user').then(res => {
      const data = res.data.data; // array of { user, types: [{ type, count }] }

      // Get unique leave types across all users
      const allTypes = new Set();
      data.forEach(user => {
        user.types.forEach(t => allTypes.add(t.type));
      });

      const leaveTypes = [...allTypes]; // unique leave types
      const labels = data.map(user => user.user); // user names for x-axis

      // Build datasets for each leave type
      const datasets = leaveTypes.map(type => ({
        label: type,
        data: data.map(user => {
          const match = user.types.find(t => t.type === type);
          return match ? match.count : 0;
        }),
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`, // random color with padding
      }));

      setChartData({ labels, datasets });
    });
  }, []);

  if (!chartData) return <p>Loading Chart...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
  
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Leave Types by Employee',
            },
          },
        }}
      />
    </div>
  );
}
