package com.nyaysetu.nyaysetubackend.controller;

import com.nyaysetu.nyaysetubackend.dto.HearingDto;
import com.nyaysetu.nyaysetubackend.dto.ScheduleHearingRequest;
import com.nyaysetu.nyaysetubackend.service.HearingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hearings")
public class HearingController {

    private final HearingService hearingService;

    public HearingController(HearingService hearingService) {
        this.hearingService = hearingService;
    }

    @PostMapping("/schedule")
    @PreAuthorize("hasRole('JUDGE')")
    public ResponseEntity<HearingDto> scheduleHearing(@Valid @RequestBody ScheduleHearingRequest request) {
        HearingDto scheduledHearing = hearingService.scheduleHearing(request);
        return new ResponseEntity<>(scheduledHearing, HttpStatus.CREATED);
    }
}

