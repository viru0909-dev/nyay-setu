package com.nyaysetu.nyaysetubackend.service;

import com.nyaysetu.nyaysetubackend.model.Case;
import com.nyaysetu.nyaysetubackend.model.Evidence;
import com.nyaysetu.nyaysetubackend.model.User;
import com.nyaysetu.nyaysetubackend.repository.CaseRepository;
import com.nyaysetu.nyaysetubackend.repository.EvidenceRepository;
import com.nyaysetu.nyaysetubackend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import com.nyaysetu.nyaysetubackend.dto.EvidenceDto;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvidenceService {

    private final EvidenceRepository evidenceRepository;
    private final FileStorageService fileStorageService;
    private final CaseRepository caseRepository;
    private final UserRepository userRepository;

    public EvidenceService(EvidenceRepository evidenceRepository, FileStorageService fileStorageService, CaseRepository caseRepository, UserRepository userRepository) {
        this.evidenceRepository = evidenceRepository;
        this.fileStorageService = fileStorageService;
        this.caseRepository = caseRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<EvidenceDto> findEvidenceByCaseId(Long caseId) {
        // Here you could add extra security to check if the current user
        // is actually part of this case, but for now we'll keep it simple.
        return evidenceRepository.findByLegalCaseId(caseId)
                .stream()
                .map(EvidenceDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public Evidence saveEvidence(MultipartFile file, Long caseId) throws IOException, NoSuchAlgorithmException {
        // 1. Store the file on disk
        String fileName = fileStorageService.storeFile(file);
        // 2. Calculate the file's SHA-256 hash
        String hash = fileStorageService.calculateSHA256(file);

        // 3. Get metadata and related entities
        Case legalCase = caseRepository.findById(caseId)
                .orElseThrow(() -> new RuntimeException("Case not found with id: " + caseId));
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 4. Create and save the Evidence entity
        Evidence evidence = new Evidence();
        evidence.setFileName(fileName);
        evidence.setFileType(file.getContentType());
        evidence.setFilePath(fileStorageService.getFileStorageLocation().resolve(fileName).toString());
        evidence.setSha256Hash(hash);

        evidence.setLegalCase(legalCase);
        evidence.setUploadedBy(currentUser);

        return evidenceRepository.save(evidence);
    }
}

