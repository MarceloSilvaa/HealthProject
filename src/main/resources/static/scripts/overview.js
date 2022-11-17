import { showNotification, confirmAction, clearAction } from "./dialog.mjs"
import { getAsync, postAsync, deleteAsync } from "./request.mjs"

if(document.readyState === "loading") {
  	document.addEventListener("DOMContentLoaded", start)
}
else {
	start()
}

function start() {
	setEventListeners()
}

// ---------------------------------------------------------------------------------
// Event Listeners

function setEventListeners() {
	setGeneralEventListeners()
	setDataEventListeners()
	setItemEventListeners()
}

/* ------------------------------------
	Listen to buttons responsible for:
	- Clearing action
------------------------------------ */
function setGeneralEventListeners() {
	document.querySelector(".action-cancel-btn").addEventListener("click", () => {
		clearAction()
	})
}

/* ------------------------------------
	Listen to buttons responsible for:
	- Loading data
	- Saving data
	- Resetting data
------------------------------------ */
function setDataEventListeners() {
  
  document.querySelector(".file-save").addEventListener("click", () => {
    saveData()
  })
	
	document.querySelector(".data-reset").addEventListener("click", event => {
		
		// Don't let href link be followed      
    event.preventDefault()
    
    // Store href link in the confirmation button
    let actionBtn = document.querySelector(".action-confirmation-btn")
    actionBtn.url = event.target.href
   
    // Wait for confirmation
    actionBtn.addEventListener("click", resetAction)
    confirmAction("Are you sure you want to delete all supplements?")
    
  })
}

/* ------------------------------------
	Listen to buttons responsible for:
	- Deleting item
------------------------------------ */
function setItemEventListeners() {
	
	document.querySelectorAll(".delete-item").forEach(element => {
		element.addEventListener("click", event => {
			
			// Don't let href link be followed      
      event.preventDefault()
      
      // Store href link in the confirmation button
      let actionBtn = document.querySelector(".action-confirmation-btn")
      actionBtn.url = element.parentElement.href
      
      // Wait for confirmation
      actionBtn.addEventListener("click", deleteItemAction)
      confirmAction("Are you sure you want to delete this item?")
      
		})
	})
}

// ---------------------------------------------------------------------------------
// Functions that require confirmation

function resetAction(event) {
  deleteAsync(event.currentTarget.url)
  clearAction()
  removeEventListener('click', resetAction);
}

function deleteItemAction(event) {
	deleteAsync(event.currentTarget.url)
	clearAction()
	removeEventListener('click', deleteItemAction)
}

// ---------------------------------------------------------------------------------
// Data control

async function saveData() {
	let data = await getAsync("http://localhost:8080/supplements/list")
	
  let dataStr = "data:text/json;charset=utf-8," + 
  		encodeURIComponent(JSON.stringify({ "supplementList": data }))
  		
  let downloadAnchor = document.createElement("a")
  downloadAnchor.setAttribute("href", dataStr)
  downloadAnchor.setAttribute("download", "Supplements" + ".json")
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
  
  showNotification("Data was successfully saved locally.")
}

// ---------------------------------------------------------------------------------
// Row functions

function getItemId(row) {
  return row.querySelector(".overview-id").innerText
}

function clearOverviewRows() {
  document.querySelector(".overview-items").innerHTML = ""
}