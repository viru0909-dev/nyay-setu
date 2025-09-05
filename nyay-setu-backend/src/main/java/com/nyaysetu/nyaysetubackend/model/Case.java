package com.nyaysetu.nyaysetubackend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "cases")
public class Case {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String caseNumber;

    @Lob // Specifies that this should be stored as a Large Object (TEXT in PostgreSQL)
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CaseStatus status;

    // --- Relationships ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private User client; // The client who filed the case

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lawyer_id") // Can be null initially
    private User lawyer; // The lawyer assigned to the case

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "judge_id") // Can be null initially
    private User judge; // The judge assigned to the case


    // --- Timestamps ---

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // --- Constructors, Getters, and Setters ---

    public Case() {}

    // You can generate the rest of the getters and setters in IntelliJ
    // (Alt + Insert -> Getter and Setter)

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public CaseStatus getStatus() { return status; }
    public void setStatus(CaseStatus status) { this.status = status; }
    public User getClient() { return client; }
    public void setClient(User client) { this.client = client; }
    public User getLawyer() { return lawyer; }
    public void setLawyer(User lawyer) { this.lawyer = lawyer; }
    public User getJudge() { return judge; }
    public void setJudge(User judge) { this.judge = judge; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
