import React, { useState, useEffect } from "react";
import { getSingleUserDetails } from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";

const ShowSingleUser = () => {
  const [inventoryUser, setInventoryUser] = useState({
    username: "",
    personalName: "",
    password: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getSingleUserDetails().then((response) => {
      setInventoryUser(response.data);
    });
  }, []);

  const returnBack = () => {
    if (inventoryUser.role === "Manager") navigate("/ManagerMenu");
    else if (inventoryUser.role === "Vendor") navigate("/VendorMenu");
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-card">
        <h2>User Profile</h2>

        <div className="profile-details">
          <div className="detail-row">
            <span className="label">User ID</span>
            <span className="value">{inventoryUser.username}</span>
          </div>

          <div className="detail-row">
            <span className="label">Name</span>
            <span className="value">{inventoryUser.personalName}</span>
          </div>

          <div className="detail-row">
            <span className="label">Email</span>
            <span className="value">{inventoryUser.email}</span>
          </div>

          <div className="detail-row">
            <span className="label">Role</span>
            <span className="value role">{inventoryUser.role}</span>
          </div>
        </div>

        <button onClick={returnBack}>Return</button>
      </div>

      {/* ✅ Internal CSS */}
      <style>{`
/* 🌊 User Profile Page — Wavy Blue Animated Background */

/* === THEME COLORS === */
:root {
  --dark-blue: #1d3557;
  --mid-blue: #457b9d;
  --light-blue: #a8dadc;
  --white: #f1faee;
  --shadow: rgba(0, 0, 0, 0.25);
}

/* === BACKGROUND === */
.user-profile-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #e3f2fd, #f9fcff);
}

/* 🌊 Animated Blue Overlay */
.user-profile-page::before {
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
  opacity: 0.35;
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

/* === PROFILE CARD === */
.user-profile-card {
  position: relative;
  z-index: 2;
  background: var(--white);
  border-radius: 18px;
  padding: 40px 50px;
  width: 420px;
  box-shadow: 0 10px 25px var(--shadow);
  text-align: center;
  border: 1px solid var(--light-blue);
}

/* === TITLE === */
.user-profile-card h2 {
  color: var(--dark-blue);
  font-size: 1.9rem;
  font-weight: 800;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 6px rgba(255,255,255,0.4);
}

/* === PROFILE DETAILS === */
.profile-details {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 25px;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  background: #f9fcff;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--light-blue);
  transition: all 0.3s ease;
}

.detail-row:hover {
  background: #e3f2fd;
  transform: translateY(-2px);
}

.label {
  color: var(--dark-blue);
  font-weight: 600;
}

.value {
  color: #333;
  font-weight: 500;
}

.role {
  color: var(--dark-blue);
  font-weight: 700;
}

/* === BUTTON === */
button {
  width: 100%;
  background-color: var(--dark-blue);
  color: var(--white);
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

button:hover {
  background-color: var(--mid-blue);
  transform: translateY(-2px);
}

/* === RESPONSIVE === */
@media (max-width: 600px) {
  .user-profile-card {
    width: 90%;
    padding: 25px;
  }

  .user-profile-card h2 {
    font-size: 1.6rem;
  }
}
`}</style>

    </div>
  );
};

export default ShowSingleUser;
