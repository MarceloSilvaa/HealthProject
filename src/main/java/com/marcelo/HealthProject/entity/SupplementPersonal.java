package com.marcelo.HealthProject.entity;

import java.sql.Date;

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
@Table(name="supplement_personal")
public class SupplementPersonal {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@NotNull(message="Field is required")
	@Min(value=0, message = "Value must be greater than or equal to 0")
	@Max(value=9, message = "Value must be less than or equal to 9")
	@Column(name="nr_servings")
	private Integer nrServings;
	
	@Column(name="time")
	private String time;
	
	@Column(name="start")
	private Date start;
	
	@Column(name="refil")
	private Date refil;
	
	public SupplementPersonal() {
		
	}

	public SupplementPersonal(Integer nrServings, String time, Date start, Date refil) {
		this.nrServings = nrServings;
		this.time = time;
		this.start = start;
		this.refil = refil;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getNrServings() {
		return nrServings;
	}

	public void setNrServings(Integer nrServings) {
		this.nrServings = nrServings;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getRefil() {
		return refil;
	}

	public void setRefil(Date refil) {
		this.refil = refil;
	}
	
	public SupplementPersonal createDeepCopy() {
		SupplementPersonal newSupplement = new SupplementPersonal();
		newSupplement.setId(null);
		newSupplement.setNrServings(this.getNrServings());
		newSupplement.setTime(this.getTime());
		newSupplement.setStart(this.getStart());
		newSupplement.setRefil(this.getRefil());
		return newSupplement;
	}
	
	@Override
	public String toString() {
		return "SupplementPersonal [id=" + id + ", nrServings=" + nrServings + ", time=" + time + ", start=" + start
				+ ", refil=" + refil + "]";
	}
	
}
