import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, stockUpdate } from "../../Services/ProductService";
import { getSingleUserDetails } from "../../Services/LoginService";
import {
  saveTransaction,
  generateTransactionId,
} from "../../Services/TransactionService";

const EditStock = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const alertShown = useRef(false);

  const [newId, setNewId] = useState("");
  const [qty, setQty] = useState("");
  const [flag, setFlag] = useState(1);
  const [transactionDate, setTransactionDate] = useState("");
  const [product, setProduct] = useState({});
  const [iUser, setIUser] = useState({});
  const [errors, setErrors] = useState({ qty: "", transactionDate: "" });

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTransactionDate(today);

    getProductById(pid)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));

    getSingleUserDetails()
      .then((res) => setIUser(res.data))
      .catch((err) => console.error(err));

    generateTransactionId()
      .then((res) => setNewId(res.data))
      .catch((err) => console.error(err));

    const urlParams = new URLSearchParams(window.location.search);
    setFlag(Number(urlParams.get("flag")) || 1);
  }, [pid]);

  useEffect(() => {
    if (
      product.productId &&
      flag === 2 &&
      product.stock === 0 &&
      !alertShown.current
    ) {
      alertShown.current = true;
      alert(`Cannot issue "${product.productName}" — Out of stock.`);
      navigate("/ProdRepo");
    }
  }, [product, flag, navigate]);

  const getRate = () =>
    flag === 1 ? product.purchasePrice || 0 : product.salesPrice || 0;

  const qtyNumber = qty === "" ? 0 : Number(qty);
  const transactionValue = qty !== "" ? qtyNumber * getRate() : 0;

  const handleSave = () => {
    const newErrors = {};
    let valid = true;

    if (qty === "" || qtyNumber <= 0) {
      newErrors.qty = "Enter valid quantity";
      valid = false;
    } else if (flag === 2 && qtyNumber > (product.stock || 0)) {
      newErrors.qty = "Issued qty exceeds available stock";
      valid = false;
    }

    if (!transactionDate.trim()) {
      newErrors.transactionDate = "Transaction date required";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    const rate = getRate();
    const transactionData = {
      transactionId: newId,
      transactionType: flag === 1 ? "IN" : "OUT",
      productId: product.productId,
      rate,
      quantity: qtyNumber,
      transactionValue: qtyNumber * rate,
      userId: iUser.username,
      transactionDate: formatDate(transactionDate),
    };

    stockUpdate(product, qtyNumber, flag)
      .then(() => saveTransaction(transactionData))
      .then(() => {
        alert(flag === 1 ? "Purchase recorded!" : "Issue recorded!");
        navigate("/ProdRepo");
      })
      .catch(() => alert("Error saving transaction"));
  };

  const handleReturn = () => navigate("/ProdRepo");

  if (!product.productId) return <p>Loading...</p>;

  const getStatus = () => {
    const stock = product.stock || 0;
    const reorder = product.reorderLevel || 0;
    if (stock < reorder)
      return { text: "Reorder Level Reached", color: "#e63946" };
    return { text: "Permitted to Issue", color: "#457b9d" };
  };

  const { text: statusText, color: statusColor } = getStatus();

  return (
    <div className="edit-stock-page">
      <div className="edit-stock-box">
        <h2 className="edit-stock-title">
          {flag === 1 ? "Product Purchase" : "Product Issue"}
        </h2>

        <div className="content-layout">
          <div className="left-side">
            <h3>Product Details</h3>
            <div className="product-detail">
              <strong>ID:</strong> {product.productId}
            </div>
            <div className="product-detail">
              <strong>SKU:</strong> {product.sku}
            </div>
            <div className="product-detail">
              <strong>Name:</strong> {product.productName}
            </div>
            <div className="product-detail">
              <strong>Vendor:</strong> {product.vendorId}
            </div>
            <div className="product-detail">
              <strong>Reorder Level:</strong> {product.reorderLevel}
            </div>
            <div className="product-detail">
              <strong>Stock:</strong> {product.stock}
            </div>
            <div className="product-detail">
              <strong>{flag === 1 ? "Purchase Price:" : "Sales Price:"}</strong>{" "}
              {flag === 1 ? product.purchasePrice : product.salesPrice}{" "}
            </div>

            <div className="product-detail">
              <strong>Status:</strong>{" "}
              <span style={{ color: statusColor, fontWeight: "bold" }}>
                {statusText}
              </span>
            </div>
          </div>

          {/* RIGHT: TRANSACTION DETAILS */}
          <div className="info-card right-card">
            <h3>Transaction Details</h3>
            <div className="inner-card">
              <div className="form-group">
                <label>Transaction ID</label>
                <input type="text" value={newId} readOnly />
              </div>

              <div className="form-group">
                <label>Transaction Date</label>
                <input
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  className={errors.transactionDate ? "error" : ""}
                />
                {errors.transactionDate && (
                  <p className="error-text">{errors.transactionDate}</p>
                )}
              </div>

              <div className="form-group">
                <label>{flag === 1 ? "Purchased Qty" : "Issued Qty"}</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className={errors.qty ? "error" : ""}
                />
                {errors.qty && <p className="error-text">{errors.qty}</p>}
              </div>

              <div className="form-group">
                <label>Transaction Value</label>
                <input
                  type="text"
                  value={transactionValue.toFixed(2)}
                  readOnly
                />
              </div>

              <div className="buttons">
                <button className="btn-cancel" onClick={handleReturn}>
                  Return
                </button>
                <button className="btn-save" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
/* 🌊 Edit Stock Page — Wavy Blue Gradient Theme */

/* === THEME COLORS === */
:root {
  --dark-blue: #1d3557;
  --mid-blue: #457b9d;
  --light-blue: #a8dadc;
  --white: #f1faee;
  --danger: #e63946;
}

/* === BACKGROUND === */
.edit-stock-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  background: linear-gradient(135deg, #e3f2fd, #f9fcff);
}

/* 🌊 Animated gradient overlay */
.edit-stock-page::before {
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
  opacity: 0.4;
  filter: blur(60px);
  transform: scale(1.2);
  z-index: 0;
  pointer-events: none;
}

@keyframes waveMove {
  0% { transform: translateY(0px) scale(1.2); }
  50% { transform: translateY(-25px) scale(1.25); }
  100% { transform: translateY(0px) scale(1.2); }
}

/* === EDIT STOCK BOX === */
.edit-stock-box {
  position: relative;
  z-index: 2;
  background: var(--white);
  border-radius: 18px;
  padding: 35px 45px;
  width: 92%;
  max-width: 1000px;
  box-shadow: 0px 10px 25px rgba(0,0,0,0.25);
  border: 1px solid var(--light-blue);
}

/* === TITLE === */
.edit-stock-title {
  text-align: center;
  color: var(--dark-blue);
  font-size: 1.9rem;
  font-weight: 700;
  margin-bottom: 35px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(255,255,255,0.4);
}

/* === LAYOUT === */
.content-layout {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}

.left-side {
  flex: 0.6; 
  padding: 20px;
  color: var(--dark-blue);
}

.right-card {
  flex: 1.4; 
}

/* === LEFT PANEL === */
.left-side h3 {
  text-align: center;
  margin-bottom: 15px;
  color: var(--dark-blue);
  font-weight: 600;
}

.product-detail {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--light-blue);
}

/* === INFO CARD === */
.info-card {
  background: var(--mid-blue);
  color: var(--white);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, background 0.3s ease;
}

.info-card:hover {
  background: #5fa8d3;
  transform: translateY(-3px);
}

/* === RIGHT FORM CARD === */
.inner-card {
  background: var(--white);
  color: var(--dark-blue);
  border-radius: 12px;
  padding: 15px;
  box-shadow: inset 0 0 12px rgba(69, 123, 157, 0.15);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--dark-blue);
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #fff;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: var(--mid-blue);
  box-shadow: 0 0 6px rgba(69,123,157,0.3);
}

.error {
  border-color: var(--danger);
  background: #ffe6e6;
}

/* === BUTTONS === */
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-save, .btn-cancel {
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
}

.btn-save {
  background-color: var(--dark-blue);
  margin-left: 10px;
}

.btn-save:hover {
  background-color: #274b7a;
  transform: translateY(-2px);
}

.btn-cancel {
  background-color: var(--mid-blue);
}

.btn-cancel:hover {
  background-color: #5fa8d3;
  transform: translateY(-2px);
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .content-layout {
    flex-direction: column;
  }
  .edit-stock-box {
    padding: 25px 20px;
  }
}
`}</style>
    </div>
  );
};

export default EditStock;
