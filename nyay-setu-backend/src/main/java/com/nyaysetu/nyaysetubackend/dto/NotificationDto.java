package com.nyaysetu.nyaysetubackend.dto;

import com.nyaysetu.nyaysetubackend.model.Notification;
import java.time.LocalDateTime;

public record NotificationDto(
        Long id,
        String message,
        boolean isRead,
        LocalDateTime createdAt
) {
    public static NotificationDto fromEntity(Notification notification) {
        return new NotificationDto(
                notification.getId(),
                notification.getMessage(),
                notification.isRead(),
                notification.getCreatedAt()
        );
    }
}