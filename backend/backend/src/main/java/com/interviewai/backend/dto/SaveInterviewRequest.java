package com.interviewai.backend.dto;

import lombok.Data;

@Data
public class SaveInterviewRequest {

    private String role;
    private String question;
    private String answer;
    private String feedback;
}