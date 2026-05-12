package com.campusmart.service;

import com.campusmart.dto.request.ReportRequest;
import com.campusmart.dto.response.ApiResponse;
import com.campusmart.entity.*;
import com.campusmart.enums.ReportStatus;
import com.campusmart.exception.ResourceNotFoundException;
import com.campusmart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    public ApiResponse createReport(ReportRequest request, String userEmail) {
        User reporter = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));

        Report report = Report.builder()
                .reporter(reporter)
                .listing(listing)
                .reason(request.getReason())
                .description(request.getDescription())
                .build();

        reportRepository.save(report);
        return ApiResponse.success("Report submitted successfully");
    }
}
