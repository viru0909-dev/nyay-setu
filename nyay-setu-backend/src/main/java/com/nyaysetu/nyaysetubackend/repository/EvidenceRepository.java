package com.nyaysetu.nyaysetubackend.repository;

import com.nyaysetu.nyaysetubackend.model.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvidenceRepository extends JpaRepository<Evidence, Long> {
    // You can add methods to find evidence by case, e.g.:
    // List<Evidence> findByLegalCaseId(Long caseId);
}