package com.nyaysetu.nyaysetubackend.service;

import com.nyaysetu.nyaysetubackend.dto.UserDto;
import com.nyaysetu.nyaysetubackend.model.Role;
import com.nyaysetu.nyaysetubackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<UserDto> findAllLawyers() {
        return userRepository.findByRole(Role.ROLE_LAWYER)
                .stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }
}