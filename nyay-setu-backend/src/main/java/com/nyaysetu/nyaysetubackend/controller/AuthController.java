package com.nyaysetu.nyaysetubackend.controller;

import com.nyaysetu.nyaysetubackend.dto.RegisterRequest;
import com.nyaysetu.nyaysetubackend.model.User;
import com.nyaysetu.nyaysetubackend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        User saved = authService.register(req);
        // don’t return password
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new RegistrationResponse(saved.getId(), saved.getEmail(), saved.getRole())
        );
    }

    public record RegistrationResponse(Long id, String email, Object role) {}
}
