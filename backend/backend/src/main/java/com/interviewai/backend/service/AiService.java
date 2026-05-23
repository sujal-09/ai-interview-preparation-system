package com.interviewai.backend.service;

import com.interviewai.backend.dto.InterviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.interviewai.backend.dto.EvaluationRequest;
import java.util.Map;
import com.interviewai.backend.dto.ChatRequest;
import com.interviewai.backend.dto.CodeExecutionRequest;
import java.util.List;
import com.interviewai.backend.dto.CodeReviewRequest;

@Service
@RequiredArgsConstructor
public class AiService {

    private final WebClient.Builder webClientBuilder;

    public String generateQuestions(InterviewRequest request) {

        String prompt = """
        Generate 5 interview questions with answers.
        
        Company: %s
        Role: %s
        Difficulty: %s
        Interview Type: %s
        
        Make the questions realistic and based on
        actual interview patterns.
        """
                .formatted(
                        request.getCompany(),
                        request.getRole(),
                        request.getDifficulty(),
                        request.getInterviewType()
                );

        String url = "http://localhost:11434/api/generate";

        Map<String, Object> body = Map.of(
                "model", "llama3",
                "prompt", prompt,
                "stream", false
        );

        try {

            String response = webClientBuilder.build()
                    .post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return response;

        } catch (Exception e) {

            return "Error generating questions: "
                    + e.getMessage();
        }
    }
    public String evaluateAnswer(EvaluationRequest request) {

        String prompt = """
            Evaluate this interview answer.
            
            Question:
            %s
            
            Answer:
            %s
            
            Give:
            1. Score out of 10
            2. Strengths
            3. Weaknesses
            4. Improvements
            """
                .formatted(
                        request.getQuestion(),
                        request.getAnswer()
                );

        String url = "http://localhost:11434/api/generate";

        Map<String, Object> body = Map.of(
                "model", "llama3",
                "prompt", prompt,
                "stream", false
        );

        try {

            Map response = webClientBuilder.build()
                    .post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            return response.get("response").toString();

        } catch (Exception e) {

            return "Error evaluating answer: "
                    + e.getMessage();
        }
    }
    public String chat(ChatRequest request) {

        String prompt = """
            You are an AI interview assistant.
            
            Help the user with:
            - coding
            - DSA
            - interview preparation
            - HR questions
            - resume guidance
            - technical concepts
            
            User Question:
            %s
            """
                .formatted(request.getMessage());

        String url =
                "http://localhost:11434/api/generate";

        Map<String, Object> body = Map.of(
                "model", "llama3",
                "prompt", prompt,
                "stream", false
        );

        try {

            Map response = webClientBuilder.build()
                    .post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            return response.get("response").toString();

        } catch (Exception e) {

            return "Chat failed: "
                    + e.getMessage();
        }
    }
    public String executeCode(
            CodeExecutionRequest request
    ) {

        String url =
                "https://api.jdoodle.com/v1/execute";

        String language = request.getLanguage();

        String version = "4";

        if (language.equals("python")) {

            language = "python3";
            version = "3";

        } else if (language.equals("java")) {

            language = "java";
            version = "4";

        } else if (language.equals("cpp")) {

            language = "cpp17";
            version = "0";

        } else if (language.equals("javascript")) {

            language = "nodejs";
            version = "4";
        }

        Map<String, Object> body =
                Map.of(

                        "clientId",
                        "eac1963254513cba8c455b985aaabb5",

                        "clientSecret",
                        "faec22d37e7587abf3c96eed18a973f2898ef6923011aa626188470111239dee",

                        "script",
                        request.getCode(),

                        "language",
                        language,

                        "versionIndex",
                        version
                );

        try {

            Map response =
                    webClientBuilder.build()
                            .post()
                            .uri(url)
                            .contentType(
                                    MediaType.APPLICATION_JSON
                            )
                            .bodyValue(body)
                            .retrieve()
                            .bodyToMono(Map.class)
                            .block();

            return response.get("output")
                    .toString();

        } catch (Exception e) {

            return "Execution Failed: "
                    + e.getMessage();
        }
    }
    public String reviewCode(
            CodeReviewRequest request
    ) {

        String prompt = """
            Review this code like a technical interviewer.
            
            Language:
            %s
            
            Code:
            %s
            
            Give:
            1. Code Quality Review
            2. Possible Bugs
            3. Optimization Suggestions
            4. Time Complexity
            5. Interview Feedback
            """
                .formatted(
                        request.getLanguage(),
                        request.getCode()
                );

        String url =
                "http://localhost:11434/api/generate";

        Map<String, Object> body = Map.of(
                "model", "llama3",
                "prompt", prompt,
                "stream", false
        );

        try {

            Map response =
                    webClientBuilder.build()
                            .post()
                            .uri(url)
                            .contentType(
                                    MediaType.APPLICATION_JSON
                            )
                            .bodyValue(body)
                            .retrieve()
                            .bodyToMono(Map.class)
                            .block();

            return response.get("response")
                    .toString();

        } catch (Exception e) {

            return "Code review failed: "
                    + e.getMessage();
        }
    }
}