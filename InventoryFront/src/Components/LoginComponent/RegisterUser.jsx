import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";

const RegisterUser = () => {
  const [inventoryUser, setInventoryUser] = useState({
    username: "",
    personalName: "",
    password: "",
    email: "",
    role: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInventoryUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveUser = (e) => {
    e.preventDefault();
    registerNewUser(inventoryUser).then(() => {
      alert("✅ User registered successfully! Please login.");
      navigate("/");
    });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!inventoryUser.username.trim()) {
      tempErrors.username = "Username is required";
      isValid = false;
    }

    if (!inventoryUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (
      inventoryUser.password.length < 5 ||
      inventoryUser.password.length > 10
    ) {
      tempErrors.password = "Password must be 5–10 characters long";
      isValid = false;
    }

    if (inventoryUser.password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!inventoryUser.personalName.trim()) {
      tempErrors.personalName = "Personal name is required";
      isValid = false;
    }

    if (!inventoryUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(inventoryUser.email)) {
      tempErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!inventoryUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) saveUser(e);
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        {/* LEFT PANEL */}
        <div className="register-left">
          <div className="brand-box">
            <h1>SmartShelfX</h1>
            <p>
              Simplify your inventory — AI-powered automation for smarter
              business decisions.
            </p>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="register-right">
          <div className="form-container">
            <h2>Create Account</h2>
            <p className="subtitle">
              Join SmartShelfX and start managing your stock efficiently
            </p>

            <form>
              <div className="form-group">
                <label>Username</label>
                <input
                  placeholder="Enter username"
                  name="username"
                  value={inventoryUser.username}
                  onChange={onChangeHandler}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>

              <div className="form-group">
                <label>Personal Name</label>
                <input
                  placeholder="Enter your full name"
                  name="personalName"
                  value={inventoryUser.personalName}
                  onChange={onChangeHandler}
                />
                {errors.personalName && (
                  <p className="error">{errors.personalName}</p>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  placeholder="Enter your email"
                  name="email"
                  value={inventoryUser.email}
                  onChange={onChangeHandler}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create password"
                  name="password"
                  value={inventoryUser.password}
                  onChange={onChangeHandler}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="form-group">
                <label>Select Role</label>
                <input
                  list="roles"
                  name="role"
                  placeholder="Choose your role"
                  value={inventoryUser.role}
                  onChange={onChangeHandler}
                />
                <datalist id="roles">
                  <option value="Admin" />
                  <option value="Manager" />
                  <option value="Vendor" />
                </datalist>
                {errors.role && <p className="error">{errors.role}</p>}
              </div>

              <button className="btn-primary" onClick={handleValidation}>
                Register
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => navigate("/")}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ FIXED INTERNAL CSS */}
      <style>{`
        .register-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #dce6f2, #b8cce4, #2a4d69);
          padding: 40px 20px;
        }

        .register-card {
          display: flex;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          width: 95%;
          max-width: 1100px;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
          height: 80vh;
        }

        /* LEFT PANEL */
        .register-left {
          background: linear-gradient(160deg, #1d3557, #27496d);
          color: #ffffff;
          flex: 1.1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 40px;
          text-align: center;
        }

        .brand-box {
          max-width: 320px;
        }

        .brand-box h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .brand-box p {
          font-size: 1rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        /* RIGHT PANEL (SCROLLABLE ONLY INSIDE FORM) */
        .register-right {
          flex: 1.5;
          background-color: #f9fbfd;
          display: flex;
          justify-content: center;
          align-items: stretch;
          padding: 0;
        }

        .form-container {
          background: #fff;
          width: 100%;
          max-width: 520px;
          padding: 40px 60px;
          border-radius: 0;
          overflow-y: auto;
          scroll-behavior: smooth;
        }

        .form-container::-webkit-scrollbar {
          width: 6px;
        }
        .form-container::-webkit-scrollbar-thumb {
          background-color: #b0c4de;
          border-radius: 6px;
        }

        h2 {
          text-align: center;
          color: #1d3557;
          font-size: 1.9rem;
          margin-bottom: 5px;
        }

        .subtitle {
          text-align: center;
          color: #457b9d;
          margin-bottom: 25px;
          font-size: 0.95rem;
        }

        .form-group {
          margin-bottom: 18px;
        }

        label {
          display: block;
          color: #1d3557;
          font-weight: 600;
          margin-bottom: 6px;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #cfd8dc;
          font-size: 1rem;
          background-color: #fff;
          transition: 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #457b9d;
          box-shadow: 0 0 6px rgba(69, 123, 157, 0.4);
        }

        .error {
          color: #e63946;
          font-size: 0.85rem;
          margin-top: 4px;
        }

        .btn-primary {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #1d3557, #457b9d);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s ease;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #16324f, #1d3557);
          transform: translateY(-2px);
        }

        .btn-outline {
          width: 100%;
          padding: 12px;
          border: 2px solid #1d3557;
          color: #1d3557;
          background: transparent;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 12px;
          transition: 0.3s ease;
        }

        .btn-outline:hover {
          background-color: #1d3557;
          color: #fff;
        }

        @media (max-width: 950px) {
          .register-card {
            flex-direction: column;
            height: auto;
          }
          .register-left {
            padding: 40px 20px;
          }
          .form-container {
            max-height: none;
            padding: 30px 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterUser;
