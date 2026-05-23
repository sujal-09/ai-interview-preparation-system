package com.interviewai.backend.service;

import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final WebClient.Builder webClientBuilder;

    public String analyzeResume(MultipartFile file) {

        try {

            PDDocument document =
                    Loader.loadPDF(file.getBytes());

            PDFTextStripper stripper =
                    new PDFTextStripper();

            String resumeText =
                    stripper.getText(document);

            document.close();

            String prompt = """
                    Analyze this resume.
                    
                    Give:
                    1. ATS Score out of 100
                    2. Technical Skills
                    3. Missing Skills
                    4. Resume Improvements
                    5. Interview Preparation Suggestions
                    
                    Resume:
                    %s
                    """
                    .formatted(resumeText);

            String url =
                    "http://localhost:11434/api/generate";

            Map<String, Object> body = Map.of(
                    "model", "llama3",
                    "prompt", prompt,
                    "stream", false
            );

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

            e.printStackTrace();

            return "Resume analysis failed: "
                    + e.getMessage();
        }
    }
}