document.querySelector(".btn-delete").addEventListener("click", event => {
  confirmAction()
})

document.querySelector(".action-confirmation-btn").addEventListener("click", event => {
  clearAction()
  window.location.href = "overview.html"
})

document.querySelector(".action-cancel-btn").addEventListener("click", clearAction)

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