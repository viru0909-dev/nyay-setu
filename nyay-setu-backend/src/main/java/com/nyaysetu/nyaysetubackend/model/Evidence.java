package com.nyaysetu.nyaysetubackend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "evidence")
public class Evidence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileType;

    // This will store the path to the file on the server
    @Column(nullable = false)
    private String filePath;

    // This is the crucial field for your tamper-proof feature
    @Column(nullable = false, length = 64) // SHA-256 hash is 64 hex characters
    private String sha256Hash;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime uploadedAt;

    // --- Relationships ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "case_id", nullable = false)
    private Case legalCase; // Renamed to avoid conflict with Java's 'case' keyword

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by_user_id", nullable = false)
    private User uploadedBy;


    // --- Constructors, Getters & Setters ---
    public Evidence() {}

    // You can generate the rest using IntelliJ (Alt + Insert)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    public String getSha256Hash() { return sha256Hash; }
    public void setSha256Hash(String sha256Hash) { this.sha256Hash = sha256Hash; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
    public Case getLegalCase() { return legalCase; }
    public void setLegalCase(Case legalCase) { this.legalCase = legalCase; }
    public User getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(User uploadedBy) { this.uploadedBy = uploadedBy; }
}
