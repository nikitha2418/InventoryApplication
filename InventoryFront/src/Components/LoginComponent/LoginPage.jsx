import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { validateUser } from "../../Services/LoginService";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) checkLogin(e);
  };

  const checkLogin = (e) => {
    e.preventDefault();
    validateUser(formData.username, formData.password).then((res) => {
      const role = String(res.data);
      if (role === "Admin") navigate("/AdminMenu");
      else if (role === "Manager") navigate("/ManagerMenu");
      else if (role === "Vendor") navigate("/VendorMenu");
      else alert("Wrong Userid/Password");
    });
  };

  const registerNewUser = () => navigate("/Register");

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Left Section */}
        <div className="login-left">
          <img src="/login.jpg" alt="SmartShelfX" className="login-image" />
          <div className="login-brand">
            <h1>SmartShelfX</h1>
            <p>AI-Powered Inventory Automation</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="login-right">
          <h2>Welcome Back</h2>

          <form>
            <div className="form-group">
              <label>User Name</label>
              <input
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={onChangeHandler}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <button className="btn-primary" onClick={handleValidation}>
              Login
            </button>
            <button className="btn-outline" onClick={registerNewUser}>
              Create New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
