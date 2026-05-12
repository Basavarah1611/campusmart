package com.campusmart.service;

import com.campusmart.dto.response.UserResponse;
import com.campusmart.entity.Report;
import com.campusmart.entity.User;
import com.campusmart.enums.ListingStatus;
import com.campusmart.enums.ReportStatus;
import com.campusmart.exception.ResourceNotFoundException;
import com.campusmart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final ReportRepository reportRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .phone(user.getPhone())
                        .whatsapp(user.getWhatsapp())
                        .instagram(user.getInstagram())
                        .role(user.getRole().name())
                        .collegeName(user.getCollegeName())
                        .avatarUrl(user.getAvatarUrl())
                        .createdAt(user.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteUser(UUID userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found");
        }
        userRepository.deleteById(userId);
    }

    @Transactional
    public void deleteListing(UUID listingId) {
        if (!listingRepository.existsById(listingId)) {
            throw new ResourceNotFoundException("Listing not found");
        }
        listingRepository.deleteById(listingId);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public Report updateReportStatus(UUID reportId, String status) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found"));
        report.setStatus(ReportStatus.valueOf(status));
        return reportRepository.save(report);
    }

    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalListings", listingRepository.count());
        stats.put("activeListings", listingRepository.countByStatus(ListingStatus.ACTIVE));
        stats.put("pendingReports", reportRepository.countByStatus(ReportStatus.PENDING));
        return stats;
    }
}
