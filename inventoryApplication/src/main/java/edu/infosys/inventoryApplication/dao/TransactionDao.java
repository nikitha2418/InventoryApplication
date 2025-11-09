package edu.infosys.inventoryApplication.dao;

import java.util.List;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.Transaction;

public interface TransactionDao {

    
    public void saveTransaction(Transaction transaction);
    public List<Transaction> showAllTransactions();
    public Transaction findTransactionById(Long id);
    public void removeTransaction(Long id);
    public List<Transaction> findTransactionsByType(String transactionType);
    public Long generateTransactionId();
    
    public List<ProductSales> getProductWiseTotalSale();
    public List<Double> getDemandByProduct(String productId);
    
    
}

