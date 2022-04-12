package com.hms.staff.repository;

import com.hms.staff.model.Staff;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository // Repository
public interface StaffRepo extends MongoRepository<Staff,String> {

    @Query("{employeeName:'?0'}")
    public Staff findByEmployeeName(String name);

    @Query("{employeeCode:?0}")
    public Staff findByEmployeeCode(int employeeCode);

}