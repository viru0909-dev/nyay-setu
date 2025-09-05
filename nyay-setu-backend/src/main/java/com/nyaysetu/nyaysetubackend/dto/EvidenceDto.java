package com.nyaysetu.nyaysetubackend.dto;

import com.nyaysetu.nyaysetubackend.model.Evidence;
import java.time.LocalDateTime;

public record EvidenceDto(
        Long id,
        String fileName,
        String fileType,
        String sha256Hash,
        LocalDateTime uploadedAt,
        String uploadedByUsername
) {
    public static EvidenceDto fromEntity(Evidence evidence) {
        return new EvidenceDto(
                evidence.getId(),
                evidence.getFileName(),
                evidence.getFileType(),
                evidence.getSha256Hash(),
                evidence.getUploadedAt(),
                evidence.getUploadedBy().getFullName()
        );
    }
}
