package com.marcelo.HealthProject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
	
	@GetMapping("/showLoginPage")
	public String showLoginPage() {
		return "login";
	}
	
	@GetMapping("/forbidden")
	public String showAccessDenied() {
		return "forbidden";
	}
}
