package com.marcelo.HealthProject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="supplement_product")
public class SupplementProduct {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@NotNull(message="Field is required")
	@Min(value=1, message = "Value must be greater than or equal to 1")
	@Max(value=9999, message = "Value must be less than or equal to 9999")
	@Column(name="amount")
	private Integer amount;
	
	@Min(value=1, message = "Value must be greater than or equal to 1")
	@Max(value=999, message = "Value must be less than or equal to 999")
	@Column(name="nr_servings")
	private Integer nrServings;
	
	@Min(value=0, message = "Value must be greater than or equal to 0")
	@Max(value=9999, message = "Value must be less than or equal to 9999")
	@Column(name="price")
	private Integer price;
	
	@Column(name="price_currency")
	private String priceCurrency;
	
	@Column(name="company")
	private String company;
	
	@Column(name="link")
	private String link;
	
	public SupplementProduct() {
		
	}

	public SupplementProduct(Integer amount, Integer nrServings, Integer price, String priceCurrency, String company, String link) {
		this.amount = amount;
		this.nrServings = nrServings;
		this.price = price;
		this.priceCurrency = priceCurrency;
		this.company = company;
		this.link = link;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Integer getNrServings() {
		return nrServings;
	}

	public void setNrServings(Integer nrServings) {
		this.nrServings = nrServings;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getPriceCurrency() {
		return priceCurrency;
	}

	public void setPriceCurrency(String priceCurrency) {
		this.priceCurrency = priceCurrency;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public SupplementProduct createDeepCopy() {
		SupplementProduct newSupplement = new SupplementProduct();
		newSupplement.setId(null);
		newSupplement.setAmount(this.getAmount());
		newSupplement.setNrServings(this.getNrServings());
		newSupplement.setPrice(this.getPrice());
		newSupplement.setPriceCurrency(this.getPriceCurrency());
		newSupplement.setCompany(this.getCompany());
		newSupplement.setLink(this.getLink());
		return newSupplement;
	}
	
	@Override
	public String toString() {
		return "SupplementProduct [id=" + id + ", amount=" + amount + ", nrServings=" + nrServings + ", price=" + price
				+ ", priceCurrency=" + priceCurrency + ", company=" + company + ", link=" + link + "]";
	}
	
}
