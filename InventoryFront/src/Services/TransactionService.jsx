import axios from "axios";

const TRANSACTION_URL = "http://localhost:9898/inventory/transaction";
const ANA_URL = "http://localhost:9898/inventory/analysis";

export const saveTransaction = async (transaction) => {
  console.log("Saving Transaction:", transaction);
  return await axios.post(TRANSACTION_URL, transaction);
};

export const showAllTransactions = async () => {
  console.log("Fetching all transactions...");
  return await axios.get(TRANSACTION_URL);
};

export const findTransactionById = async (id) => {
  console.log("Fetching transaction by ID:", id);
  return await axios.get(`${TRANSACTION_URL}/${id}`);
};

export const removeTransaction = async (id) => {
  console.log("Deleting transaction ID:", id);
  return await axios.delete(`${TRANSACTION_URL}/${id}`);
};

export const findTransactionsByType = async (type) => {
  console.log("Fetching transactions by type:", type);
  return await axios.get(`${TRANSACTION_URL}/type/${type}`);
};

export const generateTransactionId = async () => {
  console.log("Generating new transaction ID...");
  return await axios.get(`${TRANSACTION_URL}/id-gen`);
};

export const getProductWiseTotalSale = async () => {
  console.log("Fetching product-wise total sales...");
  return await axios.get(ANA_URL);
};

export const getDemandByProduct = async (id) => {
  if (!id) {
    console.warn("⚠️ getDemandByProduct called with empty product ID");
    return { data: [] };
  }

  const url = `${ANA_URL}/${id}`;
  console.log("Fetching demand data from:", url);

  try {
    const res = await axios.get(url);

    console.log("✅ Demand API Success:", res.data);

 
    if (Array.isArray(res.data)) {
     
      return { data: res.data };
    }

    if (res.data && res.data.demand) {
      
      return { data: res.data.demand };
    }

    console.warn("⚠️ Unexpected response format:", res.data);
    return { data: [] };

  } catch (err) {
    console.error("❌ Demand API Error:", err.response ? err.response.data : err.message);

  
    if (err.response && err.response.status === 404) {
      console.warn("🚫 Demand data not found for product:", id);
    }

    throw err; 
  }
};
