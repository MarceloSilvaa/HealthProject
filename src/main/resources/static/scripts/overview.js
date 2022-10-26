import { showNotification, confirmAction, clearAction } from "./dialog.mjs"
import { deleteAsync } from "./request.mjs"

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
	setGeneralEventListeners();
	setItemEventListeners()
}


/* ------------------------------------
	Listen to buttons responsible for:
	- Clearing action
	- Creating new item
------------------------------------ */
function setGeneralEventListeners() {
	document.querySelector(".action-cancel-btn").addEventListener("click", clearAction)
}

/* ------------------------------------
	Listen to buttons responsible for:
	- Duplicating item
	- Deleting item
	- Opening item form
------------------------------------ */
function setItemEventListeners() {
	
	document.querySelectorAll(".delete-item").forEach(element => {
		element.addEventListener("click", event => {
			let actionBtn = document.querySelector(".action-confirmation-btn")
      		actionBtn.addEventListener("click", deleteItemAction)
      		actionBtn.itemRow = event.target.parentElement.parentElement.parentElement
      		confirmAction("This action is irreversible. Are you sure you want to delete this item?")
		})
	})
}

// ---------------------------------------------------------------------------------
// Functions that require previous confirmation

function deleteItemAction(event) {
	let id = getItemId(event.currentTarget.itemRow)
	deleteAsync(location.href + "/delete/" + id)
	clearAction()
	removeEventListener('click', deleteItemAction)
}

// ---------------------------------------------------------------------------------
// Row functions

function getItemId(row) {
  return row.querySelector(".overview-id").innerText
}