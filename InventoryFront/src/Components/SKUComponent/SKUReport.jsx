import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { showAllSKUs, removeSKU } from "../../Services/SKUService";
import { getUserRole } from "../../Services/LoginService";

const SKUReport = () => {
  const navigate = useNavigate();
  const [skuList, setSkuList] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    showAllSKUs().then((response) => {
      setSkuList(response.data);
    });

    getUserRole().then((response) => {
      setRole(response.data || "");
    });
  }, []);

  const deleteSKU = (id) => {
    removeSKU(id).then(() => {
      setSkuList(skuList.filter((sku) => sku.skuId !== id));
    });
  };

  const returnBack = () => {
    if (role === "Admin") navigate("/AdminMenu");
    else if (role === "Manager") navigate("/ManagerMenu");
    else navigate(-1);
  };

  return (
    <div className="view-product-container">
      <div className="table-card">
        <h2 className="view-product-title">SKU List</h2>

        <table className="view-product-table">
          <thead>
            <tr>
              <th>SKU Id</th>
              <th>Description</th>
              {/* Only show Update/Delete headers for non-managers */}
              {role !== "Manager" && (
                <>
                  <th>Update SKU</th>
                  <th>Delete SKU</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {skuList.length > 0 ? (
              skuList.map((sku) => (
                <tr key={sku.skuId}>
                  <td>{sku.skuId}</td>
                  <td>{sku.skuDescription}</td>

                  {/* Only show Update/Delete buttons for non-managers */}
                  {role !== "Manager" && (
                    <>
                      <td>
                        <Link to={`/update-sku/${sku.skuId}`}>
                          <button className="btn-view">Update</button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => deleteSKU(sku.skuId)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role !== "Manager" ? 4 : 2}>No SKUs available</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="return-button-container">
          <button className="return-button" onClick={returnBack}>
            Return
          </button>
        </div>
      </div>

      {/* same CSS — unchanged */}
      <style>{`
        .view-product-container {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          background: linear-gradient(135deg, #e3f2fd, #f9fcff);
          overflow: hidden;
          font-family: "Poppins", sans-serif;
          padding: 80px 0;
        }

        .view-product-container::before {
          content: "";
          position: absolute;
          top: -20%;
          left: -20%;
          width: 150%;
          height: 150%;
          background: radial-gradient(circle at 20% 20%, #a8dadc, transparent 60%),
                      radial-gradient(circle at 80% 80%, #457b9d, transparent 70%),
                      radial-gradient(circle at 50% 10%, #1d3557, transparent 60%);
          animation: waveMove 12s ease-in-out infinite alternate;
          z-index: 0;
          opacity: 0.35;
          filter: blur(50px);
        }

        @keyframes waveMove {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }

        .table-card {
          position: relative;
          z-index: 2;
          background: linear-gradient(135deg, #1d3557, #457b9d);
          border-radius: 18px;
          padding: 40px 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 1px solid #a8dadc;
          width: 80%;
          max-width: 900px;
        }

        .view-product-title {
          text-align: center;
          color: #f1faee;
          font-weight: 700;
          font-size: 1.8rem;
          text-transform: uppercase;
          margin-bottom: 25px;
        }

        .view-product-table {
          width: 100%;
          border-collapse: collapse;
          background: transparent;
          color: #f1faee;
        }

        .view-product-table th, 
        .view-product-table td {
          padding: 14px 16px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .view-product-table th {
          background-color: rgba(255,255,255,0.1);
          font-weight: 600;
          text-transform: uppercase;
        }

        .view-product-table tbody tr:nth-child(even) {
          background-color: rgba(255,255,255,0.05);
        }

        .view-product-table tbody tr:hover {
          background-color: rgba(255,255,255,0.15);
        }

        .btn-view, .btn-delete {
          border-radius: 8px;
          cursor: pointer;
          padding: 6px 12px;
          font-weight: 600;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-view {
          background-color: #a8dadc;
          color: #1d3557;
        }

        .btn-view:hover {
          background-color: #1d3557;
          color: #f1faee;
        }

        .btn-delete {
          background-color: #e63946;
          color: #f1faee;
        }

        .btn-delete:hover {
          background-color: #b5171a;
        }

        .return-button-container {
          text-align: center;
          margin-top: 25px;
        }

        .return-button {
          color: #a8dadc;
          background-color: #1d3557;
          font-weight: 700;
          padding: 12px 40px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .return-button:hover {
          color: #1d3557;
          background-color: #a8dadc;
          transform: translateY(-2px);
        }

        @media (max-width: 700px) {
          .table-card {
            width: 95%;
            padding: 25px 15px;
          }

          .view-product-table th, .view-product-table td {
            font-size: 0.9rem;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SKUReport;
