package com.hms.inventory.Service;

import com.hms.inventory.Model.Inventory;
import com.hms.inventory.Repository.InventoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    @Autowired
    InventoryRepo iRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    public ResponseEntity<List> getAllProducts(){
        return ResponseEntity.ok(iRepo.findAll());
    }

    public ResponseEntity<?> getProductbyId(int pid){
        Inventory inventory = iRepo.findById(pid);
        if(inventory == null)
            return ResponseEntity.status(404).body("Product Not Found with pid : "+pid);
        return ResponseEntity.ok(inventory);
    }

    public ResponseEntity<?> addProduct(Inventory inventory){
        try {
            return ResponseEntity.ok(iRepo.save(inventory));
        }catch (Exception e){
            return ResponseEntity.status(409).body("Duplicate value of product");
        }
    }

    public ResponseEntity<?> updateProductById(int pid, Inventory inventory){

        return ResponseEntity.internalServerError().body("Something went wrong");
    }

    public ResponseEntity<?> deleteProduct(int pid){
        try {
            iRepo.delete(iRepo.findById(pid));
            return ResponseEntity.ok("Product with Product Id : "+pid+" Deleted successfully...!");
        }catch (Exception e){
            return ResponseEntity.status(400).body("Unable to delete product with Product id"+pid);
        }
    }
}
