package com.guestservice.Model;

import org.springframework.data.annotation.Id;

public class Guest {

    @Id
    private String gid;
    private String name;
    private String address;
    private String email;
    private long phonenumber;
    private String gender;
    private int roomno;

    public String getGid() {
        return gid;
    }

    public void setGid(String gid) {
        this.gid = gid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(long phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getRoomno() {
        return roomno;
    }

    public void setRoomno(int roomno) {
        this.roomno = roomno;
    }

    @Override
    public String toString() {
        return "Guest{" +
                "gid=" + gid +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", phonenumber=" + phonenumber +
                ", gender='" + gender + '\'' +
                ", roomno=" + roomno +
                '}';
    }

    public Guest() {
    }

    public Guest(String gid, String name, String address, String email, long phonenumber, String gender, int roomno) {
        this.gid = gid;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phonenumber = phonenumber;
        this.gender = gender;
        this.roomno = roomno;
    }
}
