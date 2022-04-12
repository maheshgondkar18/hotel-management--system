package com.hms.staff.service;

import com.hms.staff.model.Staff;
import com.hms.staff.repository.StaffRepo;
import com.mongodb.DuplicateKeyException;
import com.mongodb.MongoWriteException;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {
    @Autowired
    StaffRepo staffRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    public StaffService(StaffRepo staffRepo) {
        this.staffRepo= staffRepo;
    }




    public Staff getStaffByName(String name){
        return staffRepo.findByEmployeeName(name);
    }

    public ResponseEntity<?> getByEmployeeCode(int code){
        Staff s = staffRepo.findByEmployeeCode(code);
        if(s == null)
            return ResponseEntity.status(404).body("Staff Not Found with employeeCode : "+code);
        return ResponseEntity.ok(s);
    }

    public ResponseEntity<List> getAllStaff(){
        return ResponseEntity.ok(staffRepo.findAll());
    }

    public ResponseEntity<?> addStaff(Staff staff){
        try {
            return ResponseEntity.ok(staffRepo.save(staff));
        }catch (Exception e){
            return ResponseEntity.status(409).body("Duplicate value for Employee code");
        }
    }


    public ResponseEntity updateStaffMember(int code, Staff staff){
        try{
            Query query = new Query(Criteria.where("employeeCode").is(code));
            Update update = new Update();

            if(staff.getEmployeeName() != null)
                update.set("employeeName",staff.getEmployeeName());
            if(staff.getEmployeeAddress() != null)
                update.set("employeeAddress",staff.getEmployeeAddress());
            if(staff.getEmployeeSalary() != 0.0)
                update.set("employeeSalary",staff.getEmployeeSalary());
            if(staff.getEmployeeNIC() != null)
                update.set("employeeNIC",staff.getEmployeeNIC());
            if(staff.getEmployeeAge() != 0)
                update.set("employeeAge",staff.getEmployeeAge());
            if(staff.getEmployeeOccupation() != null)
                update.set("employeeOccupation",staff.getEmployeeOccupation());
            if(staff.getEmployeeEmail() != null)
                update.set("employeeEmail",staff.getEmployeeEmail());

            UpdateResult result =  mongoTemplate.updateFirst(query, update, Staff.class);
            if(result.getMatchedCount()==0)
                return ResponseEntity.status(404).body("Staff not found with Employee Code : "+code);
            return ResponseEntity.ok("Staff details updated, Employee Code : "+code);
        }catch (Exception e){
            return ResponseEntity.internalServerError().body("Something went wrong");
        }
    }

    public ResponseEntity deleteStaff(int code){
        try {
            staffRepo.delete(staffRepo.findByEmployeeCode(code));
            return ResponseEntity.ok("Staff with Employee code : "+code+" Deleted successfully...!");
        }catch (Exception e){
            return ResponseEntity.status(400).body("Unable to delete Staff with Employee Code "+code);
        }
    }
}
