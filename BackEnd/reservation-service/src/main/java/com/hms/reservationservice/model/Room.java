package com.hms.reservationservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Document
public class Room {

    @Id
    private String id;

    @Indexed(unique = true)
    private int roomNumber;
    private float roomRates;
    private int roomSize;

    @DBRef
    private Set<Reservation> reservation = new HashSet<>();

    public Room() {
    }

    public Room(String id, int roomNumber, float roomRates, int roomSize) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.roomRates = roomRates;
        this.roomSize = roomSize;
    }

    public Room(int roomNumber, float roomRates, int roomSize, Set<Reservation> reservation) {
        this.roomNumber = roomNumber;
        this.roomRates = roomRates;
        this.roomSize = roomSize;
        this.reservation = reservation;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public float getRoomRates() {
        return roomRates;
    }

    public void setRoomRates(float roomRates) {
        this.roomRates = roomRates;
    }

    public int getRoomSize() {
        return roomSize;
    }

    public void setRoomSize(int roomSize) {
        this.roomSize = roomSize;
    }

    public Set<Reservation> getReservation() {
        return reservation;
    }

    public void setReservation(Set<Reservation> reservation) {
        this.reservation = reservation;
    }

    @Override
    public String toString() {
        return "Room{" +
                "id='" + id + '\'' +
                ", roomNumber=" + roomNumber +
                ", roomRates=" + roomRates +
                ", roomSize=" + roomSize +
                ", reservation=" + reservation +
                '}';
    }
}
