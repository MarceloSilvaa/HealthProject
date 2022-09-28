package com.marcelo.HealthProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marcelo.HealthProject.dao.UserDAO;
import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.exception.UserNotFoundException;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDAO userDAO;
	
	@Transactional
	@Override
	public List<User> findAll() {
		return userDAO.findAll();
	}
	
	@Transactional
	@Override
	public User findById(int id) {
		Optional<User> result = Optional.ofNullable(userDAO.findById(id));
		
		User user = null;
		
		if(result.isPresent()) {
			user = result.get();
		}
		else {
			throw new UserNotFoundException("Could not find user with id " + id);
		}
		
		return user;
	}

	@Transactional
	@Override
	public void save(User user) {
		userDAO.save(user);
	}

	@Transactional
	@Override
	public void deleteById(int id) {
		userDAO.deleteById(id);
	}

}
