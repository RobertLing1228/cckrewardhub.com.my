import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DashboardChart = ({loginsPerMonthData}) => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  const chartInstances = useRef([]);

  console.log(loginsPerMonthData);

  
  useEffect(() => {
    // Destroy previous charts if they exist to prevent duplication
    chartInstances.current.forEach((chart) => chart?.destroy());
    chartInstances.current = [];

    // Bar Chart (Sales Data)
    const barCtx = barChartRef.current.getContext("2d");
    chartInstances.current.push(
      new Chart(barCtx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Logins",
              data: loginsPerMonthData,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: { 
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  // Only show whole numbers
                  return Number.isInteger(value) ? value : null;
                },
                stepSize: 1,
              },
              beginAtZero: true,
            },
          
          },
        }
      })
    );

    // Pie Chart (User Distribution)
    const pieCtx = pieChartRef.current.getContext("2d");
    chartInstances.current.push(
      new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: ["Admin", "Users", "Guests"],
          datasets: [
            {
              label: "Users",
              data: [10, 50, 40],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      })
    );

    // Doughnut Chart (Revenue Breakdown)
    const doughnutCtx = doughnutChartRef.current.getContext("2d");
    chartInstances.current.push(
      new Chart(doughnutCtx, {
        type: "doughnut",
        data: {
          labels: ["Product A", "Product B", "Product C"],
          datasets: [
            {
              label: "Revenue",
              data: [200, 150, 100],
              backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF"],
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      })
    );

    return () => {
      chartInstances.current.forEach((chart) => chart.destroy());
    };
  }, [loginsPerMonthData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Logins Per Month</h3>
        <div className="w-full h-72">
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">User Distribution</h3>
        <div className="w-full h-72">
          <canvas ref={pieChartRef}></canvas>
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Revenue Breakdown</h3>
        <div className="w-full h-72">
          <canvas ref={doughnutChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
