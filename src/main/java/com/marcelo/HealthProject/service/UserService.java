package com.marcelo.HealthProject.service;

import java.util.List;

import com.marcelo.HealthProject.entity.User;

public interface UserService {
	
	public List<User> findAll();
	
	public User findById(int id);
	
	public void save(User user);
	
	public void deleteById(int id);
}
