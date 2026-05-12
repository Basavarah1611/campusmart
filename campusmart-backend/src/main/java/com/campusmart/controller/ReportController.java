package com.campusmart.controller;

import com.campusmart.dto.request.ReportRequest;
import com.campusmart.dto.response.ApiResponse;
import com.campusmart.service.ReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<ApiResponse> createReport(@Valid @RequestBody ReportRequest request,
                                                     Authentication authentication) {
        return ResponseEntity.ok(reportService.createReport(request, authentication.getName()));
    }
}
