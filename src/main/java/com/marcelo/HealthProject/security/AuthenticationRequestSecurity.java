package com.marcelo.HealthProject.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.marcelo.HealthProject.exception.UserForbiddenException;

public class AuthenticationRequestSecurity {
	
	public String getAuthenticationUsername() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		String username;
		
		if (principal instanceof UserDetails) {
			username = ((UserDetails)principal).getUsername();
		} else {
			username = principal.toString();
		}
		
		return username;
	}
	
	public void verifyUsername(String username) {
		if(!username.equals(getAuthenticationUsername())) {
			throw new UserForbiddenException("User is not allowed to make this request");
		}
	}
	
}
