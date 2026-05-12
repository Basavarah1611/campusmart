package com.campusmart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ListingRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private BigDecimal price;

    @NotNull(message = "Category is required")
    private String category;

    private String contactEmail;
    private String contactPhone;
    private String contactWhatsapp;
    private String contactInstagram;
}
