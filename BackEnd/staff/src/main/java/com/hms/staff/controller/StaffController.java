package com.hms.staff.controller;


import com.hms.staff.model.Staff;
import com.hms.staff.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/staff")
public class StaffController {

    @Autowired
    StaffService staffService;


    @GetMapping("/get")
    public ResponseEntity<?> getAllStaff(){
        return staffService.getAllStaff();
    }

    @GetMapping("/get/{code}")
    public ResponseEntity<?> getStaffByCode(@PathVariable int code){
        return staffService.getByEmployeeCode(code);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewStaff(@RequestBody Staff staff) {
        System.out.println("Add Emp");
        return staffService.addStaff(staff);
    }


    @PatchMapping("/update/{code}")
    public ResponseEntity<?> updateStaffMember(@PathVariable int code, @RequestBody Staff staff){
        return staffService.updateStaffMember(code,staff);
    }

    @DeleteMapping("/delete/{code}")
    public ResponseEntity<?> deleteStaffEmployee(@PathVariable int code){
        return staffService.deleteStaff(code);
    }
}
