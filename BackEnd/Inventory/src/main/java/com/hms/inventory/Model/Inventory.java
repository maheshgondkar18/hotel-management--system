package com.hms.inventory.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Inventory {
    @Id
    private int pid;
    private String pname;
    private int pquantity;


    public Inventory(int pid, String pname, int pquantity) {
        this.pid = pid;
        this.pname = pname;
        this.pquantity = pquantity;
    }

    public Inventory() {
        super();
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public int getPquantity() {
        return pquantity;
    }

    public void setPquantity(int pquantity) {
        this.pquantity = pquantity;
    }

    @Override
    public String toString() {
        return "Inventory{" +
                "pid=" + pid +
                ", pname='" + pname + '\'' +
                ", pquantity=" + pquantity +
                '}';
    }

}
