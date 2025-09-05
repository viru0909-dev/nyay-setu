package com.nyaysetu.nyaysetubackend.dto;

import com.nyaysetu.nyaysetubackend.model.Case;
import com.nyaysetu.nyaysetubackend.model.CaseStatus;
import java.time.LocalDateTime;

public record CaseDto(
        Long id,
        String caseNumber,
        String description,
        CaseStatus status,
        LocalDateTime createdAt,
        String clientName,
        String lawyerName, // <-- ADD THIS FIELD
        String judgeName   // <-- ADD THIS FIELD
) {
    public static CaseDto fromEntity(Case caseEntity) {
        // Safely get the lawyer's name, or return "Not Assigned" if null
        String lawyerName = (caseEntity.getLawyer() != null) ? caseEntity.getLawyer().getFullName() : "Not Assigned";

        // Safely get the judge's name, or return "Not Assigned" if null
        String judgeName = (caseEntity.getJudge() != null) ? caseEntity.getJudge().getFullName() : "Not Assigned";

        return new CaseDto(
                caseEntity.getId(),
                caseEntity.getCaseNumber(),
                caseEntity.getDescription(),
                caseEntity.getStatus(),
                caseEntity.getCreatedAt(),
                caseEntity.getClient().getFullName(),
                lawyerName, // <-- POPULATE THE NEW FIELD
                judgeName   // <-- POPULATE THE NEW FIELD
        );
    }
}