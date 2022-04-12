package com.hms.Room.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Room {

    @Id
    private String id;

    @Indexed(unique = true)
    private int roomNumber;
    private float roomRates;
    private int roomSize;
    private boolean isFull = false;

    public Room() {
    }

    public Room(int roomNumber, float roomRates, int roomSize, Date checkIn, Date checkOut, boolean isFull) {
        this.roomNumber = roomNumber;
        this.roomRates = roomRates;
        this.roomSize = roomSize;
        this.isFull = isFull;
    }

    public Room(String id, int roomNumber, float roomRates, int roomSize,boolean isFull) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.roomRates = roomRates;
        this.roomSize = roomSize;
        this.isFull = isFull;
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

    public boolean isFull() {
        return isFull;
    }

    public void setFull(boolean full) {
        isFull = full;
    }

    @Override
    public String toString() {
        return "Room{" +
                "id='" + id + '\'' +
                ", roomNumber=" + roomNumber +
                ", roomRates=" + roomRates +
                ", roomSize=" + roomSize +
                ", isFull=" + isFull +
                '}';
    }
}
