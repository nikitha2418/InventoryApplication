package edu.infosys.inventoryApplication.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.inventoryApplication.bean.ProductSales;
import edu.infosys.inventoryApplication.bean.Transaction;
import edu.infosys.inventoryApplication.dao.TransactionDao;

@RestController
@RequestMapping("/inventory/")
@CrossOrigin(origins = "http://localhost:3838")
public class TransactionController {

    @Autowired
    private TransactionDao transactionDao;

    
    @PostMapping("/transaction")
    public void saveTransaction(@RequestBody Transaction transaction) {
        transactionDao.saveTransaction(transaction);
    }

    
    @GetMapping("/transaction")
    public List<Transaction> showAllTransactions() {
        return transactionDao.showAllTransactions();
    }


    @GetMapping("/transaction/{id}")
    public Transaction findTransactionById(@PathVariable Long id) {
        return transactionDao.findTransactionById(id);
    }
    
    @DeleteMapping("/transaction/{id}")
    public void removeTransaction(@PathVariable Long id) {
        transactionDao.removeTransaction(id);
    }
    
    @GetMapping("/transaction/type/{type}")
    public List<Transaction> findTransactionsByType(@PathVariable String type) {
        return transactionDao.findTransactionsByType(type);
    }
    

    @GetMapping("/transaction/id-gen")
    public Long generateTransactionId() {
        return transactionDao.generateTransactionId();
    }
    
    @GetMapping("/analysis")
    public Map<String,Double>  getProductWiseTotalSale(){
    	List<ProductSales> salesList=transactionDao.getProductWiseTotalSale();
    	Map<String,Double> salesMap= new HashMap<String,Double>();
    	for(ProductSales ps:salesList)
    	{
    		salesMap.put(ps.getProductName(), ps.getTotalSalesValue());
    	}
    	
    	return salesMap;
    }
    
    
    @GetMapping("/analysis/{productId}")
    public List<Double> getDemandByProduct(@PathVariable String productId){
    		return transactionDao.getDemandByProduct(productId);
    }
}