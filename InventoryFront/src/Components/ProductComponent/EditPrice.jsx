import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, priceUpdate } from "../../Services/ProductService";

const EditPrice = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [purchasePrice, setPurchasePrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProductById(pid)
      .then((res) => {
        setProduct(res.data);
        setPurchasePrice(res.data.purchasePrice);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [pid]);

  const returnBack = () => navigate("/ProdRepo");

  const handlePriceUpdate = () => {
    if (purchasePrice === "" || purchasePrice === null) {
      setErrorMessage("Enter purchase price value");
      return;
    }
    if (purchasePrice <= 0) {
      setErrorMessage("Enter valid price");
      return;
    }

    setErrorMessage("");
    const updatedProduct = { ...product, purchasePrice: Number(purchasePrice) };

    priceUpdate(updatedProduct)
      .then(() => {
        alert("Price updated successfully!");
        returnBack();
      })
      .catch((err) => {
        console.error("Error updating price:", err);
        setErrorMessage("Error updating price. Check backend and CORS.");
      });
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="edit-price-page">
      <div className="edit-price-box">
        <h2 className="edit-price-title">Update Product Price</h2>

        {/* 🔹 Product Info - Direct display (no card) */}
        <div className="product-info">
          <div className="info-grid">
            <div><strong>ID:</strong> {product.productId}</div>
            <div><strong>SKU:</strong> {product.sku}</div>
            <div><strong>Name:</strong> {product.productName}</div>
            <div><strong>Vendor:</strong> {product.vendorId}</div>
            <div><strong>Purchase Price:</strong> ₹{product.purchasePrice}</div>
            <div><strong>Sales Price:</strong> ₹{product.salesPrice}</div>
            <div><strong>Stock:</strong> {product.stock}</div>
            <div><strong>Reorder Level:</strong> {product.reorderLevel}</div>
            <div style={{ gridColumn: "span 2", textAlign: "center" }}>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: product.status ? "#1d3557" : "#e63946",
                  fontWeight: "bold",
                }}
              >
                {product.status ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* 🔹 Price Update Section */}
        <div className="update-card">
          <h3>Price Update</h3>
          <div className="inner-card">
            <div className="form-group">
              <label>Enter New Purchase Price:</label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>

            {errorMessage && <p className="error-msg">{errorMessage}</p>}

            <div className="buttons">
              <button className="btn-cancel" onClick={returnBack}>
                Cancel
              </button>
              <button className="btn-save" onClick={handlePriceUpdate}>
                Update Price
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ INTERNAL CSS */}
      <style>{`
/* 🌊 Edit Price Page — Unified Wavy Blue Theme */

/* === THEME COLORS === */
:root {
  --dark-blue: #1d3557;
  --mid-blue: #457b9d;
  --light-blue: #a8dadc;
  --white: #f1faee;
  --danger: #e63946;
}

/* === BACKGROUND === */
.edit-price-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  background: linear-gradient(135deg, #e3f2fd, #f9fcff);
}

/* 🌊 Animated background overlay */
.edit-price-page::before {
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

/* === MAIN BOX === */
.edit-price-box {
  position: relative;
  z-index: 2;
  background-color: var(--white);
  border-radius: 18px;
  padding: 35px 45px;
  width: 92%;
  max-width: 750px;
  box-shadow: 0px 10px 25px rgba(0,0,0,0.25);
  text-align: center;
  border: 1px solid var(--light-blue);
}

/* === PAGE TITLE === */
.edit-price-title {
  color: var(--dark-blue);
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 6px rgba(255,255,255,0.4);
}

/* === PRODUCT INFO === */
.product-info {
  color: var(--dark-blue);
  margin-bottom: 35px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 25px;
  font-size: 16px;
  text-align: left;
}

.info-grid div {
  background-color: #f9fcff;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid var(--light-blue);
  transition: background 0.3s ease;
}

.info-grid div:hover {
  background-color: #e3f2fd;
}

/* === UPDATE PRICE SECTION === */
.update-card {
  background: var(--mid-blue);
  color: white;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.update-card h3 {
  text-align: center;
  color: var(--white);
  margin-bottom: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Inner Card */
.inner-card {
  background: var(--white);
  color: var(--dark-blue);
  border-radius: 12px;
  padding: 15px;
  box-shadow: inset 0 0 12px rgba(69, 123, 157, 0.15);
}

/* === FORM STYLING === */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
  color: var(--dark-blue);
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: 0.3s ease;
}

.form-group input:focus {
  border-color: var(--mid-blue);
  box-shadow: 0 0 6px rgba(69,123,157,0.3);
}

.error-msg {
  color: var(--danger);
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
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
  .info-grid {
    grid-template-columns: 1fr;
  }
  .edit-price-box {
    padding: 25px;
  }
}
`}</style>

    </div>
  );
};

export default EditPrice;
