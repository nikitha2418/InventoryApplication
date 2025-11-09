package edu.infosys.inventoryApplication.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.Transaction;

@Repository
@Service 
public class TransactionDaoImpl implements TransactionDao {

    @Autowired
    private TransactionRepository repository;

    
    @Override
    public void saveTransaction(Transaction transaction) {
        repository.save(transaction);
    }


    @Override
    public List<Transaction> showAllTransactions() {
        return repository.findAll();
    }

    
    @Override
    public Transaction findTransactionById(Long id) {
        return repository.findById(id).orElse(null);
    }

    
    @Override
    public void removeTransaction(Long id) {
        repository.deleteById(id);
    }


    @Override
    public List<Transaction> findTransactionsByType(String transactionType) {
        return repository.findTransactionsByType(transactionType);
    }

    
    @Override
    public Long generateTransactionId() {
        Long maxId = repository.findMaxTransactionId();
        if (maxId == null)
            return 1001L; // starting point
        else
            return maxId + 1;
    }
    
    @Override
    public List<ProductSales> getProductWiseTotalSale(){
    		return repository.getProductWiseTotalSale();
    }
    
    @Override
    public List<Double> getDemandByProduct(String productId){
    		return repository.getDemandByProduct(productId);
    }
    
}
