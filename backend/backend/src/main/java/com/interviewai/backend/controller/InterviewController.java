package com.interviewai.backend.controller;

import com.interviewai.backend.dto.InterviewRequest;
import com.interviewai.backend.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.interviewai.backend.dto.EvaluationRequest;
import com.interviewai.backend.dto.SaveInterviewRequest;
import com.interviewai.backend.service.InterviewService;
import com.interviewai.backend.model.Interview;

import java.util.List;
import com.interviewai.backend.dto.AnalyticsResponse;
import com.interviewai.backend.dto.ChatRequest;

import com.interviewai.backend.dto.CodeExecutionRequest;
import com.interviewai.backend.dto.CodeReviewRequest;


@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class InterviewController {

    private final AiService aiService;
    private final InterviewService interviewService;


    @PostMapping("/generate")
    public String generateQuestions(
            @RequestBody InterviewRequest request
    ) {

        return aiService.generateQuestions(request);
    }
    @PostMapping("/evaluate")
    public String evaluateAnswer(
            @RequestBody EvaluationRequest request
    ) {

        return aiService.evaluateAnswer(request);
    }
    @PostMapping("/save")
    public String saveInterview(
            @RequestBody SaveInterviewRequest request
    ) {

        return interviewService.saveInterview(request);
    }
    @GetMapping("/history")
    public List<Interview> getHistory() {

        return interviewService.getAllInterviews();
    }
    @GetMapping("/analytics")
    public AnalyticsResponse getAnalytics() {

        return interviewService.getAnalytics();
    }
    @PostMapping("/chat")
    public String chat(
            @RequestBody ChatRequest request
    ) {

        return aiService.chat(request);
    }
    @PostMapping("/execute")
    public String executeCode(
            @RequestBody
            CodeExecutionRequest request
    ) {

        return aiService.executeCode(request);
    }
    @PostMapping("/review-code")
    public String reviewCode(
            @RequestBody
            CodeReviewRequest request
    ) {

        return aiService.reviewCode(request);
    }

}