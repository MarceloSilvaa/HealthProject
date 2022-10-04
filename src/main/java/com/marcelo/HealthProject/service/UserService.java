package com.marcelo.HealthProject.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.user.Customer;

public interface UserService {
	
	public List<User> findAll();
	
	public User findById(int id);
	
    public User findByUsername(String username);
	
	public User findByUsernameCustomVerify(String username);
    
    public void save(User user);
    
	public void save(Customer user);
	
	public void deleteById(int id);
	
	public UserDetails loadUserByUsername(String username);

}
