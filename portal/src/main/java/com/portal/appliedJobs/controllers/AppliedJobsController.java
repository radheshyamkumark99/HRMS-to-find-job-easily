package com.portal.appliedJobs.controllers;

import com.portal.appliedJobs.models.AppliedJobs;
import com.portal.appliedJobs.service.impl.AppliedJobsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applied-jobs")
@RequiredArgsConstructor
public class AppliedJobsController {

    private final AppliedJobsServiceImpl appliedJobsService;

    // Endpoint for applying for a job
    @PostMapping("/apply")
    public ResponseEntity<String> applyForJob(@RequestParam String applicantEmail,
                                              @RequestParam String resumeUrl,
                                              @RequestParam String jobId) {
        return appliedJobsService.applyForJob(applicantEmail, resumeUrl, jobId);
    }

    // Endpoint for updating application status (e.g., ACCEPTED, REJECTED)
    @PutMapping("/update-status")
    public ResponseEntity<String> updateApplicationStatus(@RequestParam String applicantEmail,
                                                          @RequestParam String jobId,
                                                          @RequestParam String status) {
        return appliedJobsService.updateApplicationStatus(applicantEmail, jobId, status);
    }

    // Endpoint for HR to get all accepted applicants for a given jobId
    @GetMapping("/hr/job/{jobId}/accepted")
    public ResponseEntity<List<AppliedJobs>> getAcceptedApplicantsByJobId(@PathVariable String jobId) {
        List<AppliedJobs> acceptedApplicants = appliedJobsService.getAcceptedApplicantsByJobId(jobId);
        return ResponseEntity.ok(acceptedApplicants);
    }

    // Endpoint for getting applied jobs by applicant email
    @GetMapping("/user")
    public ResponseEntity<List<AppliedJobs>> getAppliedJobsByApplicantEmail(@RequestParam String email) {
        List<AppliedJobs> appliedJobs = appliedJobsService.getAppliedJobsByApplicantEmail(email);
        return ResponseEntity.ok(appliedJobs);
    }
    @GetMapping("/applicants/{hrEmail}")
    public ResponseEntity<List<AppliedJobs>> getApplicantsByHrEmail(@PathVariable String hrEmail) {
        return appliedJobsService.getApplicantsForHr(hrEmail);
    }
    @PostMapping("/user")
    public ResponseEntity<String> sendRoomId(@RequestParam String hrEmail, @RequestParam String jobId, @RequestParam String applicantEmail, @RequestParam String roomId){
        return appliedJobsService.sendRoomId(hrEmail, jobId, applicantEmail, roomId);
    }
}
