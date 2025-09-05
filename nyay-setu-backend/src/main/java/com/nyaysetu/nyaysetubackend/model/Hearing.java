package com.nyaysetu.nyaysetubackend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "hearings")
public class Hearing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    @Column(nullable = false)
    private String meetingLink;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String notes; // Optional notes or agenda for the hearing

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    // --- Relationships ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_id", nullable = false)
    private Case legalCase;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private User scheduledBy; // The judge who scheduled it

    // --- Constructors, Getters & Setters ---
    public Hearing() {}

    // You can generate the rest using IntelliJ (Alt + Insert)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }
    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Case getLegalCase() { return legalCase; }
    public void setLegalCase(Case legalCase) { this.legalCase = legalCase; }
    public User getScheduledBy() { return scheduledBy; }
    public void setScheduledBy(User scheduledBy) { this.scheduledBy = scheduledBy; }
}