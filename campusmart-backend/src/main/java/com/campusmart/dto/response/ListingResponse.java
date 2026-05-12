package com.campusmart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class ListingResponse {
    private UUID id;
    private String title;
    private String description;
    private BigDecimal price;
    private String category;
    private String status;
    private String contactEmail;
    private String contactPhone;
    private String contactWhatsapp;
    private String contactInstagram;
    private List<String> imageUrls;
    private SellerInfo seller;
    private boolean bookmarked;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    @Data
    @Builder
    @AllArgsConstructor
    public static class SellerInfo {
        private UUID id;
        private String fullName;
        private String email;
        private String avatarUrl;
        private String collegeName;
    }
}
