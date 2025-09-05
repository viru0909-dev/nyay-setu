package com.nyaysetu.nyaysetubackend.dto;

import com.nyaysetu.nyaysetubackend.model.Case;
import com.nyaysetu.nyaysetubackend.model.CaseStatus;
import java.time.LocalDateTime;

// Using a record is a concise way to create an immutable DTO
public record CaseDto(
        Long id,
        String caseNumber,
        String description,
        CaseStatus status,
        LocalDateTime createdAt,
        String clientName // We only need the client's name, not the whole object
) {
    // A helper method to easily convert a Case entity to a CaseDto
    public static CaseDto fromEntity(Case caseEntity) {
        return new CaseDto(
                caseEntity.getId(),
                caseEntity.getCaseNumber(),
                caseEntity.getDescription(),
                caseEntity.getStatus(),
                caseEntity.getCreatedAt(),
                caseEntity.getClient().getFullName() // Safely get the client's name
        );
    }
}
