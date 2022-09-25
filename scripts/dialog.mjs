let id = 1

export function showNotification(message) {
  clearAllNotifications()
  let notificationId = id
  let element = document.createElement("div")
  element.classList = "action-background dark-message-container notification-container notification-fade-out"
  element.id = "notification-" + id
  element.innerHTML = 
  `<div class="notification-message">${message}</div>
  <button class="notification-btn">Close</button>
  </div>
  `
  document.body.appendChild(element)
  id++
  element.addEventListener("click", () => {
    clearNotification(notificationId)
  })
  setTimeout(() => {
    clearNotification(notificationId)
  }, 10 * 1000)
}

function clearNotification(notificationId) {
  let element = document.querySelector("#notification-" + notificationId)
  if(element == null) {
    return
  }
  element.parentElement.removeChild(element)
}

function clearAllNotifications() {
  document.querySelectorAll(".notification-container").forEach(element => {
    element.parentElement.removeChild(element)
  })
}

export function confirmAction(message) {
  document.querySelector(".action-message").innerText = message
  document.querySelector(".action-container").style.display = "flex"
  document.querySelectorAll(".action-background").forEach(element => {
    element.style.opacity = 0.5
    element.style.pointerEvents = "none"
  })
}

export function clearAction() {
  document.querySelector(".action-message").innerText = ""
  document.querySelector(".action-container").style.display = "none"
  document.querySelectorAll(".action-background").forEach(element => {
    element.style.opacity = 1
    element.style.pointerEvents = "auto"
  })
}