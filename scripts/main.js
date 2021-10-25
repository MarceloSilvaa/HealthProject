document.querySelector(".notification-btn").addEventListener("click", clearNotification)

document.querySelector(".action-confirmation-btn").addEventListener("click", clearAction)

document.querySelector(".action-cancel-btn").addEventListener("click", clearAction)

function clearNotification() {
  document.querySelector(".notification-message").innerText = ""
  document.querySelector(".notification-container").style.display = "none"
}

function clearAction() {
  document.querySelector(".action-message").innerText = ""
  document.querySelector(".action-container").style.display = "none";
  document.querySelectorAll(".action-background").forEach(element => {
    element.style.opacity = 1
    element.style.pointerEvents = "auto"
  })
}