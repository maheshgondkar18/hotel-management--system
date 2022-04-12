package com.guestservice.Repo;


import com.guestservice.Model.Guest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GuestRepo extends MongoRepository<Guest, String> {
//    @Query("{gid:?0}")
//    public Optional<Guest> findById(String gid);


    @Query("{name:'?0'}")
    public Guest findByGuestName(String name);

    @Query("{gid:?0}")
    Guest findByGuestId(String gid);
}
