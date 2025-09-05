package com.nyaysetu.nyaysetubackend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ScheduleHearingRequest {

    @NotNull(message = "Case ID cannot be null")
    private Long caseId;

    @NotNull(message = "Scheduled time cannot be null")
    @Future(message = "Scheduled time must be in the future")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime scheduledAt;

    @NotBlank(message = "Meeting link cannot be blank")
    private String meetingLink;

    private String notes;

    // Getters and Setters
    public Long getCaseId() { return caseId; }
    public void setCaseId(Long caseId) { this.caseId = caseId; }
    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }
    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}

