import { updateUnitFields, getFormData } from "./supplement_form.mjs";

if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start)
}
else {
  start();
}

document.querySelector(".supplement-name").addEventListener("change", () => {
  let name = event.target.value
  event.target.value = name.charAt(0).toUpperCase() + name.substring(1, name.length)
})

document.querySelector("#nutrient-unit-measurement").addEventListener("change", event => {
  updateUnitFields(event.target.value)
})

document.querySelector("#nutrient-recommended-intake").addEventListener("change", (event) => {
  verifyInputNumber(event.target)
})

document.querySelector("#nutrient-maximum-intake").addEventListener("change", (event) => {
  verifyInputNumber(event.target)
})

document.querySelector("#product-amount").addEventListener("change", (event) => {
  verifyInputNumber(event.target)
})

document.querySelector("#product-servings").addEventListener("change", (event) => {
  if(verifyInputNumber(event.target)) {
    calculateRefilDate()
  }
})

document.querySelector("#product-price").addEventListener("change", (event) => {
  verifyInputNumber(event.target)
})

document.querySelector("#personal-servings").addEventListener("change", (event) => {
  if(verifyInputNumber(event.target)) {
    calculateRefilDate()
  }
})

document.querySelector("#personal-start").addEventListener("blur", (event) => {
  verifyDate(event.target, "start")
  calculateRefilDate()
})

document.querySelector("#personal-refil").addEventListener("blur", (event) => {
  verifyDate(event.target, "refil")
})

document.querySelector(".btn-confirm").addEventListener("click", (event) => {
  clearAllErrors()
  event.target.blur()
  if(verifyRequiredFields()) {
    if(event.target.classList.contains("btn-add")) {
      supplementStorage("add") 
    }
    if(event.target.classList.contains("btn-edit")) {
      supplementStorage("edit") 
    }
    showOverview()
  }
  else {
    selectRequiredField()
    showNotification("There are still important fields to fill.")
  }
})

document.querySelector(".btn-cancel").addEventListener("click", showOverview)

function start() {
  
}

function verifyInputNumber(element) {
  let value = element.value;
  let min = element.min;
  let max = element.max;

  if(value < min || value > max) {
    return false;
  }
  return true;
}

function verifyDate(element, type) {
  clearSpecificErrors("error-date")

  let date = stringToDate(element.value, true)

  if(type === "start") {
    if(beforeToday(date) && !goesBackOneYear(date)) {
      element.value = ""
      highlightField(element, "\u26A0 The date cannot be earlier than today.", "error-date")
      return;
    }
  }

  if(type === "refil") {
    if(beforeToday(date)) {
      element.value = ""
      highlightField(element, "\u26A0 The date cannot be earlier than today.", "error-date")
      return;
    }
    if(!openDateIsEmpty() && beforeOpenDate(date)) {
      element.value = ""
      highlightField(element, "\u26A0 The date cannot be earlier than bottle opening date.", "error-date")
      return;
    }
  }
}

function beforeToday(input) {
  let today = new Date()
  today.setHours(0, 0, 0, 0)

  //Verify if the date is earlier than today
  if(input.valueOf() < today.valueOf()) {
    return true;
  }

  return false;
}

function goesBackOneYear(input) {
  let lastYear = new Date()
  lastYear.setFullYear(lastYear.getFullYear() - 1)
  lastYear.setHours(0, 0, 0, 0)

  //Verify if the date goes back no longer than one year
  if(input.valueOf() >= lastYear.valueOf()) {
    return true;
  }

  return false;
}

function openDateIsEmpty() {
  if(document.querySelector("#personal-start").value === "") {
    return true;
  }
  return false;
}

function beforeOpenDate(input) {
  let startInput = document.querySelector("#personal-start").value
  if(startInput === "") {
    return true;
  }

  let openDate = stringToDate(startInput, true)
  if(input.valueOf() < openDate.valueOf()) {
    return true;
  }

  return false;
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

function setDateToday(element) {
  let date = dateToString(new Date())
  element.value = date
}

function stringToDate(str, setTimeToZero) {
  let aux = str.split("-")
  let date = new Date(aux[0], aux[1] - 1, aux[2])
  if(setTimeToZero) {
    date.setHours(0, 0, 0, 0)
  }
  return date
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

function showNotification(message) {
  document.querySelector(".notification-message").innerText = message
  document.querySelector(".notification-container").style.display = "flex";
}

let errorFields 

function clearSpecificErrors(errorClass) {
  document.querySelectorAll("." + errorClass).forEach(element => {
    element.remove()
  })
}

function clearAllErrors() {
  document.querySelectorAll(".error-message").forEach(element => {
    element.remove()
  })
}

function verifyRequiredFields() {
  errorFields = []
  let confirm = true;
  let arr = document.querySelectorAll(".user-required")
  arr.forEach(element => {
    if(!element.value) {
      confirm = false;
      errorFields.push(element)
      highlightField(element, "\u26A0 This field needs to be filled.", "error-required")
    }
  })
  return confirm;
}

function highlightField(element, message, extraclass) {
  let errorElement = document.createElement("div")
  errorElement.classList = "error-message " + extraclass
  errorElement.innerText = message
  if(element.classList.contains("user-required-name")) {
    element.parentElement.insertBefore(errorElement, element.nextSibling)
  }
  else {
    if(element.parentElement.classList.contains("supplement-row")) {
      element.parentElement.parentElement.insertBefore(errorElement, element.parentElement.nextSibling)
    }
    else {
      element.parentElement.parentElement.parentElement.insertBefore(errorElement, element.parentElement.parentElement.nextSibling)
    }
  }
}

function selectRequiredField() {
  errorFields[0].focus()
}

function supplementStorage(storage) {
  if(storage === "add") {
    let nextId = JSON.parse(localStorage.getItem("supplement-overview-data")).next
    localStorage.setItem("new-supplement-data", JSON.stringify(getFormData(nextId)))
  }
  if(storage === "edit") {
    let curId = JSON.parse(localStorage.getItem("view-supplement-data")).id
    localStorage.setItem("edit-supplement-data", JSON.stringify(getFormData(curId)))
  }
}