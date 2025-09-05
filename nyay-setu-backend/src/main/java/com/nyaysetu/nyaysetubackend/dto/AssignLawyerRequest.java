package com.nyaysetu.nyaysetubackend.dto;

import jakarta.validation.constraints.NotNull;

public class AssignLawyerRequest {

    @NotNull(message = "Lawyer ID cannot be null")
    private Long lawyerId;

    // Getter and Setter
    public Long getLawyerId() {
        return lawyerId;
    }

    public void setLawyerId(Long lawyerId) {
        this.lawyerId = lawyerId;
    }
}
