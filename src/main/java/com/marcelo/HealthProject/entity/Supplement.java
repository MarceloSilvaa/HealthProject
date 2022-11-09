package com.marcelo.HealthProject.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="supplement")
public class Supplement {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@Column(name="user_id")
	private Integer userId;
	
	@NotNull(message="Field is required")
	@Size(min=1, max=30, message="Name length must in the following range: 1-30")
	@Column(name="name")
	private String name;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="supplement_nutrient_id")
	private SupplementNutrient nutrient;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="supplement_product_id")
	private SupplementProduct product;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="supplement_personal_id")
	private SupplementPersonal personal;
	
	public Supplement() {
		
	}

	public Supplement(Integer userId, String name, SupplementNutrient nutrient, SupplementProduct product,
			SupplementPersonal personal) {
		this.userId = userId;
		this.name = name;
		this.nutrient = nutrient;
		this.product = product;
		this.personal = personal;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public SupplementNutrient getNutrient() {
		return nutrient;
	}

	public void setNutrient(SupplementNutrient nutrient) {
		this.nutrient = nutrient;
	}

	public SupplementProduct getProduct() {
		return product;
	}

	public void setProduct(SupplementProduct product) {
		this.product = product;
	}

	public SupplementPersonal getPersonal() {
		return personal;
	}

	public void setPersonal(SupplementPersonal personal) {
		this.personal = personal;
	}

	@Override
	public String toString() {
		return "Supplement [id=" + id + ", userId=" + userId + ", name=" + name + ""
				+ ", nutrient=" + nutrient 
				+ ", product=" + product
				+ ", personal=" + personal
				+ "]";
	}
	
}
