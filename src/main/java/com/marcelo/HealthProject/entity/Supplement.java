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

@Entity
@Table(name="supplement")
public class Supplement {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="name")
	private String name;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="supplement_nutrient_id")
	private SupplementNutrient nutrient;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="supplement_product_id")
	private SupplementProduct product;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="supplement_product_id")
	private SupplementPersonal personal;
	
	public Supplement() {
		
	}

	public Supplement(String name, SupplementNutrient nutrient, SupplementProduct product,
			SupplementPersonal personal) {
		this.name = name;
		this.nutrient = nutrient;
		this.product = product;
		this.personal = personal;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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
		return "Supplement [id=" + id + ", name=" + name + ", nutrient=" + nutrient + ", product=" + product
				+ ", personal=" + personal + "]";
	}
	
}
