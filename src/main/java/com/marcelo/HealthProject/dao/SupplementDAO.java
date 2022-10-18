package com.marcelo.HealthProject.dao;

import java.util.List;

import com.marcelo.HealthProject.entity.Supplement;
import com.marcelo.HealthProject.entity.User;

public interface SupplementDAO {
	
	public List<Supplement> findAllByUser(User user);
	
	public Supplement findById(int supplementId);
	
	public void save(int userId, Supplement supplement);
	
	public void deleteById(int supplementId);
	
}
