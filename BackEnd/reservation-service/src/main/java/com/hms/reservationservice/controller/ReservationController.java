package com.hms.reservationservice.controller;

import com.hms.reservationservice.model.Reservation;
import com.hms.reservationservice.service.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@Slf4j
@RequestMapping("/reservation")
public class ReservationController {
    @Autowired
    ReservationService reservationService;

    final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    @GetMapping("/all")
    public ResponseEntity<List> getAllReservationDetails(){
        logger.info("Inside Reservation Controller's get");
        return ResponseEntity.ok(reservationService.getAllDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable String id){
        logger.info("Inside Reservation Controller's get by id");
        Reservation reservation = reservationService.getById(id);
        if(reservation==null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(reservation);
    }

    @PostMapping("/")
    public ResponseEntity<?> makeReservation(@RequestBody Reservation reservation){
        logger.info("Inside Reservation Controller's post");
        System.out.println(reservation);
        return ResponseEntity.ok(reservationService.makeReservation(reservation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable String id){
        logger.info("Inside Reservation Controller's delete");
        return reservationService.cancelReservation(id);
    }

    @PostMapping("/{roomNumber}")
    public ResponseEntity<?> allotRoom(@RequestBody Reservation reservation, @PathVariable int roomNumber){
        return reservationService.AllotRoom(roomNumber,reservation);
    }
}
