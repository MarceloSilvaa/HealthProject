export function isEditPage() {
  if(localStorage.getItem("view-supplement-data") == null) {
    return false
  }
  return true
}

export function getItemId() {
  if(isEditPage()) {
    return JSON.parse(localStorage.getItem("view-supplement-data")).id
  }
  return JSON.parse(localStorage.getItem("supplement-overview-data")).next
}

export function numberOf(input) {
  if (typeof input === 'string' || input instanceof String) {
    return parseInt(input)
  }
  else {
    return input
  }
}

export function isValidUnit(unit) {
  if(unit === "ml" || unit === "g" || unit === "mg" || unit === "mcg") {
    return true
  }
  return false
}

export function getFormData(id) {
  let data = 
  {
    id: id,
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

export function getItemDataFromStorage() {
  return JSON.parse(localStorage.getItem("view-supplement-data"))
}

export function loadForm() {
  let data = getItemDataFromStorage()

  document.querySelector("#supplement-name").value = data.name

  document.querySelector("#nutrient-type").value = data.nutrient.type
  document.querySelector("#nutrient-fat-soluble").checked = data.nutrient["fat-soluble"]
  document.querySelector("#nutrient-water-soluble").checked = data.nutrient["water-soluble"]
  document.querySelector("#nutrient-time").value = data.nutrient.time
  document.querySelector("#nutrient-food").value = data.nutrient.food
  document.querySelector("#nutrient-unit-measurement").value = data.nutrient.unit
  document.querySelector("#nutrient-recommended-intake").value = data.nutrient["recommended-intake"]
  document.querySelector("#nutrient-recommended-unit").innerText = data.nutrient.unit
  document.querySelector("#nutrient-maximum-intake").value = data.nutrient["maximum-intake"]
  document.querySelector("#nutrient-maximum-unit").innerText = data.nutrient.unit
  document.querySelector("#nutrient-notes").value = data.nutrient.notes

  document.querySelector("#product-amount").value = data.product.amount
  document.querySelector("#product-amount-unit").innerText = data.nutrient.unit
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
}