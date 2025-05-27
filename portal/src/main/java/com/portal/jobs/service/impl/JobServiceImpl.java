package com.portal.jobs.service.impl;

import com.portal.Role;
import com.portal.jobs.entities.Job;
import com.portal.jobs.repository.JobRepository;
import com.portal.jobs.service.JobService;
import com.portal.user.Entities.User;
import com.portal.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserService userService;

    private boolean isHR(User user) {
        return user == null || user.getRole() != Role.HR;
    }

    @Override
    public ResponseEntity<String> createJob(Job job, String email) {
        User user = userService.getUser(email).getBody();

        if (isHR(user)) {
            log.warn("Unauthorized job creation attempt by: {}", email);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only HR can create jobs");
        }
        job.setEmail(email);
        job.setCreatedAt(LocalDateTime.now());
        jobRepository.save(job);
        log.info("Job created successfully by: {}", email);
        return ResponseEntity.ok("Job Created Successfully");
    }

    @Override
    public List<Job> getJobsByEmail(String email) {
        log.info("Fetching jobs posted by: {}", email);
        List<Job> jobs = jobRepository.findByEmail(email);
        return jobs;
    }

    @Override
    public List<Job> getAllJobs() {
        log.info("Fetching all jobs");
        return jobRepository.findAll();
    }

    @Override
    public ResponseEntity<Job> getJobById(String id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    log.error("Job not found with ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @Override
    public ResponseEntity<Job> updateJob(String id, Job updatedJob, String email) {
        User user = userService.getUser(email).getBody();
        if (isHR(user)) {
            log.warn("Unauthorized job update attempt by: {}", email);
            return ResponseEntity.status(403).build();
        }

        Job existing = jobRepository.findById(id)
                .orElse(null);

        if (existing == null) {
            log.error("Job not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        }

        existing.setTitle(updatedJob.getTitle());
        existing.setDescription(updatedJob.getDescription());
        existing.setEligibility(updatedJob.getEligibility());
        existing.setDeadline(updatedJob.getDeadline());

        Job saved = jobRepository.save(existing);
        log.info("Job updated by {}", email);
        return ResponseEntity.ok(saved);
    }

    @Override
    public ResponseEntity<String> deleteJob(String id, String email) {
        User user = userService.getUser(email).getBody();
        if (isHR(user)) {
            log.warn("Unauthorized job delete attempt by: {}", email);
            return ResponseEntity.status(403).body("Only HR can delete jobs");
        }

        return jobRepository.findById(id)
                .map(existing -> {
                    if (!existing.getEmail().equals(email)) {
                        log.warn("User {} not allowed to delete job owned by {}", email, existing.getEmail());
                        return ResponseEntity.status(403).body("Unauthorized to delete this job");
                    }
                    jobRepository.deleteById(id);
                    log.info("Job deleted by {}", email);
                    return ResponseEntity.ok("Job Deleted Successfully");
                }).orElseGet(() -> {
                    log.error("Job not found with ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }
}
