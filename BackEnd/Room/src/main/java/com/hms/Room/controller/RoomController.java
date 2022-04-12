package com.hms.Room.controller;

import com.hms.Room.model.Room;
import com.hms.Room.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @GetMapping("/")
    public ResponseEntity<String> getStatus(){
        return ResponseEntity.ok("Room Service is Running");
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllRooms(){
        return roomService.getAllRooms();
    }

    @GetMapping("/get/{roomNumber}")
    public ResponseEntity<?> getRoomByRoomNumber(@PathVariable int roomNumber){
        return roomService.getRoomByRoomNumber(roomNumber);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewRoom(@RequestBody Room room) {
        return roomService.addRoom(room);
    }


    @PatchMapping("/update/{roomNumber}")
    public ResponseEntity<?> updateRoom(@PathVariable int roomNumber, @RequestBody Room room){
        return roomService.updateRoomByRoomNumber(roomNumber,room);
    }

    @DeleteMapping("/delete/{roomNumber}")
    public ResponseEntity<?> deleteRoom(@PathVariable int roomNumber){
        return roomService.deleteRoomByNumber(roomNumber);
    }

}

