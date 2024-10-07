import React, { useEffect, useState } from "react";
//import Adminlayout from "../layouts/Adminlayout";
import Layout from "../layouts/Layout";
import Adminlayout from "../layouts/Adminlayout";
import "../css/dashboard.css";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

const Admin = () => {
  const [dashboardCount, setDashboardCount] = useState([]);

  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  useEffect(() => {
    axios
      .get("https://localhost:7022/admin/dashboardcounts")
      .then((response) => {
        setDashboardCount(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const labels = ["Customers", "Orders", "Vendors", "Products"];
  const values = [
    dashboardCount.totalCustomers,
    dashboardCount.totalOrders,
    dashboardCount.totalVendors,
    dashboardCount.totalProducts,
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#f8b400", "#ff4b5c", "#6a82fb", "#3d3d3d"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dashboard Overview",
      },
    },
  };

  return (
    <Layout>
      <Adminlayout />

      <div className="dashboard">
        <div className="box" style={{ backgroundColor: "#f8b400" }}>
          <h2>Total Customers</h2>
          <p>{dashboardCount.totalCustomers}</p>
        </div>
        <div className="box" style={{ backgroundColor: "#ff4b5c" }}>
          <h2>Total Orders</h2>
          <p>{dashboardCount.totalOrders}</p>
        </div>
        <div className="box" style={{ backgroundColor: "#6a82fb" }}>
          <h2>Total Vendors</h2>
          <p>{dashboardCount.totalVendors}</p>
        </div>
        <div
          className="box"
          style={{ backgroundColor: "#3d3d3d", color: "white" }}
        >
          <h2>Total Products</h2>
          <p>{dashboardCount.totalProducts}</p>
        </div>
      </div>
      <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
        <Pie data={chartData} options={options} />
      </div>
    </Layout>
  );
};

export default Admin;
