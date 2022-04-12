package com.hms.AuthService.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

//    @PreAuthorize("hasRole('ROLE_OWNER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_RECEPTIONIST')")
    @GetMapping("/owner")
    @PreAuthorize("hasRole('ROLE_OWNER')")
    public String userAccess() {
        return "Owner Board.";
    }
    @GetMapping("/manager")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public String moderatorAccess() {
        return "Manager Board.";
    }
    @GetMapping("/receptionist")
    @PreAuthorize("hasRole('ROLE_RECEPTIONIST')")
    public String adminAccess() {
        return "Receptionist Board.";
    }
}