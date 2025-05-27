package com.portal.jobs.repository;

import com.portal.jobs.entities.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends MongoRepository<Job,String> {
    List<Job> findByEmail(String email);
}
