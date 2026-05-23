package com.interviewai.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnalyticsResponse {

    private int totalInterviews;

    private double averageScore;

    private int totalQuestionsAnswered;


    private List<ChartData> chartData;
}