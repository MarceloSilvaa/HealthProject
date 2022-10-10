package com.marcelo.HealthProject.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marcelo.HealthProject.dao.RoleDAO;
import com.marcelo.HealthProject.dao.UserDAO;
import com.marcelo.HealthProject.entity.Role;
import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.exception.UserNotFoundException;
import com.marcelo.HealthProject.user.Customer;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private RoleDAO roleDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	@Transactional
	@Override
	public List<User> findAll() {
		return userDAO.findAll();
	}
	
	@Transactional
	@Override
	public User findById(int id) throws UserNotFoundException {
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
	public User findByUsername(String username) {
		return userDAO.findByUsername(username);
	}
	
	@Transactional
	@Override
	public User findByUsernameCustomVerify(String username) throws UserNotFoundException {
		User user = userDAO.findByUsername(username);
		
		if(user == null) {
			throw new UserNotFoundException("Could not find user with username " + username);
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
	public void save(Customer user) {
		User newUser = new User();
		
		newUser.setUsername(user.getUsername());
		newUser.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setActive(true);
		newUser.setSupplements(null);
		newUser.addRole(roleDAO.findByName("ROLE_USER"));
		
		userDAO.save(newUser);
	}

	@Transactional
	@Override
	public void deleteById(int id) {
		userDAO.deleteById(id);
	}
	
	@Transactional
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userDAO.findByUsername(username);
		
		if(user == null) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		
		return new org.springframework.security.core.userdetails.User
			   (user.getUsername(), 
				user.getPassword(),
				mapRolesToAuthorities(user.getRoles())
		);
	}
	
	private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
		return roles.stream()
				.map(role -> new SimpleGrantedAuthority(role.getName()))
				.collect(Collectors.toList());
	}
}
