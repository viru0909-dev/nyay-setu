package com.nyaysetu.nyaysetubackend.repository;

import com.nyaysetu.nyaysetubackend.model.Hearing;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HearingRepository extends JpaRepository<Hearing, Long> {
    // Method to find all hearings for a specific case
    List<Hearing> findByLegalCaseIdOrderByScheduledAtDesc(Long caseId);
}