package com.marcelo.HealthProject.controller;

import java.util.logging.Logger;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.service.UserService;
import com.marcelo.HealthProject.user.Customer;

@Controller
@RequestMapping("/register")
public class RegistrationController {
	
    private Logger logger = Logger.getLogger(getClass().getName());
    
    @Autowired
    private UserService userService;
	
	@InitBinder
	public void initBinder(WebDataBinder dataBinder) {
		
		StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
		
		dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
	}
	
	@GetMapping("/showRegistrationForm")
	public String showMyLoginPage(Model model) {
		
		model.addAttribute("customer", new Customer());
		
		return "registration-form";
	}
	
	@PostMapping("/processRegistrationForm")
	public String processRegistrationForm(
				@Valid @ModelAttribute("customer") Customer customer, 
				BindingResult theBindingResult, 
				Model model) {
		
		String username = customer.getUsername();
		logger.info("Processing registration form for: " + username);
		
		// form validation
		if (theBindingResult.hasErrors()){
			return "registration-form";
	    }

		// check the database if user already exists
        User user = userService.findByUsername(username);
        if (user != null){
        	model.addAttribute("customer", new Customer());
        	model.addAttribute("registrationError", "User name already exists.");

			logger.warning("User name already exists.");
        	return "registration-form";
        }
        
        // create user account        						
        userService.save(customer);
        
        logger.info("Successfully created user: " + username);
        
        return "registration-confirmation";		
	}
}
