package edu.infosys.inventoryApplication.dao;

import edu.infosys.inventoryApplication.bean.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

	    @Query("select max (productId) from Product")
	    public String findMaxProductId();
	    
	    @Query("select reorderLevel from Product where productId=?1")
	    public Double findReorderLevelByProductId(String id);
	    
	
}
