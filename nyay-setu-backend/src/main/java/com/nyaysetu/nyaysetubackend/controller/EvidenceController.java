package com.nyaysetu.nyaysetubackend.controller;

import com.nyaysetu.nyaysetubackend.model.Evidence;
import com.nyaysetu.nyaysetubackend.service.EvidenceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.nyaysetu.nyaysetubackend.dto.EvidenceDto;
import java.util.List;

@RestController
@RequestMapping("/api/evidence")
public class EvidenceController {

    private final EvidenceService evidenceService;

    public EvidenceController(EvidenceService evidenceService) {
        this.evidenceService = evidenceService;
    }

    @PostMapping("/upload")
    @PreAuthorize("@caseService.findCaseById(#caseId).client.email == authentication.name or " +
            "@caseService.findCaseById(#caseId).lawyer?.email == authentication.name or " +
            "@caseService.findCaseById(#caseId).judge?.email == authentication.name")

    public ResponseEntity<?> uploadEvidence(@RequestParam("file") MultipartFile file,
                                           @RequestParam("caseId") Long caseId) {
        try {
            // The service now returns an EvidenceDto
            EvidenceDto savedEvidenceDto = evidenceService.saveEvidence(file, caseId);
            return new ResponseEntity<>(savedEvidenceDto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to upload file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/by-case/{caseId}")
    @PreAuthorize("isAuthenticated()") // For now, any authenticated user can see evidence
    public ResponseEntity<List<EvidenceDto>> getEvidenceForCase(@PathVariable Long caseId) {
        List<EvidenceDto> evidenceList = evidenceService.findEvidenceByCaseId(caseId);
        return ResponseEntity.ok(evidenceList);
    }
}
