package com.nyaysetu.nyaysetubackend.dto;

import com.nyaysetu.nyaysetubackend.model.Hearing;

import java.time.LocalDateTime;

public record HearingDto(
        Long id,
        LocalDateTime scheduledAt,
        String meetingLink,
        String notes,
        String caseNumber,
        String scheduledByJudgeName
) {
    public static HearingDto fromEntity(Hearing hearing) {
        return new HearingDto(
                hearing.getId(),
                hearing.getScheduledAt(),
                hearing.getMeetingLink(),
                hearing.getNotes(),
                hearing.getLegalCase().getCaseNumber(),
                hearing.getScheduledBy().getFullName()
        );
    }
}

