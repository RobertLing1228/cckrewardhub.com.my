import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DashboardChart = ({loginsPerMonthData, missionsPerMonthData, sucessfulClaim, failedClaim}) => {
  const barChartRef = useRef(null);
  const completionChartRef = useRef(null);
  const pieChartRef = useRef(null);

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

    // Bar Chart (Mission Completion Per Month)
    const completionCtx = completionChartRef.current.getContext("2d");
    chartInstances.current.push(
      new Chart(completionCtx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Mission Completions",
              data: missionsPerMonthData,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
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
                  return Number.isInteger(value) ? value : null;
                },
                stepSize: 1,
              },
              beginAtZero: true,
            },
          },
        },
      })
    );

    // Pie Chart (Claim Success vs Failed Today)
      const claimsPieCtx = pieChartRef.current.getContext("2d");
      chartInstances.current.push(
        new Chart(claimsPieCtx, {
          type: "pie",
          data: {
            labels: ["Successful", "Failed"],
            datasets: [
              {
                label: "Today's Claims",
                data: [sucessfulClaim, failedClaim],
                backgroundColor: ["#4CAF50", "#F44336"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        })
      );

    return () => {
      chartInstances.current.forEach((chart) => chart.destroy());
    };
  }, [loginsPerMonthData, missionsPerMonthData, sucessfulClaim, failedClaim]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Logins Per Month</h3>
        <div className="w-full h-72">
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>

      {/* Completion Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Mission Completions</h3>
        <div className="w-full h-72">
          <canvas ref={completionChartRef}></canvas>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Claims</h3>
        <div className="w-full h-72">
          {(sucessfulClaim === 0 && failedClaim === 0) ? (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No claims today.
            </div>
          ) : null}
          <canvas ref={pieChartRef}  style={{ display: (sucessfulClaim === 0 && failedClaim === 0) ? "none" : "block" }}></canvas>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
