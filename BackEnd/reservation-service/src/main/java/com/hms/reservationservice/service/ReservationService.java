package com.hms.reservationservice.service;

import com.hms.reservationservice.model.Reservation;
import com.hms.reservationservice.model.Room;
import com.hms.reservationservice.repository.ReservationRepo;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    ReservationRepo reservationRepo;

    @Autowired
    RoomService roomService;

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Reservation> getAllDetails(){
        return reservationRepo.findAll();
    }

    public Reservation getById(String id){
        return reservationRepo.findById(id).orElse(null);
    }

    public Reservation makeReservation(Reservation reservation){
        return reservationRepo.save(reservation);
    }

    public ResponseEntity<?> updateById(String id,Reservation reservation){
        try{
            Optional<Reservation> resvData = reservationRepo.findById(id);
            if (resvData.isPresent()) {
                Reservation resv = resvData.get();
                resv.setCheckIn(reservation.getCheckIn());
                resv.setCheckOut(reservation.getCheckOut());
                resv.setTotalAdults(reservation.getTotalAdults());
                resv.setTotalChildren(reservation.getTotalChildren());
                return ResponseEntity.ok(reservationRepo.save(resv));
            } else {
                return ResponseEntity.status(404).body("Unable to find Reservation");
            }
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Something went wrong");
        }
    }

    public ResponseEntity<?> cancelReservation(String id){
        try {
            if(this.getById(id)==null)
                throw new Exception();
            reservationRepo.deleteById(id);
            return ResponseEntity.ok("Deleted successfully...!");
        }catch (Exception e){
            return ResponseEntity.status(400).body("Reservation Not Found");
        }
    }

    public ResponseEntity<?> AllotRoom(int roomNumber,Reservation reservation){
//        try{
//            Room room = roomService.getRoomByRoomNumber(roomNumber);
//            if(room!=null){
//                room.getReservation().add(reservation);
//            }
//            return
//        }
        try{
            Query query = new Query(Criteria.where("roomNumber").is(roomNumber));
            Update update = new Update();
            Room room = roomService.getRoomByRoomNumber(roomNumber);
            room.getReservation().add(reservation);
            update.set("reservation",room.getReservation());
            UpdateResult result =  mongoTemplate.updateFirst(query, update, Room.class);
            if(result.getMatchedCount()==0)
                return null;
            return ResponseEntity.ok(result);
        }
        catch (Exception e){
            System.out.println("Exception in Allot Room"+e);
            return ResponseEntity.internalServerError().body(e);
        }
    }


}
