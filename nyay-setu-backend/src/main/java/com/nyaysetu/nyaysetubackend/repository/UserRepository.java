package com.nyaysetu.nyaysetubackend.repository;



import com.nyaysetu.nyaysetubackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nyaysetu.nyaysetubackend.model.Role;
import java.util.List;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(Role role);
}
