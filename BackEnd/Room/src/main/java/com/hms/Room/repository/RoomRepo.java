package com.hms.Room.repository;

import com.hms.Room.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepo extends MongoRepository<Room, String> {

    @Query("{roomNumber:?0}")
    public Room findRoomByNumber(int roomNumber);

}
