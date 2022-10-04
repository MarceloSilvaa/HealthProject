package com.marcelo.HealthProject.dao;

import java.util.List;

import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.user.Customer;

public interface UserDAO {
	
	public List<User> findAll();
	
	public User findById(int id);
	
    public User findByUsername(String username);
	
    public void save(User user);
	
	public void deleteById(int id);
}
