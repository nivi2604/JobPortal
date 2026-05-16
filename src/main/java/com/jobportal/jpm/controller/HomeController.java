package com.jobportal.jpm.controller;

import com.jobportal.jpm.config.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails) {
            String role = ((CustomUserDetails) auth.getPrincipal()).getUser().getRole().name();
            if (role.equals("ADMIN")) return "redirect:/admin/dashboard";
            if (role.equals("EMPLOYER")) return "redirect:/employer/dashboard";
            if (role.equals("STUDENT")) return "redirect:/student/dashboard";
        }
        return "redirect:/";
    }
}
