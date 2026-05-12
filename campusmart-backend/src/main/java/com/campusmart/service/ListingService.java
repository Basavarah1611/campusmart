package com.campusmart.service;

import com.campusmart.dto.request.ListingRequest;
import com.campusmart.dto.response.ListingResponse;
import com.campusmart.entity.*;
import com.campusmart.enums.Category;
import com.campusmart.enums.ListingStatus;
import com.campusmart.exception.ResourceNotFoundException;
import com.campusmart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    private final ListingImageRepository listingImageRepository;
    private final UserRepository userRepository;
    private final BookmarkRepository bookmarkRepository;
    private final StorageService storageService;

    public Page<ListingResponse> getListings(String search, String category, int page, int size, String userEmail) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Listing> listings;

        if (search != null && !search.isEmpty() && category != null && !category.isEmpty()) {
            listings = listingRepository.searchListingsByCategory(
                    ListingStatus.ACTIVE, Category.valueOf(category), search, pageable);
        } else if (search != null && !search.isEmpty()) {
            listings = listingRepository.searchListings(ListingStatus.ACTIVE, search, pageable);
        } else if (category != null && !category.isEmpty()) {
            listings = listingRepository.findByStatusAndCategoryOrderByCreatedAtDesc(
                    ListingStatus.ACTIVE, Category.valueOf(category), pageable);
        } else {
            listings = listingRepository.findByStatusOrderByCreatedAtDesc(ListingStatus.ACTIVE, pageable);
        }

        UUID userId = getUserIdFromEmail(userEmail);
        return listings.map(listing -> mapToResponse(listing, userId));
    }

    public ListingResponse getListingById(UUID id, String userEmail) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));
        UUID userId = getUserIdFromEmail(userEmail);
        return mapToResponse(listing, userId);
    }

    @Transactional
    public ListingResponse createListing(ListingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Listing listing = Listing.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(Category.valueOf(request.getCategory()))
                .contactEmail(request.getContactEmail())
                .contactPhone(request.getContactPhone())
                .contactWhatsapp(request.getContactWhatsapp())
                .contactInstagram(request.getContactInstagram())
                .build();

        listing = listingRepository.save(listing);
        return mapToResponse(listing, user.getId());
    }

    @Transactional
    public ListingResponse updateListing(UUID id, ListingRequest request, String userEmail) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        if (!listing.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("You can only edit your own listings");
        }

        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPrice(request.getPrice());
        listing.setCategory(Category.valueOf(request.getCategory()));
        listing.setContactEmail(request.getContactEmail());
        listing.setContactPhone(request.getContactPhone());
        listing.setContactWhatsapp(request.getContactWhatsapp());
        listing.setContactInstagram(request.getContactInstagram());

        listing = listingRepository.save(listing);
        return mapToResponse(listing, listing.getUser().getId());
    }

    @Transactional
    public void deleteListing(UUID id, String userEmail) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        if (!listing.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("You can only delete your own listings");
        }

        listingRepository.delete(listing);
    }

    @Transactional
    public List<String> uploadImages(UUID listingId, MultipartFile[] files, String userEmail) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        if (!listing.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("You can only upload images to your own listings");
        }

        List<String> urls = new java.util.ArrayList<>();
        int order = listing.getImages().size();

        for (MultipartFile file : files) {
            String url = storageService.uploadFile(file);
            ListingImage image = ListingImage.builder()
                    .listing(listing)
                    .imageUrl(url)
                    .displayOrder(order++)
                    .build();
            listingImageRepository.save(image);
            urls.add(url);
        }

        return urls;
    }

    public List<ListingResponse> getUserListings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return listingRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(listing -> mapToResponse(listing, user.getId()))
                .collect(Collectors.toList());
    }

    private UUID getUserIdFromEmail(String email) {
        if (email == null) return null;
        return userRepository.findByEmail(email).map(User::getId).orElse(null);
    }

    private ListingResponse mapToResponse(Listing listing, UUID currentUserId) {
        List<String> imageUrls = listing.getImages().stream()
                .map(ListingImage::getImageUrl)
                .collect(Collectors.toList());

        boolean isBookmarked = false;
        if (currentUserId != null) {
            isBookmarked = bookmarkRepository.existsByUserIdAndListingId(currentUserId, listing.getId());
        }

        User seller = listing.getUser();

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
                .bookmarked(isBookmarked)
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
    }
}
