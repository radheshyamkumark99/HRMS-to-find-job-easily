package com.portal.jobs.service;

import com.portal.jobs.entities.Job;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface JobService {
    ResponseEntity<String> createJob(Job job, String email);
    List<Job> getJobsByEmail(String email);
    List<Job> getAllJobs();
    ResponseEntity<Job> getJobById(String id);
    ResponseEntity<Job> updateJob(String id, Job job, String email);
    ResponseEntity<String> deleteJob(String id, String email);
}
