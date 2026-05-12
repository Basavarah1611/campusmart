package com.campusmart.controller;

import com.campusmart.dto.response.ApiResponse;
import com.campusmart.dto.response.UserResponse;
import com.campusmart.entity.Report;
import com.campusmart.service.AdminService;
import com.campusmart.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable UUID id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully"));
    }

    @DeleteMapping("/listings/{id}")
    public ResponseEntity<ApiResponse> deleteListing(@PathVariable UUID id) {
        adminService.deleteListing(id);
        return ResponseEntity.ok(ApiResponse.success("Listing deleted successfully"));
    }

    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(adminService.getAllReports());
    }

    @PutMapping("/reports/{id}")
    public ResponseEntity<Report> updateReportStatus(@PathVariable UUID id,
                                                      @RequestParam String status) {
        return ResponseEntity.ok(adminService.updateReportStatus(id, status));
    }
}
