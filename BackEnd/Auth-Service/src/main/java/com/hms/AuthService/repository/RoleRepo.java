package com.hms.AuthService.repository;

import com.hms.AuthService.model.ERole;
import com.hms.AuthService.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepo extends MongoRepository<Role,String> {
    Optional<Role> findByName(ERole name);
}
