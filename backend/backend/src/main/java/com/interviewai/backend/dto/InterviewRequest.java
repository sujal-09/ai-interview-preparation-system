package com.interviewai.backend.dto;

import lombok.Data;

@Data
public class InterviewRequest {

    private String role;
    private String difficulty;

    private String company;

    private String interviewType;
}