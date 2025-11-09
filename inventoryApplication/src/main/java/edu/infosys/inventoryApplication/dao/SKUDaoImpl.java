package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import edu.infosys.inventoryApplication.bean.SKU;

@Repository
@Service
public class SKUDaoImpl implements SKUDao {
	@Autowired
	private SKURepository repository;

	@Override
	public void save(SKU sku) {
		repository.save(sku);
	}

	@Override
	public SKU findSKUById(String id) {
		return repository.findById(id).get();
	}

	@Override
	public void removeSKU(String id) {
		repository.deleteById(id);
	}

	@Override
	public List<SKU> showAllSKUs() {
		return repository.findAll();
	}
	
	public void update(SKU sku) {
		repository.save(sku);
	}
	
	public List<String> getSkuIdList(){
		return repository.getSkuIdList();
	}

}
