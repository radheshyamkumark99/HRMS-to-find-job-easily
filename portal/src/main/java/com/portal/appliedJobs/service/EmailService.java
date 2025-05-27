package com.portal.appliedJobs.service;

import com.portal.jobs.entities.Job;
import org.springframework.http.ResponseEntity;

public interface EmailService {

    ResponseEntity<String> sendHrEmail(String applicantEmail, Job job, String resumeUrl, String applcantName);
    ResponseEntity<String> sendRejectionEmail(String applicantEmail, Job job, String resumeUrl, String applicantName);
    ResponseEntity<String> sendRoomEmail(String hrEmail, Job job, String applicantEmail,String applicantName, String roomId);
    void sendOfferLetterEmail(String toEmail, String applicantName, String jobTitle, String startDate,
                              String salary, String benefits, String responseDate, String hrName);
}
