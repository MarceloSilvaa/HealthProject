import { showOverview } from "./global.mjs"
import { showNotification, confirmAction, clearAction } from "./dialog.mjs" 
import { isBeforeToday, goesBackOneYear, stringToDate, dateToString } from "./date.mjs"
import { isEditPage, getItemId, numberOf, isValidUnit, loadForm, getFormData } from "./supplement_data.mjs";

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
  document.querySelector("#supplement-name").addEventListener("change", event => {
    let name = event.target.value
    event.target.value = name.charAt(0).toUpperCase() + name.substring(1, name.length)
    if(name !== "") {
      removeErrorMessage(event.target.parentElement.querySelector(".error-message"))
    }
  })

  document.querySelector("#nutrient-unit-measurement").addEventListener("change", event => {
    updateUnitFields(event.target.value)
    if(isValidUnit(event.target.value)) {
      removeErrorMessage(event.target.parentElement.nextElementSibling)
    }
  })
  
  document.querySelector("#product-amount").addEventListener("change", event => {
    if(hasValidNumber(event.target)) {
      removeErrorMessage(event.target.parentElement.parentElement.nextElementSibling)
    }
  })

  document.querySelector("#product-servings").addEventListener("change", event => {
    if(hasValidNumber(event.target)) {
      calculateRefilDate()
    }
  })
  
  document.querySelector("#personal-servings").addEventListener("change", event => {
    if(hasValidNumber(event.target)) {
      removeErrorMessage(event.target.parentElement.nextElementSibling)
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

  document.querySelectorAll(".large-input-number").forEach(element => {
    element.addEventListener("change", event => {
      if(event.target.value === "") {
        return
      }
      if(!hasValidNumber(event.target)) {
        event.target.value = ""
      }
    })
  })
}

function setDialogEventListeners() {
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

function hasValidNumber(element) {
  let value = numberOf(element.value)
  let min = numberOf(element.min)
  let max = numberOf(element.max)
  if(value < min || value > max) {
    return false;
  }
  return true;
}

function updateUnitFields(unit) {
  if(isValidUnit(unit)) {
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

  let x = errorElement.clientHeight;
  setTimeout(() => {
    errorElement.classList += " opacity-transition"
  }, 10)
}

function removeErrorMessage(element) {
  if(element == null || element.classList == null || !element.classList.contains("error-message")) {
    return
  }
  element.classList.remove("opacity-transition")
  setTimeout(() => {
    element.remove()
  }, 751)
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