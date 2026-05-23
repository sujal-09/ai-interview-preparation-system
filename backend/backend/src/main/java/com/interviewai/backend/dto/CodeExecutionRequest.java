package com.interviewai.backend.dto;

import lombok.Data;

@Data
public class CodeExecutionRequest {

    private String language;

    private String code;
}