package com.portal.appliedJobs.service.impl;

import com.portal.appliedJobs.service.EmailService;
import com.portal.jobs.entities.Job;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {
    
    private final String  BREVO_API="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";

    private final RestTemplate restTemplate;



    public EmailServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    @Override
    public ResponseEntity<String> sendHrEmail(String applicantEmail, Job job, String resumeUrl, String applicantName) {

        sendEmail(
                job.getEmail(),
                1,
                applicantEmail,
                job.getTitle(),
                resumeUrl,
                job.getDescription(),
                job.getCategory(),
                applicantName,
                ""
        );
        return ResponseEntity.ok("Mail sent Successfully");
    }



    @Override
    public ResponseEntity<String> sendRejectionEmail(String applicantEmail, Job job, String resumeUrl, String applicantName) {

        sendEmail(
                applicantEmail,
                2,
                applicantEmail,
                job.getTitle(), 
                resumeUrl,
                job.getDescription(),
                job.getCategory(),
                applicantName,
                ""
        );
        return ResponseEntity.ok("Mail sent successfully");
    }

    @Override
    public ResponseEntity<String> sendRoomEmail(String hrEmail, Job job, String applicantEmail,String applicantName, String roomId) {
        sendEmail(
                applicantEmail,
                3,
                hrEmail,
                job.getTitle(),
                "",
                job.getDescription(),
                job.getCategory(),
                applicantName,
                roomId
        );
        return ResponseEntity.ok("Mail sent successfully");
    }
    public void sendOfferLetterEmail(String toEmail, String applicantName, String jobTitle, String startDate,
                                      String salary, String benefits, String responseDate, String hrName) {

        String url = "https://api.brevo.com/v3/smtp/email";
        HttpHeaders headers = new HttpHeaders();
        headers.set("api-key", BREVO_API);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Prepare the email body
        Map<String, Object> body = new HashMap<>();
        body.put("sender", Map.of("name", "SmartHire", "email", "maheshwari.keshav2090@gmail.com"));
        body.put("to", List.of(Map.of("email", toEmail)));
        body.put("templateId", 4); // Assuming you have a template with ID 3 for the offer letter

        // Prepare the parameters for the offer letter template
        Map<String, Object> params = new HashMap<>();
        params.put("applicantName", applicantName);
        params.put("jobTitle", jobTitle);
        params.put("startDate", startDate);
        params.put("salary", salary);
        params.put("benefits", benefits);
        params.put("responseDate", responseDate);
        params.put("hrName", hrName);

        // Attach the parameters to the email body
        body.put("params", params);

        // Create HTTP request
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        try {
            // Make the request to Brevo API
            ResponseEntity<String> exchange = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        } catch (Exception e) {
            System.out.println("BREVO ERROR: " + e.getMessage());
            e.printStackTrace(); // Print full stack trace
        }
    }


    private void sendEmail(String toEmail,int templateId,
                           String applicantEmail, String jobTitle, String resumeUrl,
                           String jobDescription, String category, String applicantName,
                           String roomId) {

        String url = "https://api.brevo.com/v3/smtp/email";
        HttpHeaders headers = new HttpHeaders();
        headers.set("api-key", BREVO_API);
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, Object> body = new HashMap<>();
        body.put("sender", Map.of("name", "SmartHire", "email", "maheshwari.keshav2090@gmail.com"));
        body.put("to", List.of(Map.of("email", toEmail)));
        body.put("templateId", templateId);

        Map<String, Object> params = new HashMap<>();
        params.put("jobTitle", jobTitle);
        params.put("applicantEmail", applicantEmail);
        params.put("resumeUrl", resumeUrl);
        params.put("jobDescription", jobDescription);
        params.put("role", category);
        params.put("applicantName", applicantName);
        params.put("roomId", roomId);
        body.put("params", params);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<String> exchange = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
        } catch (Exception e) {
            e.printStackTrace(); // Print full stack trace
        }

    }
}
