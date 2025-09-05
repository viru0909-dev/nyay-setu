package com.nyaysetu.nyaysetubackend.controller;

import com.nyaysetu.nyaysetubackend.dto.CaseDto;
import com.nyaysetu.nyaysetubackend.dto.CreateCaseRequest;
import com.nyaysetu.nyaysetubackend.model.Case; // Using the correct Case model
import com.nyaysetu.nyaysetubackend.service.CaseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

    private final CaseService caseService;

    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    // REMOVED the local record Case definition

    @GetMapping
    @PreAuthorize("hasAnyRole('LAWYER', 'JUDGE')") // Let's restrict it for this test
    public ResponseEntity<List<CaseDto>> getAllCases() {
        List<CaseDto> cases = caseService.findAllCases();
        return ResponseEntity.ok(cases);
    }

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Case> createCase(@Valid @RequestBody CreateCaseRequest request) {
        Case newCase = caseService.createCase(request);
        return new ResponseEntity<>(newCase, HttpStatus.CREATED);
    }
}