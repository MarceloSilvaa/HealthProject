package com.marcelo.HealthProject.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.marcelo.HealthProject.entity.Supplement;
import com.marcelo.HealthProject.entity.User;

@Repository
public class SupplementDAOHibernateImpl implements SupplementDAO {
	
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<Supplement> findAllByUser(User user) {		
		return user.getSupplements();
	}

	@Override
	public Supplement findById(int supplementId) {
		Session session = entityManager.unwrap(Session.class);
		
		Query<Supplement> query = 
				session.createQuery("FROM Supplement WHERE id=:supplementId", Supplement.class);
		query.setParameter("supplementId", supplementId);


		Supplement supplement = null;
		try {
			supplement = query.getSingleResult();
		}
		catch(Exception e) {
			supplement = null;
		}
		
		return supplement;
	}

	@Override
	public void save(Supplement supplement) {
		Session session = entityManager.unwrap(Session.class);
		
		session.saveOrUpdate(supplement);
	}

	@Override
	public void deleteById(int supplementId) {
		Session session = entityManager.unwrap(Session.class);
		
		Query query = session.createQuery("DELETE FROM Supplement WHERE id=:supplementId");
		query.setParameter("supplementId", supplementId);
		query.executeUpdate();
	}
}
