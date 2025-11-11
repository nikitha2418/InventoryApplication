import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { save } from "../../Services/SKUService";

const SKUAddition = () => {
  const [sku, setSKU] = useState({
    skuId: "",
    skuDescription: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setSKU((values) => ({ ...values, [name]: value }));
  };

  const saveSku = (event) => {
    event.preventDefault();
    save(sku).then(() => {
      alert("New SKU Added");
      navigate("/AdminMenu");
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!sku.skuId.trim()) {
      tempErrors.skuId = "SKU Id is required";
      isValid = false;
    }

    if (!sku.skuDescription.trim()) {
      tempErrors.skuDescription = "SKU Description is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) saveSku(event);
  };

  const returnBack = () => {
    navigate("/AdminMenu");
  };

  return (
    <>
      <div className="sku-page">
        <div className="sku-card">
          <h3 className="sku-title">SKU Addition</h3>

          <form method="post">
            <div className="mb-3">
              <label className="form-label">SKU ID</label>
              <input
                type="text"
                placeholder="Enter SKU ID"
                name="skuId"
                className="form-control"
                value={sku.skuId}
                onChange={onChangeHandler}
              />
              {errors.skuId && <div className="error-text">{errors.skuId}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">SKU Description</label>
              <input
                type="text"
                placeholder="Enter SKU Description"
                name="skuDescription"
                className="form-control"
                value={sku.skuDescription}
                onChange={onChangeHandler}
              />
              {errors.skuDescription && (
                <div className="error-text">{errors.skuDescription}</div>
              )}
            </div>

            <div className="button-group">
              <button type="button" className="btn-theme" onClick={returnBack}>
                Back
              </button>
              <button
                type="button"
                className="btn-theme"
                onClick={handleValidation}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 🌊 Internal CSS with Menu Theme */}
      <style>{`
        /* ===== Wavy Gradient Background ===== */
        .sku-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Poppins", sans-serif;
          overflow: hidden;
          background: linear-gradient(135deg, #e3f2fd, #f9fcff);
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

        /* ===== Card ===== */
        .sku-card {
          position: relative;
          z-index: 2;
          background: linear-gradient(135deg, #1d3557, #457b9d);
          color: #f1faee;
          border-radius: 16px;
          padding: 40px 35px;
          width: 430px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          border: 1px solid #a8dadc;
        }

        .sku-title {
          text-align: center;
          color: #f1faee;
          font-weight: 700;
          font-size: 1.8rem;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* ===== Form Inputs ===== */
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

        /* ===== Buttons ===== */
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

        @media (max-width: 500px) {
          .sku-card {
            width: 90%;
            padding: 30px 20px;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default SKUAddition;
