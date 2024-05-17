import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const Home = () => {
  const [loanData, setLoanData] = useState({
    applied: 0,
    approved: 0,
    denied: 0,
    waiting: 0,
  });

  const [monthlyData, setMonthlyData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    data: [0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    // Fetch the loan data from the backend
    axios
      .get("http://localhost:5001/api/loans")
      .then((response) => {
        const loans = response.data;
        const applied = loans.length;
        const approved = loans.filter(
          (loan) => loan.status === "approved"
        ).length;
        const denied = loans.filter((loan) => loan.status === "denied").length;
        const waiting = loans.filter(
          (loan) => loan.status === "waiting decision"
        ).length;

        setLoanData({ applied, approved, denied, waiting });

        const monthlyCounts = new Array(7).fill(0); // Assuming data for (Jan-Jul)
        loans.forEach((loan) => {
          const month = new Date(loan.createdAt).getMonth();
          if (month >= 0 && month < 7) {
            monthlyCounts[month]++;
          }
        });

        setMonthlyData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          data: monthlyCounts,
        });
      })
      .catch((error) => console.error("Error fetching loan data:", error));
  }, []);

  // Data for the bar chart
  const barData = {
    labels: ["Applied", "Approved", "Denied", "Waiting Decision"],
    datasets: [
      {
        label: "Loans by status",
        data: [
          loanData.applied,
          loanData.approved,
          loanData.denied,
          loanData.waiting,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Data for the line chart
  const lineData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Repayments by month",
        data: monthlyData.data,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  // Options for the line chart
  const lineOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Loans Distribution</h2>
      <div className="card mb-4">
        <div className="card-body">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <h2 className="mb-4">Loans Analytic</h2>
      <div className="card">
        <div className="card-body">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default Home;
