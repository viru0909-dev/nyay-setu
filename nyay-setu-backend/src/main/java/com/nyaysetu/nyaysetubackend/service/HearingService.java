package com.nyaysetu.nyaysetubackend.service;

import com.nyaysetu.nyaysetubackend.dto.HearingDto;
import com.nyaysetu.nyaysetubackend.dto.ScheduleHearingRequest;
import com.nyaysetu.nyaysetubackend.model.Case;
import com.nyaysetu.nyaysetubackend.model.Hearing;
import com.nyaysetu.nyaysetubackend.model.User;
import com.nyaysetu.nyaysetubackend.repository.CaseRepository;
import com.nyaysetu.nyaysetubackend.repository.HearingRepository;
import com.nyaysetu.nyaysetubackend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HearingService {

    private final HearingRepository hearingRepository;
    private final CaseRepository caseRepository;
    private final UserRepository userRepository;

    public HearingService(HearingRepository hearingRepository, CaseRepository caseRepository, UserRepository userRepository) {
        this.hearingRepository = hearingRepository;
        this.caseRepository = caseRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public HearingDto scheduleHearing(ScheduleHearingRequest request) {
        // Find the case to link the hearing to
        Case legalCase = caseRepository.findById(request.getCaseId())
                .orElseThrow(() -> new RuntimeException("Case not found with id: " + request.getCaseId()));

        // Get the currently logged-in user (the judge)
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User judge = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create and populate the new Hearing entity
        Hearing newHearing = new Hearing();
        newHearing.setLegalCase(legalCase);
        newHearing.setScheduledBy(judge);
        newHearing.setScheduledAt(request.getScheduledAt());
        newHearing.setMeetingLink(request.getMeetingLink());
        newHearing.setNotes(request.getNotes());

        // Save the new hearing to the database
        Hearing savedHearing = hearingRepository.save(newHearing);

        // Convert to DTO to safely return to the controller
        return HearingDto.fromEntity(savedHearing);
    }

    @Transactional(readOnly = true)
    public List<HearingDto> findHearingsByCaseId(Long caseId) {
        // In a future version, you could add security here to ensure the
        // requesting user is actually part of this case.
        return hearingRepository.findByLegalCaseIdOrderByScheduledAtDesc(caseId)
                .stream()
                .map(HearingDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HearingDto findHearingById(Long hearingId) {
        Hearing hearing = hearingRepository.findById(hearingId)
                .orElseThrow(() -> new RuntimeException("Hearing not found with id: " + hearingId));
        return HearingDto.fromEntity(hearing);
    }
}

