package com.marcelo.HealthProject.service;

import java.util.List;

import com.marcelo.HealthProject.entity.Supplement;

public interface SupplementService {

	public List<Supplement> findAllByUserId(int userId);
	
	public List<Supplement> findAllByUsername(String username);
	
	public Supplement findById(int supplementId);
	
	public void save(int userId, Supplement supplement);
	
	public void deleteById(int supplementId);
}
