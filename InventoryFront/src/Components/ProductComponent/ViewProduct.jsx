import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../Services/ProductService";
import { getUserRole } from "../../Services/LoginService";

const ViewProduct = () => {
  const [product, setProduct] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { pid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodResponse = await getProductById(pid);
        setProduct(prodResponse.data || null);

        const roleResponse = await getUserRole();
        setRole(roleResponse.data || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pid]);

  const returnBack = () => {
    navigate("/ProdRepo");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      <div className="view-page">
        <div className="view-card">
          <h2 className="view-title">Product Details</h2>

          {product ? (
            <div className="product-details">
              {[
                ["Product Id", product.productId],
                ["Vendor Id", product.vendorId],
                ["Product Name", product.productName],
                ["SKU", product.sku],
                ["Purchase Price", product.purchasePrice],
                ["Sales Price", product.salesPrice],
                ["Reorder Level", product.reorderLevel],
                ["Stock", product.stock],
                [
                  "Status",
                  product.status === true ? (
                    <span className="status-active">Permitted to Issue</span>
                  ) : (
                    <span className="status-inactive">Reorder Level Reached</span>
                  ),
                ],
              ].map(([label, value], index) => (
                <div key={index} className="detail-row">
                  <div className="detail-label">{label}</div>
                  <div className="detail-value">{value}</div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>No product found</p>
          )}

          <div className="button-container">
            <button className="btn-theme" onClick={returnBack}>
              Return
            </button>
          </div>
        </div>
      </div>

      {/* 🌊 Modern View Product Theme - Light Blue Refined */}
      <style>{`
        /* ===== Background ===== */
        .view-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Poppins", sans-serif;
          overflow: hidden;
          background: linear-gradient(135deg, #e3f2fd, #f9fcff);
        }

        .view-page::before {
          content: "";
          position: absolute;
          top: -20%;
          left: -20%;
          width: 150%;
          height: 150%;
          background: radial-gradient(circle at 25% 25%, #a8dadc, transparent 60%),
                      radial-gradient(circle at 80% 80%, #457b9d, transparent 70%),
                      radial-gradient(circle at 50% 10%, #1d3557, transparent 60%);
          animation: waveMove 12s ease-in-out infinite alternate;
          z-index: 0;
          opacity: 0.35;
          filter: blur(60px);
          transform: scale(1.2);
        }

        @keyframes waveMove {
          0% { transform: translateY(0px) scale(1.2); }
          50% { transform: translateY(-25px) scale(1.25); }
          100% { transform: translateY(0px) scale(1.2); }
        }

        /* ===== Card ===== */
        .view-card {
          position: relative;
          z-index: 2;
          background: linear-gradient(135deg, #1d3557, #457b9d);
          color: #f1faee;
          border-radius: 16px;
          padding: 40px 35px;
          width: 600px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          border: 1px solid #a8dadc;
        }

        .view-title {
          text-align: center;
          color: #f1faee;
          font-weight: 700;
          font-size: 1.8rem;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* ===== New Details Layout ===== */
        .product-details {
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: #f1faee;
          border-radius: 14px;
          padding: 25px 28px;
          box-shadow: inset 0 0 12px rgba(69, 123, 157, 0.15);
          color: #1d3557;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-radius: 10px;
          background: #ffffff;
          border: 1px solid #a8dadc;
          transition: all 0.25s ease;
        }

        .detail-row:hover {
          background-color: #d6eff5;
          transform: translateY(-2px);
          box-shadow: 0 3px 6px rgba(69, 123, 157, 0.2);
        }

        .detail-label {
          font-weight: 600;
          color: #1d3557;
        }

        .detail-value {
          color: #457b9d;
          font-weight: 500;
        }

        /* ===== Status Colors ===== */
        .status-active {
          color: #1d3557;
          font-weight: 600;
          background: #a8dadc;
          padding: 4px 10px;
          border-radius: 8px;
        }

        .status-inactive {
          color: #e63946;
          font-weight: 600;
          background: #ffe6e6;
          padding: 4px 10px;
          border-radius: 8px;
        }

        /* ===== Button ===== */
        .button-container {
          text-align: center;
          margin-top: 30px;
        }

        .btn-theme {
          background-color: #a8dadc;
          color: #1d3557;
          font-weight: 600;
          padding: 11px 28px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-theme:hover {
          background-color: #1d3557;
          color: #f1faee;
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .view-card {
            width: 90%;
            padding: 25px 20px;
          }
          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
        }
      `}</style>
    </>
  );
};

export default ViewProduct;
