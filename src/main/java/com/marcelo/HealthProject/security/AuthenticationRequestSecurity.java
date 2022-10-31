package com.marcelo.HealthProject.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.exception.UserForbiddenException;
import com.marcelo.HealthProject.service.UserService;

public class AuthenticationRequestSecurity {
	
	@Autowired
	private UserService userService;
	
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
	
	public Integer getAuthenticationUserId() {
		User user = userService.findByUsernameCustomVerify(getAuthenticationUsername());
		return user.getId();
	}
	
	public boolean isAuthenticatedUser(String username) {
		if(!username.equals(getAuthenticationUsername())) {
			throw new UserForbiddenException("User is not allowed to make this request");
		}
		return true;
	}
	
	public boolean isAuthenticatedUser(Integer id) {
		if(id != getAuthenticationUserId()) {
			throw new UserForbiddenException("User is not allowed to make this request");
		}
		return true;
	}
	
}
