import { showOverview } from "./global.mjs"
import { showNotification, clearNotification, confirmAction, clearAction } from "./dialog.mjs" 
import { isBeforeToday, goesBackOneYear, stringToDate, dateToString } from "./date.mjs"
import { isEditPage, getItemId, loadForm, getFormData } from "./supplement_data.mjs";

if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start)
}
else {
  start();
}

var id
var edit

function start() {
  id = getItemId()
  edit = isEditPage()
  if(edit) {
    loadForm()
  }
  setEventListeners()
}

function setEventListeners() {
  setDataEventListeners()
  setDialogEventListeners()
  setButtonEventListeners()
}

function setDataEventListeners() {
  document.querySelector(".supplement-name").addEventListener("change", () => {
    let name = event.target.value
    event.target.value = name.charAt(0).toUpperCase() + name.substring(1, name.length)
  })

  document.querySelector("#nutrient-unit-measurement").addEventListener("change", event => {
    updateUnitFields(event.target.value)
  })
  
  document.querySelector("#product-servings").addEventListener("change", event => {
    if(isValidNumber(event.target)) {
      calculateRefilDate()
    }
  })
  
  document.querySelector("#personal-servings").addEventListener("change", event => {
    if(isValidNumber(event.target)) {
      calculateRefilDate()
    }
  })
  
  document.querySelector("#personal-start").addEventListener("blur", event => {
    verifyDate(event.target, "start")
    calculateRefilDate()
  })
  
  document.querySelector("#personal-refil").addEventListener("blur", event => {
    verifyDate(event.target, "refil")
  })
}

function setDialogEventListeners() {
  document.querySelector(".notification-btn").addEventListener("click", clearNotification)

  if(!edit) {
    return
  }

  document.querySelector(".action-confirmation-btn").addEventListener("click", () => {
    storeDeleteAction()
    clearAction()
    showOverview()
  })
  
  document.querySelector(".action-cancel-btn").addEventListener("click", clearAction)
}

function setButtonEventListeners() {
  document.querySelector(".btn-confirm").addEventListener("click", event => {
    clearAllErrors()
    event.target.blur()
    if(verifyRequiredFields()) {
      storeSupplement()
      showOverview()
    }
    else {
      selectRequiredField()
      showNotification("There are still important fields to fill.")
    }
  })

  document.querySelector(".btn-cancel").addEventListener("click", showOverview)

  if(!edit) {
    return
  }

  document.querySelector(".btn-delete").addEventListener("click", event => {
    event.target.blur()
    confirmAction("This action is irreversible. Are you sure you want to delete this item?")
  })
}

function isValidNumber(element) {
  let value = element.value;
  let min = element.min;
  let max = element.max;

  if(value < min || value > max) {
    return false;
  }
  return true;
}

function updateUnitFields(unit) {
  if(unit === "ml" || unit === "g" || unit === "mg" || unit === "mcg") {
    document.querySelector("#nutrient-recommended-unit").innerText = unit
    document.querySelector("#nutrient-maximum-unit").innerText = unit
    document.querySelector("#product-amount-unit").innerText = unit
  }
  else {
    document.querySelector("#nutrient-recommended-unit").innerText = "Unit undefined"
    document.querySelector("#nutrient-maximum-unit").innerText = "Unit undefined"
    document.querySelector("#product-amount-unit").innerText = "Unit undefined"
  }
}

function verifyDate(element, type) {
  clearSpecificErrors("error-date")

  let date = stringToDate(element.value, true)

  if(type === "start") {
    if(isBeforeToday(date) && !goesBackOneYear(date)) {
      element.value = ""
      highlightField(element, "\u26A0 The date cannot be earlier than today.", "error-date")
      return;
    }
  }

  if(type === "refil") {
    if(isBeforeToday(date)) {
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
  let insertedElement
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

  var x = errorElement.clientHeight;
  setTimeout(() => {
    errorElement.classList += " ease-in"
  }, 10)
}

function selectRequiredField() {
  errorFields[0].focus()
}

function storeSupplement() {
  let id = getItemId()
  if(edit) {
    localStorage.setItem("edit-supplement-data", JSON.stringify(getFormData(id)))
  }
  else {
    localStorage.setItem("new-supplement-data", JSON.stringify(getFormData(id)))
  }
}

function storeDeleteAction() {
  localStorage.setItem("delete-supplement-data", JSON.stringify(id))
}