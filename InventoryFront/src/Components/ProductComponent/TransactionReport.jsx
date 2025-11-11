import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findTransactionsByType } from "../../Services/TransactionService";

const TransactionReport = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findTransactionsByType(type)
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [type]);

  const handleReturn = () => {
    navigate(-1);
  };

  const title =
    type === "IN" ? "Stock Purchase Transactions" : "Stock Issue Transactions";

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="transaction-report-container">
      <div className="transaction-report-card">
        <h2 className="transaction-report-title">{title}</h2>

        {transactions.length === 0 ? (
          <p className="no-records">No transactions found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Product ID</th>
                  <th>Rate (₹)</th>
                  <th>Quantity</th>
                  <th>Transaction Value (₹)</th>
                  <th>User ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, index) => (
                  <tr key={index}>
                    <td>{t.transactionId}</td>
                    <td>{t.productId}</td>
                    <td>{t.rate}</td>
                    <td>{t.quantity}</td>
                    <td>{t.transactionValue}</td>
                    <td>{t.userId}</td>
                    <td>{t.transactionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="button-container">
          <button className="return-btn" onClick={handleReturn}>
            Return
          </button>
        </div>
      </div>

    <style>{`
/* 🌊 Transaction Report — Matching Analysis Theme */

.transaction-report-container {
  background: linear-gradient(135deg, #e3f2fd, #f1faee);
  min-height: 100vh;
  padding: 50px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: "Poppins", sans-serif;
}

/* ======== Main Card ======== */
.transaction-report-card {
  background: linear-gradient(135deg, #1d3557, #457b9d);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  padding: 40px 45px;
  width: 95%;
  max-width: 1100px;
  color: #f1faee;
  border: 1px solid #a8dadc;
}

/* ======== Title ======== */
.transaction-report-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 40px;
  color: #f1faee;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
}

/* ======== Table Wrapper ======== */
.table-wrapper {
  overflow-x: auto;
  border-radius: 14px;
  background: #f1faee;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* ======== Table ======== */
.transaction-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  color: #1d3557;
}

.transaction-table th {
  background-color: #457b9d;
  color: #f1faee;
  padding: 14px;
  text-align: center;
  font-weight: 600;
  border-bottom: 3px solid #1d3557;
}

.transaction-table td {
  border-bottom: 1px solid #a8dadc;
  padding: 12px;
  text-align: center;
  background-color: #f1faee;
}

.transaction-table tr:nth-child(even) {
  background-color: #e9f5f5;
}

.transaction-table tr:hover {
  background-color: #d8eff0;
  transition: background 0.3s ease;
}

.transaction-table tr:last-child td {
  border-bottom: none;
}

/* ======== No Records ======== */
.no-records {
  text-align: center;
  color: #a8dadc;
  font-size: 1rem;
  margin: 25px 0;
}

/* ======== Button Section ======== */
.button-container {
  text-align: center;
  margin-top: 35px;
}

.return-btn {
  background-color: #a8dadc;
  border: none;
  color: #1d3557;
  padding: 12px 28px;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.return-btn:hover {
  background-color: #457b9d;
  color: #f1faee;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(69, 123, 157, 0.4);
}

/* ======== Responsive ======== */
@media (max-width: 768px) {
  .transaction-report-card {
    padding: 25px 20px;
  }

  .transaction-report-title {
    font-size: 1.6rem;
  }

  .transaction-table th, 
  .transaction-table td {
    font-size: 13px;
    padding: 8px;
  }

  .return-btn {
    width: 80%;
  }
}
`}</style>

    </div>
  );
};

export default TransactionReport;
