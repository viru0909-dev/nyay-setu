package com.nyaysetu.nyaysetubackend.repository;

import com.nyaysetu.nyaysetubackend.model.Case;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CaseRepository extends JpaRepository<Case, Long> {
    // You can add custom query methods here later, for example:
    List<Case> findByClientId(Long clientId);
}
