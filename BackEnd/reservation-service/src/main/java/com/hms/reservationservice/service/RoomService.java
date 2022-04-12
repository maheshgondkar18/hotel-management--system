package com.hms.reservationservice.service;

import com.hms.reservationservice.model.Reservation;
import com.hms.reservationservice.model.Room;
import com.hms.reservationservice.repository.RoomRepo;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    RoomRepo roomRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    public Room getRoomByRoomNumber(int roomNumber){
        return roomRepo.findRoomByNumber(roomNumber);
    }

    public List getAllRooms(){
        return roomRepo.findAll();
    }

    public Room addRoom(Room room){
        try {
            return (Room)roomRepo.save(room);
        }catch (Exception e){
            System.out.println(e);
            return null;
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

            if(room.getReservation().size()>0) {
                Room room1 = this.getRoomByRoomNumber(roomNumber);
                room1.getReservation().addAll(room.getReservation());
                update.set("reservation",room1.getReservation());
            }

            UpdateResult result =  mongoTemplate.updateFirst(query, update, Room.class);
            if(result.getMatchedCount()==0)
                return ResponseEntity.status(404).body("Room not found with Room Number : "+roomNumber);
            return ResponseEntity.ok("Room details updated, Room Number : "+roomNumber);
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Something went wrong");
        }
    }

    public ResponseEntity deleteRoomByNumber(int roomNumber){
        try {
            roomRepo.delete(roomRepo.findRoomByNumber(roomNumber));
            return ResponseEntity.ok("Room Deleted");
        }catch (Exception e){
            System.out.println("Exception wile deleting Room "+e);
            return ResponseEntity.unprocessableEntity().body("Unable to delete room");
        }
    }

    public List<Room> searchRoom(Date checkIn, Date checkOut, int numberOfGuest){
        System.out.println(checkIn);
        List<Room> rooms = this.getAllRooms();
        System.out.println(rooms);
        List<Room> availableRooms = new ArrayList<Room>();
        for(int i=0;i<rooms.size();i++){
            final Boolean[] isFull = {false};
            rooms.get(i).getReservation().forEach(
                    item->{
                        System.out.println((ChronoUnit.DAYS.between(item.getCheckOut().toInstant(),checkIn.toInstant()) > 0));
                            isFull[0] = (ChronoUnit.DAYS.between(item.getCheckOut().toInstant(),checkIn.toInstant()) > 0);
                    }
            );
            if(isFull[0])
                availableRooms.add(rooms.get(i));
        }
        return availableRooms;
    }

}

