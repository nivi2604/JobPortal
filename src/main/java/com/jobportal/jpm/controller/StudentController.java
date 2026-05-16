package com.jobportal.jpm.controller;

import com.jobportal.jpm.config.CustomUserDetails;
import com.jobportal.jpm.model.Application;
import com.jobportal.jpm.model.User;
import com.jobportal.jpm.service.ApplicationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/student")
public class StudentController {

    private final ApplicationService applicationService;

    public StudentController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User student = ((CustomUserDetails) auth.getPrincipal()).getUser();
        List<Application> applications = applicationService.getApplicationsByUser(student);
        model.addAttribute("applications", applications);
        return "dashboards/student";
    }
}
