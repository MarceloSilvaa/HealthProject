package com.marcelo.HealthProject.dao;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.marcelo.HealthProject.entity.Role;

@Repository
public class RoleDAOHibernateImpl implements RoleDAO {

	@Autowired
	private EntityManager entityManager;
	
	@Override
	public Role findByName(String roleName) {
		Session session = entityManager.unwrap(Session.class);
		
		Query<Role> query = session.createQuery("FROM Role WHERE name=:rname", Role.class);
		query.setParameter("rname", roleName);
		query.executeUpdate();
		
		Role role = null;
		try {
			role = query.getSingleResult();
		}
		catch(Exception e) {
			role = null;
		}
		
		return role;
	}

}
