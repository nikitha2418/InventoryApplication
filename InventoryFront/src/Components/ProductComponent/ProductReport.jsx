import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../Services/ProductService";
import { getSingleUserDetails } from "../../Services/LoginService";

const ProductReport = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
    getSingleUserDetails().then((res) => setRole(res.data.role));
  }, []);

  const removeProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      deleteProduct(id).then(() => {
        setProducts(products.filter((prod) => prod.productId !== id));
      });
    }
  };

  const returnBack = () => {
    if (role === "Admin") navigate("/AdminMenu");
    else if (role === "Manager") navigate("/ManagerMenu");
  };

  return (
    <div className="view-product-container">
      <h2 className="view-product-title">
        {role === "Admin" ? "Admin Product Report" : "Manager Product Report"}
      </h2>

      <div className="table-card table-responsive">
        <table className="view-product-table">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Vendor Id</th>
              <th>Purchase Price</th>
              <th>Sales Price</th>
              <th>Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((prod) => (
                <tr
                  key={prod.productId}
                  className={prod.status === false ? "status-false" : ""}
                >
                  <td>{prod.productId}</td>
                  <td>{prod.sku}</td>
                  <td>{prod.productName}</td>
                  <td>{prod.vendorId}</td>
                  <td>{prod.purchasePrice}</td>
                  <td>{prod.salesPrice}</td>
                  <td>{prod.stock}</td>
                  <td>{prod.reorderLevel}</td>
                  <td>
                    {prod.status ? (
                      <span className="status-true">Permitted to Issue</span>
                    ) : (
                      <span className="status-false-text">
                        Reorder Level Reached
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="actions-row">
                      <Link to={`/view-product/${prod.productId}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                      <Link to={`/edit-stock/${prod.productId}?flag=2`}>
                        <button className="btn btn-issue">Issue</button>
                      </Link>
                      <Link to={`/edit-stock/${prod.productId}?flag=1`}>
                        <button className="btn btn-purchase">Purchase</button>
                      </Link>
                      {role === "Admin" && (
                        <>
                          <Link to={`/edit-price/${prod.productId}`}>
                            <button className="btn btn-price">
                              Update Price
                            </button>
                          </Link>
                          <button
                            className="btn btn-delete"
                            onClick={() => removeProduct(prod.productId)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="return-button-container">
        <button className="return-button" onClick={returnBack}>
          Return
        </button>
      </div>

      <style>{`
/* 🌊 Admin Product Report — Deep Dark Blue Table + Wavy Background */

/* === THEME COLORS === */
:root {
  --darkest-blue: #102542; /* NEW deep dark navy */
  --dark-blue: #1d3557;
  --mid-blue: #457b9d;
  --light-blue: #a8dadc;
  --danger: #e63946;
  --white: #f1faee;
}

/* === BACKGROUND === */
.view-product-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
  background: linear-gradient(135deg, #e3f2fd, #f9fcff);
  padding: 60px 20px;
}

/* 🌊 Animated Gradient Overlay */
.view-product-container::before {
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
  pointer-events: none; 
}

@keyframes waveMove {
  0% { transform: translateY(0px) scale(1.2); }
  50% { transform: translateY(-25px) scale(1.25); }
  100% { transform: translateY(0px) scale(1.2); }
}

/* === CONTENT CARD === */
.report-content {
  position: relative;
  z-index: 2;
  width: 95%;
  max-width: 1100px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  padding: 40px 35px;
  border: 1px solid var(--light-blue);
}

/* === PAGE TITLE === */
.view-product-title {
  color: var(--dark-blue);
  font-size: 36px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  margin-bottom: 40px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  text-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
}

/* === TABLE WRAPPER === */
.table-wrapper {
  background: var(--darkest-blue);
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  border: 2px solid var(--light-blue);
}

/* === TABLE === */
.view-product-table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--darkest-blue);
  color: var(--white);
  font-size: 15px;
}

/* Table Header */
.view-product-table th {
  background-color: var(--darkest-blue);
  color: var(--light-blue);
  padding: 14px;
  text-align: center;
  font-weight: 700;
  border-bottom: 2px solid var(--light-blue);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Table Body */
.view-product-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid rgba(168, 218, 220, 0.3);
  color: var(--white);
}

/* Hover Effect */
.view-product-table tr:hover td {
  background-color: #1a3a66;
  transition: background 0.3s ease;
}


/* === STATUS COLORS === */
.status-true {
  color: #73b0d0ff;;
  font-weight: 700;
}

.status-false-text {
  color: var(--danger);
  font-weight: 700;
}

/* === BUTTONS === */
.actions-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-family: "Poppins", sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Button Colors */
.btn-view { background-color: #2a4e6c;}
.btn-issue { background-color: #457b9d; }
.btn-purchase { background-color: #2a9d8f; }
.btn-price { background-color: #0077b6; }
.btn-delete { background-color: var(--danger); }

/* === RETURN BUTTON === */
.return-button-container {
  text-align: center;
  margin-top: 40px;
}

.return-button {
  background: linear-gradient(135deg, #457b9d, #1d3557);
  color: var(--white);
  font-weight: 600;
  padding: 12px 28px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(69, 123, 157, 0.4);
}

.return-button:hover {
  background: linear-gradient(135deg, #1d3557, #457b9d);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(29, 53, 87, 0.5);
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .report-content {
    width: 100%;
    padding: 25px 20px;
  }

  .view-product-title {
    font-size: 1.8rem;
  }

  .view-product-table th, 
  .view-product-table td {
    font-size: 13px;
    padding: 8px;
  }

  .return-button {
    width: 80%;
  }
}

.view-product-table {
  width: 90%;               
  margin: 0 auto;
  font-size: 14px;         
  transform-origin: center;
}

.view-product-table td {
  padding: 7px 10px;         /* smaller row height and tighter spacing */
  white-space: nowrap;      /* prevent wrapping */
}

.actions-row {
  gap: 15px;                 /* tighter spacing between buttons */
}

.btn {
  padding: 10px 10px;        /* smaller button size */
  font-size: 14px;
}


`}</style>
    </div>
  );
};

export default ProductReport;
