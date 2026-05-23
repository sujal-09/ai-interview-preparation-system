package com.interviewai.backend.controller;

import com.interviewai.backend.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/analyze")
    public String analyzeResume(
            @RequestParam("file") MultipartFile file
    ) {

        return resumeService.analyzeResume(file);
    }
}