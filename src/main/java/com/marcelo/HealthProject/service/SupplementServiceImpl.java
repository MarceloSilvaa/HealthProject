package com.marcelo.HealthProject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marcelo.HealthProject.dao.SupplementDAO;
import com.marcelo.HealthProject.entity.Supplement;
import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.exception.SupplementNotFoundException;

@Service
public class SupplementServiceImpl implements SupplementService {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private SupplementDAO supplementDAO;
	
	@Transactional
	@Override
	public List<Supplement> findAllByUserId(int userId) {
		User user = userService.findById(userId);
		
		return supplementDAO.findAllByUser(user);
	}
	
	@Transactional
	@Override
	public List<Supplement> findAllByUsername(String username) {
		User user = userService.findByUsernameCustomVerify(username);
		
		return supplementDAO.findAllByUser(user);
	}

	@Transactional
	@Override
	public Supplement findById(int supplementId) throws SupplementNotFoundException {
		Supplement supplement = supplementDAO.findById(supplementId);
		
		if(supplement == null) {
			throw new SupplementNotFoundException("Could not find supplement with id " + supplementId);
		}
		
		return supplement;
	}
	
	@Transactional
	@Override
	public void save(int userId, Supplement supplement) {
		supplementDAO.save(userId, supplement);
	}
	
	@Transactional
	@Override
	public void deleteById(int supplementId) {
		supplementDAO.deleteById(supplementId);
	}

}
