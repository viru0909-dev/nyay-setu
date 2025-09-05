package com.nyaysetu.nyaysetubackend.service;

import com.nyaysetu.nyaysetubackend.dto.CreateCaseRequest;
import com.nyaysetu.nyaysetubackend.model.Case;
import com.nyaysetu.nyaysetubackend.model.CaseStatus;
import com.nyaysetu.nyaysetubackend.model.Role;
import com.nyaysetu.nyaysetubackend.model.User;
import com.nyaysetu.nyaysetubackend.repository.CaseRepository;
import com.nyaysetu.nyaysetubackend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.nyaysetu.nyaysetubackend.dto.CaseDto;
import java.util.stream.Collectors;

import java.time.Year;
import java.util.List;
import java.util.UUID;

@Service
public class CaseService {

    private final CaseRepository caseRepository;
    private final UserRepository userRepository;

    public CaseService(CaseRepository caseRepository, UserRepository userRepository) {
        this.caseRepository = caseRepository;
        this.userRepository = userRepository;
    }

    public List<CaseDto> findAllCases() {
        return caseRepository.findAll()
                .stream()
                .map(CaseDto::fromEntity) // Convert each Case to a CaseDto
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CaseDto> findCasesForCurrentUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User client = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + userEmail));

        return caseRepository.findByClientId(client.getId())
                .stream()
                .map(CaseDto::fromEntity) // Convert each Case to a CaseDto
                .collect(Collectors.toList());
    }


    @Transactional
    public Case createCase(CreateCaseRequest request) {
        // Get the currently authenticated user's email
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User client = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Client not found with email: " + userEmail));

        Case newCase = new Case();
        newCase.setDescription(request.getDescription());
        newCase.setClient(client);
        newCase.setStatus(CaseStatus.FILED);

        // Generate a unique case number, e.g., "SC-2025-ABCD-EFGH"
        String caseNumber = String.format("SC-%d-%s",
                Year.now().getValue(),
                UUID.randomUUID().toString().substring(0, 8).toUpperCase()
        );
        newCase.setCaseNumber(caseNumber);

        return caseRepository.save(newCase);
    }



    @Transactional
    public Case assignLawyerToCase(Long caseId, Long lawyerId) {
        // 1. Find the case
        Case theCase = caseRepository.findById(caseId)
                .orElseThrow(() -> new RuntimeException("Case not found with id: " + caseId));

        // 2. Find the user who is a lawyer
        User lawyer = userRepository.findById(lawyerId)
                .orElseThrow(() -> new RuntimeException("Lawyer not found with id: " + lawyerId));

        // 3. Check if the user is actually a lawyer
        if (lawyer.getRole() != Role.ROLE_LAWYER) {
            throw new IllegalArgumentException("User with id " + lawyerId + " is not a lawyer.");
        }

        // 4. Assign the lawyer and save
        theCase.setLawyer(lawyer);
        return caseRepository.save(theCase);
    }


    @Transactional(readOnly = true) // Add this for performance
    public CaseDto findCaseById(Long caseId) {
        Case caseEntity = caseRepository.findById(caseId)
                .orElseThrow(() -> new RuntimeException("Case not found with id: " + caseId));
        return CaseDto.fromEntity(caseEntity);
    }

}
