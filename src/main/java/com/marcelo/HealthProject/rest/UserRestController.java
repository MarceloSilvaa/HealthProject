package com.marcelo.HealthProject.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.exception.UserNotFoundException;
import com.marcelo.HealthProject.service.UserService;

@RestController
@RequestMapping("/users")
public class UserRestController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("")
	public List<User> findAll() {
		return userService.findAll();
	}
	
	@GetMapping("/{userId}")
	public User findById(@PathVariable int userId) {
		User user = userService.findById(userId);

		return user;
	}
	
	@PostMapping("")
	public User add(@RequestBody User user) {
		user.setId(0);
		
		userService.save(user);
		
		return user;
	}
	
	@PutMapping("")
	public User update(@RequestBody User user) {
		userService.save(user);
		
		return user;
	}
	
	@DeleteMapping("/{userId}")
	public String deleteById(@PathVariable int userId) {
		User user = userService.findById(userId);
		
		userService.deleteById(userId);
		
		return "Deleted user with id " + userId;
	}
}
