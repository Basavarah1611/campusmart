package com.campusmart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.UUID;

@Data
public class ReportRequest {

    @NotNull(message = "Listing ID is required")
    private UUID listingId;

    @NotBlank(message = "Reason is required")
    private String reason;

    private String description;
}
