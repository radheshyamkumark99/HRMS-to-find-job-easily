package com.portal.appliedJobs.service;

import java.io.IOException;

public interface ResumeService {
    String extractResumeText(String resumeUrl) throws IOException;
    double calculateMatchScore(String resumeText, String jobDescription);
}
