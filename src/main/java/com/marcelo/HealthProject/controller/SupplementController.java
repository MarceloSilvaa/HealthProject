package com.marcelo.HealthProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marcelo.HealthProject.entity.Supplement;
import com.marcelo.HealthProject.service.SupplementService;

@RestController
@RequestMapping("/supplements")
public class SupplementController {
	
	@Autowired
	private SupplementService supplementService;
	
	@GetMapping("/{userId}")
	public List<Supplement> findAllByUserId(@PathVariable int userId) {
		return supplementService.findAllByUserId(userId);
	}
	
	@GetMapping("")
	public List<Supplement> findAllByUsername(@RequestParam("username") String username) {
		return supplementService.findAllByUsername(username);
	}
}
