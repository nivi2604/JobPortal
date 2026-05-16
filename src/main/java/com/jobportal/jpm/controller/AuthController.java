package com.jobportal.jpm.controller;

import com.jobportal.jpm.model.Role;
import com.jobportal.jpm.model.User;
import com.jobportal.jpm.service.UserService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String registerForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@Valid @ModelAttribute("user") User user, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "register";
        }

        if (userService.emailExists(user.getEmail())) {
            model.addAttribute("error", "Email is already registered!");
            return "register";
        }

        if(user.getRole() == Role.ADMIN) {
            model.addAttribute("error", "Cannot register as ADMIN directly!");
            return "register";
        }

        userService.registerUser(user);
        return "redirect:/login?success";
    }
}
