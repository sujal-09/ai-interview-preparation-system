package com.interviewai.backend.service;

import com.interviewai.backend.dto.SaveInterviewRequest;
import com.interviewai.backend.model.Interview;
import com.interviewai.backend.repository.InterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import com.interviewai.backend.dto.AnalyticsResponse;
import com.interviewai.backend.dto.ChartData;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;

    public String saveInterview(
            SaveInterviewRequest request
    ) {

        Interview interview = Interview.builder()
                .role(request.getRole())
                .question(request.getQuestion())
                .answer(request.getAnswer())
                .feedback(request.getFeedback())
                .createdAt(LocalDateTime.now())
                .build();

        interviewRepository.save(interview);

        return "Interview saved successfully";
    }

    public List<Interview> getAllInterviews() {

        return interviewRepository.findAll();
    }
    public AnalyticsResponse getAnalytics() {

        var interviews =
                interviewRepository.findAll();

        int totalInterviews =
                interviews.size();

        int totalQuestions =
                interviews.size();

        double averageScore = 0;

        List<ChartData> chartData =
                new ArrayList<>();

        for (Interview interview : interviews) {


            String feedback =
                    interview.getFeedback();

            if (feedback != null &&
                    feedback.contains("/10")) {

                try {

                    String scoreText =
                            feedback.replaceAll(
                                    "[^0-9.]",
                                    " "
                            ).trim();

                    String[] numbers =
                            scoreText.split("\\s+");

                    if (numbers.length > 0) {

                        averageScore +=
                                Double.parseDouble(
                                        numbers[0]
                                );
                    }

                } catch (Exception ignored) {
                }
            }
            chartData.add(
                    new ChartData(
                            "Interview " + interview.getId(),
                            averageScore
                    )
            );
        }

        if (totalInterviews > 0) {

            averageScore =
                    averageScore / totalInterviews;
        }

        return AnalyticsResponse.builder()
                .totalInterviews(totalInterviews)
                .averageScore(averageScore)
                .totalQuestionsAnswered(totalQuestions)
                .chartData(chartData)
                .build();
    }
}