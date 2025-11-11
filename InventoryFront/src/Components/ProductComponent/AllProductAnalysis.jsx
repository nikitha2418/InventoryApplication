import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AllProductAnalysis = () => {
  const navigate = useNavigate();
  const [productSale, setProductSale] = useState([]);

  const setProductSalesData = () => {
    fetch("http://localhost:9898/inventory/analysis")
      .then((res) => res.json())
      .then((data) => {
        // ✅ data may look like: { "Product A": 5000, "Product B": 7000 }
        // We'll fetch product IDs separately and merge them
        fetch("http://localhost:9898/inventory/product")
          .then((res2) => res2.json())
          .then((productList) => {
            // productList = [{productId:"P10001", productName:"Product A"}, ...]
            const formatted = Object.entries(data).map(([name, sales]) => {
              const found = productList.find(
                (p) => p.productName.trim().toLowerCase() === name.trim().toLowerCase()
              );
              return {
                productId: found ? found.productId : name, // fallback
                productName: name,
                totalSalesValue: sales,
              };
            });
            setProductSale(formatted);
          });
      })
      .catch((err) => console.error("Error fetching analysis:", err));
  };

  useEffect(() => {
    setProductSalesData();
  }, []);

  const chartData = {
    labels: productSale.map((p) => p.productName),
    datasets: [
      {
        data: productSale.map((p) => p.totalSalesValue),
        backgroundColor: [
             "#FF6384",
             "#36A2EB",
             "#FFCE56",
             "#4BC0C0",
             "#9966FF",
             "#FF9F40",
           ],
      },
    ],
  };

  const returnBack = () => {
    navigate("/AdminMenu");
  };

  const viewProductDemand = (productId) => {
    navigate(`/prod-demand/${productId}`);
  };

  return (
    <div className="analysis-container">
      <div className="analysis-card">
        <h3 className="analysis-title">Product Sale Dashboard</h3>

        <div className="analysis-row">
          <div className="chart-section">
            <h5>Total Sale per Product</h5>
            <div className="chart-wrapper">
              <Pie data={chartData} />
            </div>
          </div>

          <div className="table-section">
            <table className="analysis-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Sales Amount</th>
                </tr>
              </thead>
              <tbody>
                {productSale.map((p, i) => (
                  <tr
                    key={i}
                    onClick={() => viewProductDemand(p.productId)}
                    style={{ cursor: "pointer" }}
                    title="Click to view demand trend"
                  >
                    <td>{p.productId}</td>
                    <td>{p.productName}</td>
                    <td>{p.totalSalesValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="return-container">
          <button onClick={returnBack} className="return-btn">
            Return
          </button>
        </div>
      </div>

      {/* ===== Internal CSS ===== */}
      <style>{`
        .analysis-container {
          background: linear-gradient(135deg, #e3f2fd, #f1faee);
          min-height: 100vh;
          padding: 50px 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .analysis-card {
          background: linear-gradient(135deg, #1d3557, #457b9d);
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          padding: 40px 45px;
          width: 95%;
          max-width: 1100px;
          color: #f1faee;
          border: 1px solid #a8dadc;
        }

        .analysis-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 40px;
          color: #f1faee;
        }

        .analysis-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          flex-wrap: wrap;
        }

        .chart-section {
          flex: 1;
          min-width: 300px;
          text-align: center;
        }

        .chart-section h5 {
          color: #a8dadc;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .chart-wrapper {
          background: #f1faee;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          width: 320px;
          margin: 0 auto;
        }

        .table-section {
          flex: 2;
          min-width: 400px;
        }

        .analysis-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 12px;
          overflow: hidden;
          background: #f1faee;
          color: #1d3557;
        }

        .analysis-table th {
          background-color: #457b9d;
          color: #f1faee;
          padding: 14px;
          text-align: center;
          font-weight: 600;
        }

        .analysis-table td {
          border-bottom: 1px solid #a8dadc;
          padding: 12px;
          text-align: center;
        }

        .analysis-table tr:nth-child(even) {
          background-color: #e9f5f5;
        }

        .analysis-table tr:hover {
          background-color: #d8eff0;
          transition: background 0.3s ease;
        }

        .return-container {
          text-align: center;
          margin-top: 40px;
        }

        .return-btn {
          background-color: #a8dadc;
          border: none;
          color: #1d3557;
          padding: 12px 28px;
          font-size: 1rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .return-btn:hover {
          background-color: #457b9d;
          color: #f1faee;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .analysis-card {
            padding: 25px 20px;
          }

          .analysis-row {
            flex-direction: column;
            align-items: center;
          }

          .chart-wrapper {
            width: 90%;
          }

          .table-section {
            width: 100%;
          }

          .return-btn {
            width: 80%;
          }
        }
      `}</style>
    </div>
  );
};

export default AllProductAnalysis;
