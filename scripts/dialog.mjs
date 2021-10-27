export function showNotification(message) {
  document.querySelector(".notification-message").innerText = message
  document.querySelector(".notification-container").style.display = "flex";
}

export function clearNotification() {
  document.querySelector(".notification-message").innerText = ""
  document.querySelector(".notification-container").style.display = "none"
}