package com.guestservice.Service;

import com.guestservice.Model.Guest;
import com.guestservice.Repo.GuestRepo;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuestService {

    @Autowired
    GuestRepo guestRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    public GuestService(GuestRepo guestRepo) {
        this.guestRepo= guestRepo;

    }

    public Guest getGuestByName(String name){
        return guestRepo.findByGuestId(name);
    }

    public ResponseEntity<?> findByGuestId(String gid){
        Guest g = guestRepo.findByGuestId(gid);
        if(g == null)
            return ResponseEntity.status(404).body("Guest Not Found with gid : "+gid);
        return ResponseEntity.ok(g);
    }

    public ResponseEntity<List> getAllGuest(){
        return ResponseEntity.ok(guestRepo.findAll());
    }

    public ResponseEntity<?> addGuest(Guest guest){
        try {
            return ResponseEntity.ok(guestRepo.save(guest));
        }catch (Exception e){
            return ResponseEntity.status(409).body("Duplicate value for Guest id");
        }
    }


    public ResponseEntity updateGuest(int gid, Guest guest){
        try{
            Query query = new Query(Criteria.where("gid").is(gid));
            Update update = new Update();

            if(guest.getName() != null)
                update.set("name",guest.getName());
            if(guest.getAddress() != null)
                update.set("Address",guest.getAddress());
            if(guest.getEmail() != null)
                update.set("Email",guest.getEmail());
            if(guest.getPhonenumber() != 0)
                update.set("Phonenumber",guest.getPhonenumber());
            if(guest.getGender() != null)
                update.set("Gender",guest.getGender());
            if(guest.getRoomno() != 0)
                update.set("Roomno",guest.getRoomno());

            UpdateResult result =  mongoTemplate.updateFirst(query, update, Guest.class);
            if(result.getMatchedCount()==0)
                return ResponseEntity.status(404).body("Guest not found with Guest Id : "+gid);
            return ResponseEntity.ok("Guest details updated, Guest id : "+gid);
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Something went wrong");
        }
    }

    public ResponseEntity deleteGuest(String gid){
        try {
            guestRepo.delete(guestRepo.findByGuestId(gid));
            return ResponseEntity.ok("Guest with Guest id : "+gid+" Deleted successfully...!");
        }catch (Exception e){
            return ResponseEntity.status(400).body("Unable to delete Guest with guest id  "+gid);
        }
    }
}
