package com.campusmart.repository;

import com.campusmart.entity.Listing;
import com.campusmart.enums.Category;
import com.campusmart.enums.ListingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ListingRepository extends JpaRepository<Listing, UUID> {

    Page<Listing> findByStatusOrderByCreatedAtDesc(ListingStatus status, Pageable pageable);

    Page<Listing> findByStatusAndCategoryOrderByCreatedAtDesc(ListingStatus status, Category category, Pageable pageable);

    @Query("SELECT l FROM Listing l WHERE l.status = :status AND " +
           "(LOWER(l.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(l.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY l.createdAt DESC")
    Page<Listing> searchListings(@Param("status") ListingStatus status,
                                 @Param("search") String search,
                                 Pageable pageable);

    @Query("SELECT l FROM Listing l WHERE l.status = :status AND l.category = :category AND " +
           "(LOWER(l.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(l.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY l.createdAt DESC")
    Page<Listing> searchListingsByCategory(@Param("status") ListingStatus status,
                                           @Param("category") Category category,
                                           @Param("search") String search,
                                           Pageable pageable);

    List<Listing> findByUserIdOrderByCreatedAtDesc(UUID userId);

    long countByStatus(ListingStatus status);
}
