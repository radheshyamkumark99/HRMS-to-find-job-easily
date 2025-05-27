package com.portal.jobs.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Job {
    @Id
    private String id;
    private String title;
    private String description;
    private String eligibility;
    private String category;
    private LocalDateTime deadline;
    private LocalDateTime createdAt;
    private String email;
}
