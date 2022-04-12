package com.hms.reservationservice.repository;

import com.hms.reservationservice.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepo extends MongoRepository<Room, String> {
    @Query("{roomNumber:?0}")
    public Room findRoomByNumber(int roomNumber);
}
