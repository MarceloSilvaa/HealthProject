package com.marcelo.HealthProject.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.marcelo.HealthProject.entity.Supplement;
import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.exception.UserNotFoundException;

@Repository
public class SupplementDAOHibernateImpl implements SupplementDAO {
	
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<Supplement> findAllByUserId(User user) {		
		return user.getSupplements();
	}
	
	@Override
	public List<Supplement> findAllByUsername(User user) {
		return user.getSupplements();
	}

	@Override
	public Supplement findById(int supplementId) {
		return null;
	}

	@Override
	public void save(int userId, Supplement supplement) {
		
	}

	@Override
	public void deleteById(int supplementId) {
		
	}

}
