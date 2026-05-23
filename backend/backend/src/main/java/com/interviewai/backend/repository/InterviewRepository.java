package com.interviewai.backend.repository;

import com.interviewai.backend.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository
        extends JpaRepository<Interview, Long> {
}