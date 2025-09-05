package com.nyaysetu.nyaysetubackend.dto;

import com.nyaysetu.nyaysetubackend.model.User;

public record UserDto(Long id, String fullName) {
    public static UserDto fromEntity(User user) {
        return new UserDto(user.getId(), user.getFullName());
    }
}
