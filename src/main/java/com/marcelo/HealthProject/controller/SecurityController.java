package com.marcelo.HealthProject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SecurityController {
	
	@GetMapping("/login")
	public String showLogin() {
		return "login";
	}
	
	@GetMapping("/accessDenied")
	public String showAccessDenied() {
		return "access-denied";
	}
}
