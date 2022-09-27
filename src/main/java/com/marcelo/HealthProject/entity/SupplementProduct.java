package com.marcelo.HealthProject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="supplement_product")
public class SupplementProduct {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="amount")
	private int amount;
	
	@Column(name="nr_servings")
	private int nrServings;
	
	@Column(name="price")
	private int price;
	
	@Column(name="price_currency")
	private String priceCurrency;
	
	@Column(name="company")
	private String company;
	
	@Column(name="link")
	private String link;
	
	public SupplementProduct() {
		
	}

	public SupplementProduct(int amount, int nrServings, int price, String priceCurrency, String company, String link) {
		this.amount = amount;
		this.nrServings = nrServings;
		this.price = price;
		this.priceCurrency = priceCurrency;
		this.company = company;
		this.link = link;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public int getNrServings() {
		return nrServings;
	}

	public void setNrServings(int nrServings) {
		this.nrServings = nrServings;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
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

	@Override
	public String toString() {
		return "SupplementProduct [id=" + id + ", amount=" + amount + ", nrServings=" + nrServings + ", price=" + price
				+ ", priceCurrency=" + priceCurrency + ", company=" + company + ", link=" + link + "]";
	}
	
}
