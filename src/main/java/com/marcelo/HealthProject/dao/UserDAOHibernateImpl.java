package com.marcelo.HealthProject.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.marcelo.HealthProject.entity.User;
import com.marcelo.HealthProject.user.Customer;

@Repository
public class UserDAOHibernateImpl implements UserDAO {
	
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<User> findAll() {
		Session session = entityManager.unwrap(Session.class);

		Query<User> query = session.createQuery("FROM User", User.class);
		
		List<User> list = query.getResultList();
		
		return list;
	}

	@Override
	public User findById(int id) {
		Session session = entityManager.unwrap(Session.class);
		
		User user = session.get(User.class, id);
		
		return user;
	}

	@Override
	public User findByUsername(String username) {
		Session session = entityManager.unwrap(Session.class);
		
		Query<User> query = session.createQuery("from User where username=:theName", User.class);
		query.setParameter("theName", username);
		
		User user = null;
		try {
			user = query.getSingleResult();
		} catch (Exception e) {
			user = null;
		}
		
		return user;
	}
	
	@Override
	public void save(User user) {
		Session session = entityManager.unwrap(Session.class);
		
		session.saveOrUpdate(user);
	}
	
	@Override
	public void deleteById(int id) {
		Session session = entityManager.unwrap(Session.class);
		
		Query query = session.createQuery("DELETE FROM User WHERE id=:userId");
		query.setParameter("userId", id);
		query.executeUpdate();
	}
	
}
