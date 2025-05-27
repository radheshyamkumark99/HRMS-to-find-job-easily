package com.portal.appliedJobs.repository;

import com.portal.appliedJobs.Status;
import com.portal.appliedJobs.models.AppliedJobs;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppliedJobRepository extends MongoRepository<AppliedJobs,String> {
    List<AppliedJobs> findByApplicantEmail(String email);
    List<AppliedJobs> findByJobId(String jobId);
    Optional<AppliedJobs> findByApplicantEmailAndJobId(String email, String jobId);
    List<AppliedJobs> findByJobIdAndStatus(String jobId, Status status);


}
