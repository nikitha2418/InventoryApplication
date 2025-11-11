import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, stockUpdate } from "../../Services/ProductService";
import { getUserRole } from "../../Services/LoginService";

const EditStock = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState("");//
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);
  const [flag, setFlag] = useState(1); // 1 = Purchase, 2 = Issue

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(pid);
        setProduct(res.data);
        const urlParams = new URLSearchParams(window.location.search);
        setFlag(Number(urlParams.get("flag")) || 1);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [pid]);

  useEffect(() => {
    getUserRole().then((res) => setRole(res.data));
  }, []);

  const returnBack = () => {
    if (role === "Admin") navigate("/AdProdRepo");
    else if (role === "Manager") navigate("/MngProdRepo");
  };

  const handleStockUpdate = async () => {
    if (!qty || qty <= 0) {
      alert("Enter a valid quantity");
      return;
    }
    try {
      await stockUpdate(product, qty, flag);
      alert(flag === 1 ? "Stock increased (Purchase)" : "Stock decreased (Issue)");
      returnBack();
    } catch (err) {
      console.error("Error updating stock:", err);
      alert("Error updating stock. Check backend and CORS.");
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="edit-stock-container">
      <div className="edit-stock-card">
        <h2 className="edit-stock-title">
          <u>{flag === 1 ? "Product Purchase" : "Product Issue"}</u>
        </h2>

        <table className="product-details-table">
          <tbody>
            {[
              ["Product Id", product.productId],
              ["SKU", product.sku],
              ["Product Name", product.productName],
              ["Purchase Price", product.purchasePrice],
              ["Sales Price", product.salesPrice],
              ["Reorder Level", product.reorderLevel],
              ["Current Stock", product.stock],
              ["Vendor Id", product.vendorId],
            ].map(([label, value], index) => (
              <tr key={index}>
                <td>{label}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-group">
          <label>
            {flag === 1
              ? "Enter Purchased Stock Quantity:"
              : "Enter Issued Stock Quantity:"}
          </label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>

        <div className="button-group">
          <button className="btn cancel-btn" onClick={returnBack}>
            Cancel
          </button>
          <button className="btn save-btn" onClick={handleStockUpdate}>
            {flag === 1 ? "Purchase" : "Issue"}
          </button>
        </div>
      </div>

      {/* Internal CSS */}
      <style>{`
        .edit-stock-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(to bottom, #6da6c1, #3f7b9d);
        }

        .edit-stock-card {
          width: 100%;
          max-width: 600px;
          background-color: #f1faee;
          padding: 35px 30px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          text-align: center;
        }

        .edit-stock-title {
          font-size: 2em;
          font-weight: 700;
          margin-bottom: 25px;
          background: linear-gradient(90deg, #2a9d8f, #21867a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }

        .product-details-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .product-details-table td {
          padding: 10px 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          transition: all 0.3s ease;
        }

        .product-details-table tr:hover td {
          background-color: #e0f7fa;
          color: #00695c;
          
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 5px;
          display: block;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
        }

        .btn {
          flex: 1;
          padding: 10px 25px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          border: none;
          color: #fff;
          transition: all 0.3s ease;
        }

        .cancel-btn {
          background-color: #e63946;
          margin-right: 10px;
        }

        .cancel-btn:hover {
          background-color: #d62839;
        }

        .save-btn {
          background-color: #2a9d8f;
          margin-left: 10px;
        }

        .save-btn:hover {
          background-color: #23867a;
        }
      `}</style>
    </div>
  );
};

export default EditStock;