package com.portal.jobs.controller;


import com.portal.jobs.entities.Job;
import com.portal.jobs.service.JobService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping
    public ResponseEntity<String> createJob(@RequestBody Job job, @RequestParam String email) {
        return jobService.createJob(job, email);
    }

    @GetMapping("/my-jobs")
    public ResponseEntity<List<Job>> getJobsByEmail(@RequestParam String email) {
        return ResponseEntity.ok(jobService.getJobsByEmail(email));
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable String id) {
        return jobService.getJobById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable String id, @RequestBody Job updatedJob, @RequestParam String email) {
        return jobService.updateJob(id, updatedJob, email);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable String id, @RequestParam String email) {
        return jobService.deleteJob(id, email);
    }
}
