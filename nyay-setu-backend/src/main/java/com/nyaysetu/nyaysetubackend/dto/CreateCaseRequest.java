package com.nyaysetu.nyaysetubackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateCaseRequest {

    @NotBlank(message = "Description cannot be blank")
    @Size(min = 20, message = "Description must be at least 20 characters long")
    private String description;

    // Getter and Setter
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
