import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, productIdGenerate } from "../../Services/ProductService";
import { getUsersByRole } from "../../Services/LoginService";
import { getSkuIdList } from "../../Services/SKUService";

const ProductAddition = () => {
  const [product, setProduct] = useState({
    productId: "",
    vendorId: "",
    productName: "",
    sku: "",
    purchasePrice: "",
    reorderLevel: "",
    stock: "",
    status: true,
  });

  const [vendors, setVendors] = useState([]);
  const [skus, setSkus] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUsersByRole("vendor")
      .then((res) => setVendors(res.data))
      .catch((err) => console.error("Error fetching vendors:", err));

    getSkuIdList()
      .then((res) => setSkus(res.data))
      .catch((err) => console.error("Error fetching SKUs:", err));

    productIdGenerate()
      .then((res) =>
        setProduct((prev) => ({ ...prev, productId: res.data }))
      )
      .catch((err) => console.error("Error generating Product ID:", err));
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const saveProduct = (event) => {
    event.preventDefault();
    const stockValue = parseFloat(product.stock);
    const reorderValue = parseFloat(product.reorderLevel);
    const updatedProduct = {
      ...product,
      status: stockValue > reorderValue,
    };

    addProduct(updatedProduct)
      .then(() => {
        alert("✅ New Product Added");
        navigate("/AdminMenu");
      })
      .catch(() => alert("❌ Error adding product"));
  };

  const handleReturn = (event) => {
    event.preventDefault();
    navigate("/AdminMenu");
  };

  const handleReset = (event) => {
    event.preventDefault();
    setProduct({
      productId: product.productId,
      vendorId: "",
      productName: "",
      sku: "",
      purchasePrice: "",
      reorderLevel: "",
      stock: "",
      status: true,
    });
    setErrors({});
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!product.vendorId) {
      tempErrors.vendorId = "Vendor Id is required";
      isValid = false;
    }
    if (!product.productName.trim()) {
      tempErrors.productName = "Product Name is required";
      isValid = false;
    }
    if (!product.sku) {
      tempErrors.sku = "SKU is required";
      isValid = false;
    }
    if (!product.purchasePrice || Number(product.purchasePrice) <= 0) {
      tempErrors.purchasePrice = "Purchase Price must be greater than 0";
      isValid = false;
    }
    if (!product.reorderLevel || Number(product.reorderLevel) < 10) {
      tempErrors.reorderLevel = "Reorder Level must be 10 or more";
      isValid = false;
    }
    if (!product.stock || Number(product.stock) <= 0) {
      tempErrors.stock = "Stock must be greater than 0";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) saveProduct(event);
  };

  return (
    <>
      <div className="sku-page">
        <div className="sku-card">
          <h3 className="sku-title">Product Addition</h3>

          <form>
            <div className="form-grid">
              {/* LEFT COLUMN */}
              <div className="form-column">
                <div className="mb-3">
                  <label className="form-label">Product ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="productId"
                    value={product.productId}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Vendor ID</label>
                  <select
                    className="form-select form-control"
                    name="vendorId"
                    value={product.vendorId}
                    onChange={onChangeHandler}
                  >
                    <option value="">Select Vendor ID</option>
                    {vendors.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                  {errors.vendorId && (
                    <div className="error-text">{errors.vendorId}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name"
                    name="productName"
                    value={product.productName}
                    onChange={onChangeHandler}
                  />
                  {errors.productName && (
                    <div className="error-text">{errors.productName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">SKU</label>
                  <select
                    className="form-select form-control"
                    name="sku"
                    value={product.sku}
                    onChange={onChangeHandler}
                  >
                    <option value="">Select SKU</option>
                    {skus.map((sku) => (
                      <option key={sku} value={sku}>
                        {sku}
                      </option>
                    ))}
                  </select>
                  {errors.sku && <div className="error-text">{errors.sku}</div>}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="form-column">
                <div className="mb-3">
                  <label className="form-label">Purchase Price</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Purchase Price"
                    name="purchasePrice"
                    value={product.purchasePrice}
                    onChange={onChangeHandler}
                    min="1"
                  />
                  {errors.purchasePrice && (
                    <div className="error-text">{errors.purchasePrice}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Reorder Level</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Reorder Level (min 10)"
                    name="reorderLevel"
                    value={product.reorderLevel}
                    onChange={onChangeHandler}
                    min="10"
                  />
                  {errors.reorderLevel && (
                    <div className="error-text">{errors.reorderLevel}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Stock Quantity"
                    name="stock"
                    value={product.stock}
                    onChange={onChangeHandler}
                    min="0"
                  />
                  {errors.stock && (
                    <div className="error-text">{errors.stock}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="button-group">
              <button type="button" className="btn-theme" onClick={handleReturn}>
                Return
              </button>
              <button type="button" className="btn-theme" onClick={handleReset}>
                Reset
              </button>
              <button
                type="button"
                className="btn-theme"
                onClick={handleValidation}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 🌊 Internal CSS with Theme */}
      <style>{`
        .sku-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Poppins", sans-serif;
          background: linear-gradient(135deg, #e3f2fd, #f9fcff);
          overflow: hidden;
        }

        .sku-page::before {
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
          transform: scale(1.2);
        }

        @keyframes waveMove {
          0% { transform: translateY(0px) scale(1.2); }
          50% { transform: translateY(-25px) scale(1.25); }
          100% { transform: translateY(0px) scale(1.2); }
        }

        .sku-card {
          position: relative;
          z-index: 2;
          background: linear-gradient(135deg, #1d3557, #457b9d);
          color: #f1faee;
          border-radius: 16px;
          padding: 50px 60px;
          width: 850px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          border: 1px solid #a8dadc;
        }

        .sku-title {
          text-align: center;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 30px;
          letter-spacing: 1px;
        }

        .form-grid {
          display: flex;
          justify-content: space-between;
          gap: 40px;
        }

        .form-column {
          flex: 1;
        }

        .form-label {
          font-weight: 600;
          color: #f1faee;
        }

        .form-control {
          border: 1.5px solid #a8dadc;
          border-radius: 10px;
          padding: 10px;
          background-color: #f1faee;
          color: #1d3557;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #457b9d;
          box-shadow: 0 0 6px rgba(69, 123, 157, 0.8);
        }

        .error-text {
          color: #ffb4a2;
          font-size: 0.85rem;
          margin-top: 4px;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 30px;
        }

        .btn-theme {
          flex: 1;
          border: none;
          border-radius: 10px;
          padding: 12px 0;
          font-weight: 600;
          font-size: 1rem;
          background-color: #a8dadc;
          color: #1d3557;
          transition: all 0.3s ease;
        }

        .btn-theme:hover {
          background-color: #1d3557;
          color: #f1faee;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .sku-card {
            width: 90%;
            padding: 30px 20px;
          }

          .form-grid {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default ProductAddition;
