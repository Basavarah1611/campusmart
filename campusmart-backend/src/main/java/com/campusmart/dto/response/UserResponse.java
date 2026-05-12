package com.campusmart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class UserResponse {
    private UUID id;
    private String email;
    private String fullName;
    private String phone;
    private String whatsapp;
    private String instagram;
    private String role;
    private String collegeName;
    private String avatarUrl;
    private OffsetDateTime createdAt;
}
