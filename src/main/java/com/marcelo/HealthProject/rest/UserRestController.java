package com.marcelo.HealthProject.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.service.UserService;

@RestController
@RequestMapping("/users")
public class UserRestController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/all")
	public List<User> findAll() {
		return userService.findAll();
	}
}
