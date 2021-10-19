if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready)
}
else {
  ready();
}

document.querySelector(".supplement-name").addEventListener("change", () => {
  let name = event.target.value
  event.target.value = name.charAt(0).toUpperCase() + name.substring(1, name.length)
})

document.querySelector("#nutrient-unit-measurement").addEventListener("change", () => {
  let unit = event.target.value;
  if(unit === "ml" || unit === "g" || unit === "mg" || unit === "mcg") {
    document.querySelector("#product-amount-measurement").innerHTML = unit
  }
  else {
    document.querySelector("#product-amount-measurement").innerHTML = ""
  }
})

document.querySelector("#product-servings").addEventListener("change", calculateRefilDate)

document.querySelector("#personal-servings").addEventListener("change", calculateRefilDate)

document.querySelector("#personal-start").addEventListener("blur", () => {
  let input = event.target.value

  let aux = input.split("-")

  if(!isValid(new Date(aux[0], aux[1] - 1, aux[2]), new Date())) {
    event.target.value = ""
    return;
  }

  calculateRefilDate()
})

document.querySelector(".btn-confirm").addEventListener("click", () => {
  
  showOverview()
})

document.querySelector(".btn-cancel").addEventListener("click", showOverview)

function ready() {
  
}

function calculateRefilDate() {
  // Update estimated refil date if there is enough information to make an estimation
  let refilElement = document.querySelector("#personal-refil")
  let totalServings = document.querySelector("#product-servings").value
  let dayServings = document.querySelector("#personal-servings").value
  let openDate = document.querySelector("#personal-start").value

  if(totalServings < 1 || dayServings < 1 || openDate === "") {
    return;
  }
  
  let aux = openDate.split("-")
  let days = totalServings / dayServings
  let refilDate = new Date(aux[0], aux[1] - 1, aux[2])
  refilDate.setDate(refilDate.getDate() + days)
  refilElement.value = dateToString(refilDate)
}

function isValid(input, today) {
  input.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  //Verify that date is not before today
  if(input.valueOf() < today.valueOf()) {
    return false;
  }

  return true;
}

function setDateToday(element) {
  let date = dateToString(new Date())
  element.value = date
}

function dateToString(date) {
  let str = date.getFullYear() + "-"

  if(date.getMonth() + 1 < 10) {
    str += "0" + (date.getMonth() + 1) + "-"
  }
  else {
    str += (date.getMonth() + 1) + "-"
  }

  if(date.getDate() < 10) {
    str += "0" + date.getDate()
  }
  else {
    str += date.getDate()
  }

  return str
}

function showOverview() {
  window.location.href = "overview.html"
}