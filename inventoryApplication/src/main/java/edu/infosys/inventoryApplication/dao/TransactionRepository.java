package edu.infosys.inventoryApplication.dao;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("select t from Transaction t where t.transactionType = ?1")
    public List<Transaction> findTransactionsByType(String transactionType);


    @Query("select max(t.transactionId) from Transaction t")
    public Long findMaxTransactionId();
    
    
    @Query("SELECT new edu.infosys.inventoryApplication.bean.ProductSales(p.productName, SUM(s.transactionValue)) " +
	           "FROM Product p JOIN Transaction s ON p.productId = s.productId " +
	           "WHERE s.transactionType='OUT' GROUP BY p.productId ")
	 public List<ProductSales> getProductWiseTotalSale();
	
    
	@Query("SELECT s.transactionValue from Transaction s WHERE s.transactionType='OUT' and productId=?1")
	 public List<Double> getDemandByProduct(String productId);

}

