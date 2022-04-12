package com.hms.inventory.Repository;

import com.hms.inventory.Model.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepo extends MongoRepository<Inventory,String> {

    @Query("{pid:?0}")
    public Inventory findById(int pid);
}
