package com.hms.Room.service;

import com.hms.Room.model.Room;
import com.hms.Room.repository.RoomRepo;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    @Autowired
    RoomRepo roomRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    public ResponseEntity<List> getAllRooms(){
        return ResponseEntity.ok(roomRepo.findAll());
    }

    public ResponseEntity<?> getRoomByRoomNumber(int roomNumber){
        Room room = roomRepo.findRoomByNumber(roomNumber);
        if(room == null)
            return ResponseEntity.status(404).body("Room Not Found with roomNumber : "+roomNumber);
        return ResponseEntity.ok(room);
    }

    public ResponseEntity<?> addRoom(Room room){
        try {
            return ResponseEntity.ok(roomRepo.save(room));
        }catch (Exception e){
            return ResponseEntity.status(409).body("Duplicate value for Room Number");
        }
    }

    public ResponseEntity<?> updateRoomByRoomNumber(int roomNumber, Room room){
        try{
            Query query = new Query(Criteria.where("roomNumber").is(roomNumber));
            Update update = new Update();

            if(room.getRoomRates() != 0)
                update.set("roomNumber", room.getRoomNumber());

            if(room.getRoomRates() != 0)
                update.set("roomRates", room.getRoomRates());

            if(room.getRoomSize() != 0)
                update.set("roomSize", room.getRoomSize());

            if(!room.isFull())
                update.set("isFull",room.isFull());

            UpdateResult result =  mongoTemplate.updateFirst(query, update, Room.class);
            if(result.getMatchedCount()==0)
                return ResponseEntity.status(404).body("Room not found with Room Number : "+roomNumber);
            return ResponseEntity.ok("Room details updated, Room Number : "+roomNumber);
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Something went wrong");
        }
    }

    public ResponseEntity<?> deleteRoomByNumber(int roomNumber){
        try {
            roomRepo.delete(roomRepo.findRoomByNumber(roomNumber));
            return ResponseEntity.ok("Room with Room Number : "+roomNumber+" Deleted successfully...!");
        }catch (Exception e){
            return ResponseEntity.status(400).body("Unable to delete Room with Room Number "+roomNumber);
        }
    }
}
