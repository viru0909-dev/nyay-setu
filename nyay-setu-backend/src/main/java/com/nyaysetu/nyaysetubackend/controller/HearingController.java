package com.nyaysetu.nyaysetubackend.controller;

import com.nyaysetu.nyaysetubackend.dto.HearingDto;
import com.nyaysetu.nyaysetubackend.dto.ScheduleHearingRequest;
import com.nyaysetu.nyaysetubackend.service.HearingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hearings")
public class HearingController {

    private final HearingService hearingService;

    public HearingController(HearingService hearingService) {
        this.hearingService = hearingService;
    }

    @GetMapping("/by-case/{caseId}")
    @PreAuthorize("isAuthenticated()") // Any authenticated user can view hearings for a case
    public ResponseEntity<List<HearingDto>> getHearingsForCase(@PathVariable Long caseId) {
        List<HearingDto> hearings = hearingService.findHearingsByCaseId(caseId);
        return ResponseEntity.ok(hearings);
    }

    @PostMapping("/schedule")
    @PreAuthorize("hasRole('JUDGE')")
    public ResponseEntity<HearingDto> scheduleHearing(@Valid @RequestBody ScheduleHearingRequest request) {
        HearingDto scheduledHearing = hearingService.scheduleHearing(request);
        return new ResponseEntity<>(scheduledHearing, HttpStatus.CREATED);
    }
}

