package com.hms.reservationservice.controller;

import com.hms.reservationservice.model.Room;
import com.hms.reservationservice.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @GetMapping("/")
    public ResponseEntity<?> getAllRooms(){
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable int id){
        return ResponseEntity.ok(roomService.getRoomByRoomNumber(id));
    }

    @PostMapping("/")
    public ResponseEntity<?> addRoom(@RequestBody Room room){
        Room newRoom = roomService.addRoom(room);
        if(newRoom==null){
            return ResponseEntity.unprocessableEntity().body("Failed to add new room");
        }
        else
            return ResponseEntity.ok(newRoom);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoomById(@PathVariable int id){
        return roomService.deleteRoomByNumber(id);
    }

    @PatchMapping("/update/{roomNumber}")
    public ResponseEntity<?> updateRoom(@PathVariable int roomNumber, @RequestBody Room room){
        return roomService.updateRoomByRoomNumber(roomNumber,room);
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchRooms(@RequestBody Map<String, String> data) throws ParseException {
        System.out.println(data.get("checkIn"));
        System.out.println(new SimpleDateFormat("yyyy-MM-dd").parse(data.get("checkIn")));
        return ResponseEntity.ok(roomService.searchRoom(new SimpleDateFormat("yyyy-MM-dd").parse(data.get("checkIn")),new SimpleDateFormat("yyyy-MM-dd").parse(data.get("checkOut")),Integer.parseInt(data.get("totalGuest"))));
    }


}
