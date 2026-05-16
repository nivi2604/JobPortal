package com.jobportal.jpm.service;

import com.jobportal.jpm.model.Application;
import com.jobportal.jpm.model.ApplicationStatus;
import com.jobportal.jpm.model.Job;
import com.jobportal.jpm.model.User;
import com.jobportal.jpm.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public Application applyForJob(User user, Job job) {
        if (hasApplied(user, job)) {
            throw new RuntimeException("You have already applied for this job!");
        }
        Application application = new Application();
        application.setUser(user);
        application.setJob(job);
        application.setStatus(ApplicationStatus.APPLIED);
        return applicationRepository.save(application);
    }

    public boolean hasApplied(User user, Job job) {
        return applicationRepository.existsByUserAndJob(user, job);
    }

    public List<Application> getApplicationsByUser(User user) {
        return applicationRepository.findByUser(user);
    }

    public List<Application> getApplicationsByJob(Job job) {
        return applicationRepository.findByJob(job);
    }
    
    public List<Application> findAll() {
        return applicationRepository.findAll();
    }

    public void updateStatus(Long applicationId, ApplicationStatus status) {
        Optional<Application> optionalApp = applicationRepository.findById(applicationId);
        if (optionalApp.isPresent()) {
            Application application = optionalApp.get();
            application.setStatus(status);
            applicationRepository.save(application);
        }
    }
}
