import { loadForm } from "./supplement_form.mjs"

if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start)
}
else {
  start()
}

function start() {
  let data = JSON.parse(localStorage.getItem("view-supplement-data"))
  id = data.id
  loadForm(data)
}

document.querySelector(".btn-delete").addEventListener("click", () => {
  event.target.blur()
  confirmAction("This action is irreversible. Are you sure you want to delete this item?")
})

document.querySelector(".action-confirmation-btn").addEventListener("click", () => {
  deleteDataRequest()
  clearAction()
  window.location.href = "overview.html"
})

document.querySelector(".action-cancel-btn").addEventListener("click", clearAction)

var id

function deleteDataRequest() {
  localStorage.setItem("delete-supplement-data", JSON.stringify(id))
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