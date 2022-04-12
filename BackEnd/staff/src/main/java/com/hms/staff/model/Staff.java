package com.hms.staff.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document // MongoDB
public class Staff {
    @Id
    private String id;

    @Indexed(unique = true)
    private int employeeCode;
    private String employeeName;
    private String employeeAddress;
    private float employeeSalary;
    private String employeeNIC;
    private int employeeAge;
    private String employeeOccupation;
    private String employeeEmail;

    public Staff() {
    }

//    public Staff(String id, int employeeCode, String employeeName, String employeeAddress, float employeeSalary, String employeeNIC, int employeeAge, String employeeOccupation, String employeeEmail) {
//        this.id = id;
//        this.employeeCode = employeeCode;
//        this.employeeName = employeeName;
//        this.employeeAddress = employeeAddress;
//        this.employeeSalary = employeeSalary;
//        this.employeeNIC = employeeNIC;
//        this.employeeAge = employeeAge;
//        this.employeeOccupation = employeeOccupation;
//        this.employeeEmail = employeeEmail;
//    }

    public Staff(int employeeCode, String employeeName, String employeeAddress, float employeeSalary, String employeeNIC, int employeeAge, String employeeOccupation, String employeeEmail) {
        this.employeeCode = employeeCode;
        this.employeeName = employeeName;
        this.employeeAddress = employeeAddress;
        this.employeeSalary = employeeSalary;
        this.employeeNIC = employeeNIC;
        this.employeeAge = employeeAge;
        this.employeeOccupation = employeeOccupation;
        this.employeeEmail = employeeEmail;
    }

//    public String getId(String s) {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }

    public int getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(int employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeAddress() {
        return employeeAddress;
    }

    public void setEmployeeAddress(String employeeAddress) {
        this.employeeAddress = employeeAddress;
    }

    public float getEmployeeSalary() {
        return employeeSalary;
    }

    public void setEmployeeSalary(float employeeSalary) {
        this.employeeSalary = employeeSalary;
    }

    public String getEmployeeNIC() {
        return employeeNIC;
    }

    public void setEmployeeNIC(String employeeNIC) {
        this.employeeNIC = employeeNIC;
    }

    public int getEmployeeAge() {
        return employeeAge;
    }

    public void setEmployeeAge(int employeeAge) {
        this.employeeAge = employeeAge;
    }

    public String getEmployeeOccupation() {
        return employeeOccupation;
    }

    public void setEmployeeOccupation(String employeeOccupation) {
        this.employeeOccupation = employeeOccupation;
    }

    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

//    @Override
//    public String toString() {
//        return "Staff{" +
//                "id=" + id +
//                ", employeeCode=" + employeeCode +
//                ", employeeName='" + employeeName + '\'' +
//                ", employeeAddress='" + employeeAddress + '\'' +
//                ", employeeSalary=" + employeeSalary +
//                ", employeeNIC='" + employeeNIC + '\'' +
//                ", employeeAge=" + employeeAge +
//                ", employeeOccupation='" + employeeOccupation + '\'' +
//                ", employeeEmail='" + employeeEmail + '\'' +
//                '}';
//    }
}
