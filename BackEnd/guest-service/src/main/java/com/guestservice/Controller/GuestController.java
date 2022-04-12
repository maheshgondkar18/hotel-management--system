package com.guestservice.Controller;

import com.guestservice.Model.Guest;
import com.guestservice.Repo.GuestRepo;
import com.guestservice.Service.GuestService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@Slf4j


@RequestMapping("/guest")
public class GuestController {

    final Logger logger =  LoggerFactory.getLogger(GuestController.class);

    @Autowired
    private GuestRepo guestrepo;

    @Autowired
    private GuestService guestService;

    @GetMapping("/get")
    public ResponseEntity<?> getAllGuest(){

        logger.info("Inside Guests Controller's get");
        return guestService.getAllGuest();
    }

    @GetMapping("/get/{gid}")
    public ResponseEntity<?> findByGuestId(@PathVariable String gid){
        logger.info("Inside Guests Controller's get by id");

        return guestService.findByGuestId(gid);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addGuest(@RequestBody Guest guest) {
        logger.info("Inside Guests Controller's post");

        System.out.println("Add Guest");
        return guestService.addGuest(guest);
    }


    @PatchMapping("/update/{gid}")
    public ResponseEntity<?> updateGuest(@PathVariable int gid, @RequestBody Guest guest){
        logger.info("Inside Guests Controller's patch");

        return guestService.updateGuest(gid,guest);
    }

    @DeleteMapping("/delete/{gid}")
    public ResponseEntity<?> deleteGuest(@PathVariable String gid){
        logger.info("Inside Guests Controller's delete");

        return guestService.deleteGuest(gid);
    }
}



