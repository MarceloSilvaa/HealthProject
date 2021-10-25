document.querySelector(".notification-btn").addEventListener("click", clearNotification)

function clearNotification() {
  document.querySelector(".notification-message").innerText = ""
  document.querySelector(".notification-container").style.display = "none"
}