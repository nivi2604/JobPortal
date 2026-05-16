package com.jobportal.jpm.controller;

import com.jobportal.jpm.config.CustomUserDetails;
import com.jobportal.jpm.model.Application;
import com.jobportal.jpm.model.Job;
import com.jobportal.jpm.model.User;
import com.jobportal.jpm.service.ApplicationService;
import com.jobportal.jpm.service.JobService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;
    private final ApplicationService applicationService;

    public JobController(JobService jobService, ApplicationService applicationService) {
        this.jobService = jobService;
        this.applicationService = applicationService;
    }

    @GetMapping
    public String listJobs(@RequestParam(value = "keyword", required = false) String keyword, Model model) {
        List<Job> jobs = jobService.searchJobs(keyword);
        model.addAttribute("jobs", jobs);
        return "jobs/list";
    }

    @GetMapping("/detail/{id}")
    public String jobDetail(@PathVariable Long id, Model model) {
        Optional<Job> job = jobService.findJobById(id);
        if (job.isPresent()) {
            model.addAttribute("job", job.get());
            
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getPrincipal() instanceof CustomUserDetails) {
                User user = ((CustomUserDetails) auth.getPrincipal()).getUser();
                if(user.getRole().name().equals("STUDENT")) {
                    boolean hasApplied = applicationService.hasApplied(user, job.get());
                    model.addAttribute("hasApplied", hasApplied);
                }
            }
            return "jobs/detail";
        }
        return "redirect:/jobs";
    }

    @PostMapping("/apply/{id}")
    public String applyJob(@PathVariable Long id, Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails)) {
            return "redirect:/login";
        }

        User user = ((CustomUserDetails) auth.getPrincipal()).getUser();
        if (!user.getRole().name().equals("STUDENT")) {
            return "redirect:/jobs/detail/" + id;
        }

        Optional<Job> jobOptional = jobService.findJobById(id);
        if (jobOptional.isPresent()) {
            try {
                applicationService.applyForJob(user, jobOptional.get());
                model.addAttribute("success", "Successfully applied!");
            } catch (Exception e) {
                model.addAttribute("error", e.getMessage());
            }
        }
        return "redirect:/jobs/detail/" + id + "?applied";
    }
}
