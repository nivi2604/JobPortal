package com.jobportal.jpm.repository;

import com.jobportal.jpm.model.Application;
import com.jobportal.jpm.model.Job;
import com.jobportal.jpm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser(User user);
    List<Application> findByJob(Job job);
    Optional<Application> findByUserAndJob(User user, Job job);
    boolean existsByUserAndJob(User user, Job job);
}
