package com.hms.reservationservice.repository;

import com.hms.reservationservice.model.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservationRepo extends MongoRepository<Reservation,String> {

}
