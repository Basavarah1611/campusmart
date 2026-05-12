package com.campusmart.controller;

import com.campusmart.dto.request.ListingRequest;
import com.campusmart.dto.response.ApiResponse;
import com.campusmart.dto.response.ListingResponse;
import com.campusmart.service.ListingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @GetMapping
    public ResponseEntity<Page<ListingResponse>> getListings(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(listingService.getListings(search, category, page, size, email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingResponse> getListingById(@PathVariable UUID id,
                                                           Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(listingService.getListingById(id, email));
    }

    @PostMapping
    public ResponseEntity<ListingResponse> createListing(@Valid @RequestBody ListingRequest request,
                                                          Authentication authentication) {
        return ResponseEntity.ok(listingService.createListing(request, authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListingResponse> updateListing(@PathVariable UUID id,
                                                          @Valid @RequestBody ListingRequest request,
                                                          Authentication authentication) {
        return ResponseEntity.ok(listingService.updateListing(id, request, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteListing(@PathVariable UUID id,
                                                      Authentication authentication) {
        listingService.deleteListing(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Listing deleted successfully"));
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<ApiResponse> uploadImages(@PathVariable UUID id,
                                                     @RequestParam("files") MultipartFile[] files,
                                                     Authentication authentication) {
        List<String> urls = listingService.uploadImages(id, files, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Images uploaded successfully", urls));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ListingResponse>> getMyListings(Authentication authentication) {
        return ResponseEntity.ok(listingService.getUserListings(authentication.getName()));
    }
}
