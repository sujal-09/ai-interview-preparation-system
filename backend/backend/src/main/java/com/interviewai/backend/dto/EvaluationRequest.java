package com.interviewai.backend.dto;

import lombok.Data;

@Data
public class EvaluationRequest {

    private String question;
    private String answer;
}