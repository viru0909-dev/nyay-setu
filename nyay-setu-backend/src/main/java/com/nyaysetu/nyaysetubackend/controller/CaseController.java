package com.nyaysetu.nyaysetubackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

    // This record is a simple way to define a Case data structure
    public record Case(int id, String caseNumber, String clientName, String status) {}

    @GetMapping
    @PreAuthorize("hasAnyRole('LAWYER', 'JUDGE')") // Only lawyers and judges can access this
    public ResponseEntity<List<Case>> getAllCases() {
        // In the future, you would fetch this data from your database.
        // For now, we are returning a simple, hardcoded list.
        List<Case> cases = List.of(
                new Case(1, "SC-2025-001", "Rohan Sharma", "Pending"),
                new Case(2, "SC-2025-002", "Priya Singh", "Admitted"),
                new Case(3, "SC-2025-003", "Anjali Verma", "Pending")
        );
        return ResponseEntity.ok(cases);
    }
}