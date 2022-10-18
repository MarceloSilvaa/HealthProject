package com.marcelo.HealthProject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="supplement_nutrient")
public class SupplementNutrient {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@Column(name="type")
	private String type;
	
	@Column(name="fat_soluble")
	private Boolean fatSoluble;
	
	@Column(name="water_soluble")
	private Boolean waterSoluble;
	
	@Column(name="time")
	private String time;
	
	@Column(name="food")
	private String food;
	
	@Column(name="unit_measurement")
	private String unitMeasurement;
	
	@Column(name="recommended_intake")
	private String recommendedIntake;
	
	@Column(name="maximum_intake")
	private String maximumIntake;
	
	@Column(name="note")
	private String note;
	
	public SupplementNutrient() {
		
	}

	public SupplementNutrient(String type, Boolean fatSoluble, Boolean waterSoluble, String time, String food,
			String unitMeasurement, String recommendedIntake, String maximumIntake, String note) {
		this.type = type;
		this.fatSoluble = fatSoluble;
		this.waterSoluble = waterSoluble;
		this.time = time;
		this.food = food;
		this.unitMeasurement = unitMeasurement;
		this.recommendedIntake = recommendedIntake;
		this.maximumIntake = maximumIntake;
		this.note = note;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Boolean isFatSoluble() {
		return fatSoluble;
	}

	public void setFatSoluble(Boolean fatSoluble) {
		this.fatSoluble = fatSoluble;
	}

	public Boolean isWaterSoluble() {
		return waterSoluble;
	}

	public void setWaterSoluble(Boolean waterSoluble) {
		this.waterSoluble = waterSoluble;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	public String getUnitMeasurement() {
		return unitMeasurement;
	}

	public void setUnitMeasurement(String unitMeasurement) {
		this.unitMeasurement = unitMeasurement;
	}

	public String getRecommendedIntake() {
		return recommendedIntake;
	}

	public void setRecommendedIntake(String recommendedIntake) {
		this.recommendedIntake = recommendedIntake;
	}

	public String getMaximumIntake() {
		return maximumIntake;
	}

	public void setMaximumIntake(String maximumIntake) {
		this.maximumIntake = maximumIntake;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	@Override
	public String toString() {
		return "SupplementNutrient [id=" + id + ", type=" + type + ", fatSoluble=" + fatSoluble + ", waterSoluble="
				+ waterSoluble + ", time=" + time + ", food=" + food + ", unitMeasurement=" + unitMeasurement
				+ ", recommendedIntake=" + recommendedIntake + ", maximumIntake=" + maximumIntake + ", note=" + note
				+ "]";
	}
}
