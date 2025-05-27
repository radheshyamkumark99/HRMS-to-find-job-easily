package com.portal.appliedJobs.service.impl;

import com.portal.Role;
import com.portal.appliedJobs.Status;
import com.portal.appliedJobs.models.AppliedJobs;
import com.portal.appliedJobs.repository.AppliedJobRepository;
import com.portal.appliedJobs.service.EmailService;
import com.portal.appliedJobs.service.ResumeService;
import com.portal.jobs.entities.Job;
import com.portal.jobs.service.JobService;

import com.portal.user.Entities.User;
import com.portal.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppliedJobsServiceImpl {

    private final AppliedJobRepository appliedJobsRepository;
    private final ResumeService resumeService;
    private final EmailService emailService;
    private final JobService jobService;
    private final UserService userService;

    public AppliedJobsServiceImpl(AppliedJobRepository appliedJobsRepository, ResumeService resumeService, EmailService emailService, JobService jobService, UserService userService) {
        this.appliedJobsRepository = appliedJobsRepository;
        this.resumeService = resumeService;
        this.emailService = emailService;
        this.jobService = jobService;
        this.userService = userService;
    }

    public ResponseEntity<String> applyForJob(String applicantEmail, String resumeUrl, String jobId) {
        try {
            Job job = jobService.getJobById(jobId).getBody();
            if (job == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
            User user = userService.getUser(applicantEmail).getBody();
            if(user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with this email");

            if(user.getRole() == Role.HR) {
                if (job.getEmail().equals(user.getEmail())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("HRs cannot apply for the jobs they have posted");
                }
            }
            // Step 1: Check job expiry
            if (LocalDateTime.now().isAfter(job.getDeadline())) {
                jobService.deleteJob(jobId, job.getEmail()); // Optional cleanup
                return ResponseEntity.badRequest().body("Job has already expired.");
            }

            // Step 2: Check existing application
            Optional<AppliedJobs> existingApplication = appliedJobsRepository.findByApplicantEmailAndJobId(applicantEmail, jobId);
            if (existingApplication.isPresent()) {
                AppliedJobs appliedJobs = existingApplication.get();
                if (appliedJobs.getStatus() == Status.REJECTED) {
                    LocalDateTime banExpiry = appliedJobs.getBanExpiryDate();
                    if (banExpiry != null && LocalDateTime.now().isBefore(banExpiry)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body("Application rejected previously. You can reapply after " + banExpiry.toLocalDate());
                    }
                }
                if (appliedJobs.getStatus() == Status.PENDING) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Already applied. Status is pending.");
                }

            }

            // Step 3: Process resume and score
            String resumeText = resumeService.extractResumeText(resumeUrl);
            double score = resumeService.calculateMatchScore(resumeText, job.getDescription());

            // Step 4: Prepare and save new application
            AppliedJobs applied = new AppliedJobs();
            applied.setApplicantEmail(applicantEmail);
            applied.setResumeUrl(resumeUrl);
            applied.setJobId(jobId);
            applied.setAppliedOn(LocalDateTime.now());
            String applicantName = Objects.requireNonNull(userService.getUser(applicantEmail).getBody()).getName();
            if(applicantName == null){
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("No User Exist");
            }
            if (score >= 0.40) {
                emailService.sendHrEmail(applicantEmail, job, resumeUrl,applicantName);
                applied.setStatus(Status.REVIEWING);
            } else {
                emailService.sendRejectionEmail(applicantEmail, job, resumeUrl,applicantName);
                applied.setStatus(Status.REJECTED);
                applied.setBanExpiryDate(LocalDateTime.now().plusMonths(6));
                appliedJobsRepository.save(applied);
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Your are not eligible to apply for this Job");
            }

            appliedJobsRepository.save(applied);
            return ResponseEntity.ok("Application processed successfully.");
        } catch (Exception e) {
            AppliedJobs failed = new AppliedJobs();
            failed.setApplicantEmail(applicantEmail);
            failed.setResumeUrl(resumeUrl);
            failed.setJobId(jobId);
            failed.setAppliedOn(LocalDateTime.now());
            failed.setStatus(Status.PENDING);
            appliedJobsRepository.save(failed);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while applying. Status set to Pending.");
        }
    }

    public ResponseEntity<String> updateApplicationStatus(String applicantEmail, String jobId, String newStatus) {
        // Validate and convert status
        Status status;
        try {
            status = Status.valueOf(newStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value: " + newStatus);
        }

        // Fetch application
        AppliedJobs existing = appliedJobsRepository.findByApplicantEmailAndJobId(applicantEmail, jobId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Fetch job and user details
        Job job = jobService.getJobById(jobId).getBody();
        if (job == null) throw new RuntimeException("Job not found");

        User user = userService.getUser(applicantEmail).getBody();
        if (user == null) throw new RuntimeException("User not found");

        // Handle rejection
        if (status == Status.REJECTED) {
            emailService.sendRejectionEmail(applicantEmail, job, existing.getResumeUrl(), user.getName());
            existing.setBanExpiryDate(LocalDateTime.now().plusMonths(6));
        } else {
            // Fetch recruiter
            User recruiter = userService.getUser(job.getEmail()).getBody();
            if (recruiter == null) {
                ResponseEntity.status(HttpStatus.FORBIDDEN).body("No hr found with this job");
                throw new RuntimeException("Recruiter not found");
            };
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy");
            String startDate = LocalDateTime.now().plusMonths(3).format(formatter);       // e.g., "07 August 2025"
            String responseDate = LocalDateTime.now().plusDays(15).format(formatter);
            // Send offer letter
            emailService.sendOfferLetterEmail(
                    applicantEmail,
                    user.getName(),
                    job.getTitle(),
                    startDate,
                    "35LPA",
                    "Faster growth",
                    responseDate,
                    recruiter.getName()
            );
        }

        // Update status and save
        existing.setStatus(status);
        appliedJobsRepository.save(existing);

        return ResponseEntity.ok("Application status updated to " + status);
    }


    public ResponseEntity<List<AppliedJobs>> getApplicantsForHr(String hrEmail) {
        List<Job> hrJobs = jobService.getJobsByEmail(hrEmail);
        if (hrJobs == null || hrJobs.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        // Use streams to filter out applicants with status 'REVIEWING'
        List<AppliedJobs> applicants = hrJobs.stream()
                .flatMap(job -> appliedJobsRepository.findByJobId(job.getId()).stream())
                .filter(applicant -> applicant.getStatus() == Status.REVIEWING)
                .collect(Collectors.toList());

        return ResponseEntity.ok(applicants);
    }


    public List<AppliedJobs> getAcceptedApplicantsByJobId(String jobId) {
        return appliedJobsRepository.findByJobIdAndStatus(jobId, Status.REVIEWING);
    }
    public List<AppliedJobs> getAppliedJobsByApplicantEmail(String email) {
        return appliedJobsRepository.findByApplicantEmail(email);
    }
    public ResponseEntity<String> sendRoomId(String hrEmail, String jobId, String applicantEmail, String roomId){
        Job job = jobService.getJobById(jobId).getBody();
        if (job == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
        String applicantName = Objects.requireNonNull(userService.getUser(applicantEmail).getBody()).getName();
        if(applicantName == null){
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("No User Exist");
        }
        return emailService.sendRoomEmail(hrEmail, job, applicantEmail,applicantName, roomId);
    }
}
