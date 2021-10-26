export function updateUnitFields(unit) {
  if(unit === "ml" || unit === "g" || unit === "mg" || unit === "mcg") {
    document.querySelector("#nutrient-recommended-unit").innerHTML = unit
    document.querySelector("#nutrient-maximum-unit").innerHTML = unit
    document.querySelector("#product-amount-unit").innerHTML = unit
  }
  else {
    document.querySelector("#nutrient-recommended-unit").innerHTML = "Unit undefined"
    document.querySelector("#nutrient-maximum-unit").innerHTML = "Unit undefined"
    document.querySelector("#product-amount-unit").innerHTML = "Unit undefined"
  }
}

export function getFormData() {
  let data = 
  {
    id: (JSON.parse(localStorage.getItem("supplement-overview-data")).next),
    name: document.querySelector("#supplement-name").value,
    nutrient:
    {
      type: document.querySelector("#nutrient-type").value,
      "fat-soluble": document.querySelector("#nutrient-fat-soluble").checked,
      "water-soluble": document.querySelector("#nutrient-water-soluble").checked,
      time: document.querySelector("#nutrient-time").value,
      food: document.querySelector("#nutrient-food").value,
      unit: document.querySelector("#nutrient-unit-measurement").value,
      "recommended-intake": document.querySelector("#nutrient-recommended-intake").value,
      "maximum-intake": document.querySelector("#nutrient-maximum-intake").value,
      notes: document.querySelector("#nutrient-notes").value
    },
    product: 
    {
      amount: document.querySelector("#product-amount").value,
      servings: document.querySelector("#product-servings").value,
      price: document.querySelector("#product-price").value,
      currency: document.querySelector("#product-price-currency").value,
      company: document.querySelector("#product-company").value,
      link: document.querySelector("#product-link").value
    },
    personal: 
    {
      servings: document.querySelector("#personal-servings").value,
      time: document.querySelector("#personal-time").value,
      "opening-date": document.querySelector("#personal-start").value,
      "refil-date": document.querySelector("#personal-refil").value
    }
  }
  return data
}

export function loadForm(data) {
  document.querySelector("#supplement-name").value = data.name

  document.querySelector("#nutrient-type").value = data.nutrient.type
  document.querySelector("#nutrient-fat-soluble").checked = data.nutrient["fat-soluble"]
  document.querySelector("#nutrient-water-soluble").checked = data.nutrient["water-soluble"]
  document.querySelector("#nutrient-time").value = data.nutrient.time
  document.querySelector("#nutrient-food").value = data.nutrient.food
  document.querySelector("#nutrient-unit-measurement").value = data.nutrient.unit
  document.querySelector("#nutrient-recommended-intake").value = data.nutrient["recommended-intake"]
  document.querySelector("#nutrient-maximum-intake").value = data.nutrient["maximum-intake"]
  document.querySelector("#nutrient-notes").value = data.nutrient.notes

  document.querySelector("#product-amount").value = data.product.amount
  document.querySelector("#product-servings").value = data.product.servings
  document.querySelector("#product-price").value = data.product.price
  document.querySelector("#product-price-currency").value = data.product.currency
  document.querySelector("#product-company").value = data.product.company
  document.querySelector("#product-link").value = data.product.link

  document.querySelector("#personal-servings").value = data.personal.servings
  document.querySelector("#personal-time").value = data.personal.time
  document.querySelector("#personal-start").value = data.personal["opening-date"]
  document.querySelector("#personal-refil").value = data.personal["refil-date"]

  document.querySelector("#supplement-name").blur()

  updateUnitFields(data.nutrient.unit)
}