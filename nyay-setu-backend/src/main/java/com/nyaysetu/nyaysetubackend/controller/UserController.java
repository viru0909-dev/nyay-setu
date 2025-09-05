package com.nyaysetu.nyaysetubackend.controller;

import com.nyaysetu.nyaysetubackend.dto.UserDto;
import com.nyaysetu.nyaysetubackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/lawyers")
    @PreAuthorize("hasRole('JUDGE')")
    public ResponseEntity<List<UserDto>> getAllLawyers() {
        return ResponseEntity.ok(userService.findAllLawyers());
    }
}
