package com.campusmart.repository;

import com.campusmart.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookmarkRepository extends JpaRepository<Bookmark, UUID> {
    List<Bookmark> findByUserIdOrderByCreatedAtDesc(UUID userId);
    Optional<Bookmark> findByUserIdAndListingId(UUID userId, UUID listingId);
    boolean existsByUserIdAndListingId(UUID userId, UUID listingId);
    void deleteByUserIdAndListingId(UUID userId, UUID listingId);
}
