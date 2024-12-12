import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App2.css';

function App2() {
  const [month, setMonth] = useState(3);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/sales/${month}`);
      setStats({
        totalSales: response.data.totalSales,
        totalSoldItems: response.data.totalSoldItems,
        totalUnsoldItems: response.data.totalUnsoldItems,
      });
    } catch (error) {
      console.error("Error fetching sales data", error);
    }
  };

  const chartData = [
    { name: "Total Sales", value: stats.totalSales },
    { name: "Sold Items", value: stats.totalSoldItems },
    { name: "Unsold Items", value: stats.totalUnsoldItems },
  ];

  return (
    <div className="container-fluid bg-dark text-light fw-bold text-center" style={{ marginTop: "150px" }}>
      <h1 className='text-warning'>Sales Dashboard</h1>
      <label htmlFor="month-select">Select Month:</label>
      <select
        id="month-select"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <button onClick={fetchSalesData} className='btn btn-success fw-bold mx-2'>Get Sales Data</button>

      <div className="stats mt-4">
        <p>Total Sales: ${stats.totalSales.toFixed(2)}</p>
        <p>Total Sold Items: {stats.totalSoldItems}</p>
        <p>Total Unsold Items: {stats.totalUnsoldItems}</p>
      </div>

      <div className="chart-container mt-5 justify content-center">
        <h2 className="text-warning">Sales Data Bar Chart</h2>
       <div style={{display:"flex", justifyContent:"center"}}>
       <div style={{width:"50%"}}>
       <BarChart
          width={600}
           height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
       </div>
       </div>
      </div>
    </div>
  );
}

export default App2;
