package com.marcelo.HealthProject.controller;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.marcelo.HealthProject.entity.Supplement;
import com.marcelo.HealthProject.security.AuthenticationRequestSecurity;
import com.marcelo.HealthProject.service.SupplementService;

@Controller
@RequestMapping("/supplements")
public class SupplementController {
	
	@Autowired
	private SupplementService supplementService;
	
	@Autowired
	private AuthenticationRequestSecurity authenticationRequestSecurity;
	
	// Need to verify if userId that is being passed for methods matches the user authentication
	// Probably should do this inside supplement service since it has a bean for UserDAO 
	
	@GetMapping("/{userId}")
	public String findAllByUserId(@PathVariable int userId, Model model) {
		List<Supplement> list = supplementService.findAllByUserId(userId);
		
		model.addAttribute("supplementList", list);
		
		return "overview";
	}
	
	@GetMapping("")
	public String findAllByUsername(Model model) {
		String username = authenticationRequestSecurity.getAuthenticationUsername();
		
		List<Supplement> list = supplementService.findAllByUsername(username);
		
		model.addAttribute("supplementList", list);
		
		return "overview";
	}
	
	@GetMapping("/showAddForm")
	public String showAddForm(Model model) {
		Supplement supplement = new Supplement();
		
		model.addAttribute("supplement", supplement);
		
		return "supplement-form";
	}
	
	@GetMapping("/showUpdateForm")
	public String showUpdateForm(@RequestParam("supplementId") int supplementId, Model model) {
		Supplement supplement = supplementService.findById(supplementId);
		
		model.addAttribute("supplement", supplement);
		
		return "supplement-form";
	}
	
	@PostMapping("/save")
	public String save(@ModelAttribute("supplement") Supplement supplement) {
		Integer userId = authenticationRequestSecurity.getAuthenticationUserId();
		
		supplementService.save(userId, supplement);
		
		return "redirect:/supplements";
	}
	
	@GetMapping("/delete/{supplementId}")
	public String deleteById(@PathVariable int supplementId) {		
		// Need to verify if the supplement that is being deleted belongs to user
		
		supplementService.deleteById(supplementId);
		
		return "redirect:/supplements";
	}
	
	@GetMapping("/reset")
	public String deleteAll() {
		String username = authenticationRequestSecurity.getAuthenticationUsername();
		
		List<Supplement> list = supplementService.findAllByUsername(username);
		
		for(Supplement supplement: list) {
			supplementService.deleteById(supplement.getId());
		}
		
		return "redirect:/supplements";
	}
}