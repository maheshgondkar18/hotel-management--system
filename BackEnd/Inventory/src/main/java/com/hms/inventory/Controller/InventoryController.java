package com.hms.inventory.Controller;

import com.hms.inventory.Model.Inventory;
import com.hms.inventory.Service.InventoryService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;


@RestController
@CrossOrigin(origins = "*")
@Slf4j
@RequestMapping("/inventory")
public class InventoryController {

    final Logger logger = (Logger) LoggerFactory.getLogger(InventoryController.class);

    @Autowired
    InventoryService iService;

    @GetMapping("/")
    public ResponseEntity<String> getStatus()
    {
        logger.info("Inside Inventory Controller's get status");
        return ResponseEntity.ok("Inventory Service is Running");
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllProducts(){
        logger.info("Inside Inventory Controller's get");

        return iService.getAllProducts();
    }

    @GetMapping("/get/{pid}")
    public ResponseEntity<?> getProductbyId(@PathVariable int pid){
        logger.info("Inside Inventory Controller's get by id");

        return iService.getProductbyId(pid);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Inventory inventory) {
        logger.info("Inside Inventory Controller's post");

        return iService.addProduct(inventory);
    }


    @PutMapping("/update/{pid}")
    public ResponseEntity<?> updateProductById(@PathVariable int pid, @RequestBody Inventory inventory){
        logger.info("Inside Inventory Controller's put");

        return iService.updateProductById(pid,inventory);
    }

    @DeleteMapping("/delete/{pid}")
    public ResponseEntity<?> deleteProduct(@PathVariable int pid){
        logger.info("Inside Inventory Controller's delete");

        return iService.deleteProduct(pid);
    }

}
