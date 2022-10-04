package com.marcelo.HealthProject.dao;

import com.marcelo.HealthProject.entity.Role;

public interface RoleDAO {
	
	public Role findByName(String roleName);
}
