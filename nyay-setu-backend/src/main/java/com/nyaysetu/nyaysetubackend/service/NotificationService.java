package com.nyaysetu.nyaysetubackend.service;

import com.nyaysetu.nyaysetubackend.model.Notification;
import com.nyaysetu.nyaysetubackend.model.User;
import com.nyaysetu.nyaysetubackend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public void createNotification(User recipient, String message) {
        if (recipient == null) {
            return; // Do not create a notification for a null user
        }
        Notification notification = new Notification();
        notification.setRecipient(recipient);
        notification.setMessage(message);
        notificationRepository.save(notification);
    }
}