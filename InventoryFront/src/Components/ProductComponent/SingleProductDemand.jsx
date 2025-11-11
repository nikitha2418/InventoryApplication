import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import "../../LoginView.css"; // keep consistent theme

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const SingleProductDemand = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const [demandData, setDemandData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:9898/inventory/analysis/${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setDemandData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching demand data:", err);
        setLoading(false);
      });
  }, [pid]);

  if (loading)
    return (
      <div className="main-container">
        <h3 className="page-title">Loading Demand Data...</h3>
      </div>
    );

  if (!demandData || demandData.length === 0)
    return (
      <div className="main-container">
        <h3 className="page-title">No Demand Data Found for {pid}</h3>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => navigate("/all-products")}
            style={{
              backgroundColor: "#457b9d",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            ← Back to Analysis
          </button>
        </div>
      </div>
    );

  // Chart setup
  const chartData = {
    labels: demandData.map((_, i) => `Period ${i + 1}`),
    datasets: [
      {
        label: `Demand for ${pid}`,
        data: demandData,
        borderColor: "#1d3557",
        backgroundColor: "rgba(69, 123, 157, 0.2)",
        pointBackgroundColor: "#457b9d",
        pointBorderColor: "#1d3557",
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#1d3557",
          font: { size: 14, weight: "bold" },
        },
      },
      title: {
        display: true,
        text: `Demand Trend for Product ${pid}`,
        color: "#1d3557",
        font: { size: 20, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#1d3557", font: { weight: "bold" } },
        grid: { color: "rgba(29, 53, 87, 0.1)" },
      },
      y: {
        ticks: { color: "#1d3557", font: { weight: "bold" } },
        grid: { color: "rgba(29, 53, 87, 0.1)" },
      },
    },
  };

  // Demand summary
  const avgDemand = (
    demandData.reduce((a, b) => a + b, 0) / demandData.length
  ).toFixed(2);
  const maxDemand = Math.max(...demandData);
  const minDemand = Math.min(...demandData);

  return (
    <div
      className="main-container"
      style={{
        backgroundColor: "#1d3557",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <div
        className="card-container"
        style={{
          backgroundColor: "#f1faee",
          width: "75%",
          margin: "auto",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            color: "#1d3557",
            fontWeight: "bold",
            marginBottom: "25px",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Single Product Demand Analysis
        </h2>

        <Line data={chartData} options={options} />

        <div
          className="details-section"
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#e9f3f7",
            borderRadius: "10px",
            textAlign: "center",
            color: "#1d3557",
            fontWeight: "500",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <h4 style={{ fontWeight: "bold" }}>Demand Summary</h4>
          <p>
            <b>Average Demand:</b> {avgDemand}
          </p>
          <p>
            <b>Highest Demand:</b> {maxDemand}
          </p>
          <p>
            <b>Lowest Demand:</b> {minDemand}
          </p>
        </div>

        {/* Return button */}
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <button
            onClick={() => navigate("/all-products")}
            style={{
              backgroundColor: "#457b9d",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d3557")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#457b9d")}
          >
            ← Back to All Products Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDemand;