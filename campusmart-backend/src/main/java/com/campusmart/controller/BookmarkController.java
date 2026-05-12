package com.campusmart.controller;

import com.campusmart.dto.response.ApiResponse;
import com.campusmart.dto.response.ListingResponse;
import com.campusmart.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/{listingId}")
    public ResponseEntity<ApiResponse> toggleBookmark(@PathVariable UUID listingId,
                                                       Authentication authentication) {
        boolean added = bookmarkService.toggleBookmark(listingId, authentication.getName());
        String message = added ? "Listing bookmarked" : "Bookmark removed";
        return ResponseEntity.ok(ApiResponse.success(message, added));
    }

    @GetMapping
    public ResponseEntity<List<ListingResponse>> getSavedListings(Authentication authentication) {
        return ResponseEntity.ok(bookmarkService.getSavedListings(authentication.getName()));
    }
}
