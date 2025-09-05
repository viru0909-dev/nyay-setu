package com.nyaysetu.nyaysetubackend.controller;

import com.nyaysetu.nyaysetubackend.model.Evidence;
import com.nyaysetu.nyaysetubackend.service.EvidenceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/evidence")
public class EvidenceController {

    private final EvidenceService evidenceService;

    public EvidenceController(EvidenceService evidenceService) {
        this.evidenceService = evidenceService;
    }

    @PostMapping("/upload")
    @PreAuthorize("isAuthenticated()") // Any logged-in user can upload
    public ResponseEntity<?> uploadEvidence(@RequestParam("file") MultipartFile file,
                                            @RequestParam("caseId") Long caseId) {
        try {
            Evidence savedEvidence = evidenceService.saveEvidence(file, caseId);
            return new ResponseEntity<>(savedEvidence, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to upload file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
