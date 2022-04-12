package com.hms.reservationservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Reservation {
    @Id
    String id;

    private Date checkIn;
    private Date checkOut;
    private int totalGuest;
    private int totalChildren;
    private int totalAdults;

    public Reservation(){}

    public Reservation(String id, Date checkIn, Date checkOut, int totalGuest, int totalChildren, int totalAdults) {
        this.id = id;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalGuest = totalGuest;
        this.totalChildren = totalChildren;
        this.totalAdults = totalAdults;
    }

    public Reservation(Date checkIn, Date checkOut, int totalGuest, int totalChildren, int totalAdults) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalGuest = totalGuest;
        this.totalChildren = totalChildren;
        this.totalAdults = totalAdults;
    }

    public Reservation(Date checkIn, Date checkOut, int totalGuest ) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalGuest = totalGuest;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(Date checkIn) {
        this.checkIn = checkIn;
    }

    public Date getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(Date checkOut) {
        this.checkOut = checkOut;
    }

    public int getTotalGuest() {
        return totalGuest;
    }

    public void setTotalGuest(int totalGuest) {
        this.totalGuest = totalGuest;
    }

    public int getTotalChildren() {
        return totalChildren;
    }

    public void setTotalChildren(int totalChildren) {
        this.totalChildren = totalChildren;
    }

    public int getTotalAdults() {
        return totalAdults;
    }

    public void setTotalAdults(int totalAdults) {
        this.totalAdults = totalAdults;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "id='" + id + '\'' +
                ", checkIn=" + checkIn +
                ", checkOut=" + checkOut +
                ", totalGuest=" + totalGuest +
                ", totalChildren=" + totalChildren +
                ", totalAdults=" + totalAdults +
                '}';
    }
}
