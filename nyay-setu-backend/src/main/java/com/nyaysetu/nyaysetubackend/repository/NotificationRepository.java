package com.nyaysetu.nyaysetubackend.repository;

import com.nyaysetu.nyaysetubackend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Find all notifications for a specific user, ordered by most recent
    List<Notification> findByRecipientIdOrderByCreatedAtDesc(Long recipientId);
}