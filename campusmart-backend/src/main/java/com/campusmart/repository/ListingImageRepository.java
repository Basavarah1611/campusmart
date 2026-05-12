package com.campusmart.repository;

import com.campusmart.entity.ListingImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ListingImageRepository extends JpaRepository<ListingImage, UUID> {
    List<ListingImage> findByListingIdOrderByDisplayOrder(UUID listingId);
    void deleteByListingId(UUID listingId);
}
