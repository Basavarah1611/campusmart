package com.campusmart.service;

import com.campusmart.dto.response.ListingResponse;
import com.campusmart.entity.*;
import com.campusmart.exception.ResourceNotFoundException;
import com.campusmart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    @Transactional
    public boolean toggleBookmark(UUID listingId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        if (bookmarkRepository.existsByUserIdAndListingId(user.getId(), listingId)) {
            bookmarkRepository.deleteByUserIdAndListingId(user.getId(), listingId);
            return false; // removed
        } else {
            Bookmark bookmark = Bookmark.builder()
                    .user(user)
                    .listing(listing)
                    .build();
            bookmarkRepository.save(bookmark);
            return true; // added
        }
    }

    public List<ListingResponse> getSavedListings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return bookmarkRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(bookmark -> {
                    Listing listing = bookmark.getListing();
                    User seller = listing.getUser();
                    List<String> imageUrls = listing.getImages().stream()
                            .map(ListingImage::getImageUrl)
                            .collect(Collectors.toList());

                    return ListingResponse.builder()
                            .id(listing.getId())
                            .title(listing.getTitle())
                            .description(listing.getDescription())
                            .price(listing.getPrice())
                            .category(listing.getCategory().name())
                            .status(listing.getStatus().name())
                            .contactEmail(listing.getContactEmail())
                            .contactPhone(listing.getContactPhone())
                            .contactWhatsapp(listing.getContactWhatsapp())
                            .contactInstagram(listing.getContactInstagram())
                            .imageUrls(imageUrls)
                            .bookmarked(true)
                            .seller(ListingResponse.SellerInfo.builder()
                                    .id(seller.getId())
                                    .fullName(seller.getFullName())
                                    .email(seller.getEmail())
                                    .avatarUrl(seller.getAvatarUrl())
                                    .collegeName(seller.getCollegeName())
                                    .build())
                            .createdAt(listing.getCreatedAt())
                            .updatedAt(listing.getUpdatedAt())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
