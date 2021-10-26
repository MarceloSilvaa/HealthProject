if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start)
}
else {
  start()
}

function start() {
  loadData()
}

document.querySelector(".btn-delete").addEventListener("click", event => {
  confirmAction("This action is irreversible. Are you sure you want to delete this item?")
})

document.querySelector(".action-confirmation-btn").addEventListener("click", event => {
  clearAction()
  window.location.href = "overview.html"
})

document.querySelector(".action-cancel-btn").addEventListener("click", clearAction)

function loadData() {
  let data = JSON.parse(localStorage.getItem("view-supplement-data"))
  
  document.querySelector("#supplement-name").value = data.name

  document.querySelector("#nutrient-type").value = data.nutrient.type
  document.querySelector("#nutrient-fat-soluble").checked = data.nutrient["fat-soluble"]
  document.querySelector("#nutrient-water-soluble").checked = data.nutrient["water-soluble"]
  document.querySelector("#nutrient-time").value = data.nutrient.time
  document.querySelector("#nutrient-food").value = data.nutrient.food
  document.querySelector("#nutrient-unit-measurement").value = data.nutrient.unit
  document.querySelector("#nutrient-recommended-intake").value = data.nutrient["recommended-intake"]
  document.querySelector("#nutrient-recommended-unit").innerText= data.nutrient.unit
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

function confirmAction(message) {
  document.querySelector(".action-message").innerText = message
  document.querySelector(".action-container").style.display = "flex";
  document.querySelectorAll(".action-background").forEach(element => {
    element.style.opacity = 0.5
    element.style.pointerEvents = "none"
  })
}

function clearAction() {
  document.querySelector(".action-message").innerText = ""
  document.querySelector(".action-container").style.display = "none";
  document.querySelectorAll(".action-background").forEach(element => {
    element.style.opacity = 1
    element.style.pointerEvents = "auto"
  })
}