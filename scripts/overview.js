import { showAddSupplement, showEditSupplement } from "./global.mjs"
import { showNotification, confirmAction, clearAction } from "./dialog.mjs"

if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start)
}
else {
  start()
}

var data

function start() {
  initializeOverviewData()
  getDataFromStorage()
  setOverviewStorage()
  displayOverviewData()
  setEventListeners()
}

function setEventListeners() {
  setDataEventListeners()
  setItemEventListeners()
  setButtonEventListeners()
}

function setDataEventListeners() {
  document.querySelector(".file-load").addEventListener("change", event => {
    if(event.target.value !== "") {
      clearOverviewRows()
      loadOverviewFile(event.target)
    }
  })
  
  document.querySelector(".file-save").addEventListener("click", () => {
    if(data.size === 0) {
      showNotification("There is no data to save.")
      return
    }
    saveData()
  })
  
  document.querySelector(".data-reset").addEventListener("click", () => {
    document.querySelector(".action-confirmation-btn").addEventListener("click", resetAction)
    confirmAction("This action is irreversible. Are you sure you want to delete all stored data?")
  })
}

function setItemEventListeners() {
  document.querySelectorAll(".duplicate-item").forEach(element => {
    element.addEventListener("click", event => {
      let item = getItemData(event.target.parentElement.parentElement.parentElement)
      duplicateSupplement(item)
    })
  })

  document.querySelectorAll(".delete-item").forEach(element => {
    element.addEventListener("click", event => {
      let actionBtn = document.querySelector(".action-confirmation-btn")
      actionBtn.addEventListener("click", deleteItemAction)
      actionBtn.itemRow = event.target.parentElement.parentElement.parentElement
      confirmAction("This action is irreversible. Are you sure you want to delete this item?")
    })
  })

  document.querySelectorAll(".overview-nutrient-page").forEach(element => {
    element.addEventListener("click", event => {
      let aux = getItemData(event.target.parentElement.parentElement)
      localStorage.setItem("view-supplement-data", JSON.stringify(aux))
      showEditSupplement()
    })
  })
}

function setButtonEventListeners() {
  document.querySelector(".action-cancel-btn").addEventListener("click", clearAction)

  document.querySelector(".btn-new-item").addEventListener("click", () => {
    showAddSupplement()
  })
}

function resetAction() {
  clearData()
  clearAction()
  removeEventListener('click', resetAction);
}

function deleteItemAction(event) {
  let row = event.currentTarget.itemRow
  let id = getId(row)
  deleteItem(id)
  setOverviewStorage()
  row.remove()
  clearAction()
  removeEventListener('click', deleteItemAction);
}

function initializeOverviewData() {
  if(localStorage.getItem("supplement-overview-data") == null) {
    data = 
    {
      size: 0,
      next: 1,
      supplements: []
    }
  }
  else {
    data = JSON.parse(localStorage.getItem("supplement-overview-data"))
  }
}

function getDataFromStorage() {
  addNewSupplement()
  editSupplement()
  deleteSupplement()
}

function addNewSupplement() {
  let newSupplement = localStorage.getItem("new-supplement-data")
  if(newSupplement != null) {
    data.supplements[data.size] = JSON.parse(newSupplement)
    data.size++
    data.next++
    localStorage.removeItem("new-supplement-data")
  }
}

function editSupplement() {
  localStorage.removeItem("view-supplement-data")
  let editData = JSON.parse(localStorage.getItem("edit-supplement-data"))
  if(editData != null) {
    let id = editData.id
    let index = data.supplements.findIndex(item => {
      return item.id === id
    })
    data.supplements[index] = editData
    localStorage.removeItem("edit-supplement-data")
  }
}

function deleteSupplement() {
  localStorage.removeItem("view-supplement-data")
  let removeData = JSON.parse(localStorage.getItem("delete-supplement-data"))
  if(removeData != null) {
    deleteItem(removeData)
    localStorage.removeItem("delete-supplement-data")
  }
}

function deleteItem(id) {
  data.supplements = data.supplements.filter(item => {
    return item.id != id
  })
  data.size--
}

function duplicateSupplement(item) {
  let dupItem = JSON.parse(JSON.stringify(item))
  dupItem.id = data.next
  data.supplements[data.size] = dupItem
  data.size++
  data.next++
  clearOverviewRows()
  displayOverviewData()
  setItemEventListeners()
  setOverviewStorage()
}

function setOverviewStorage() {
  localStorage.setItem("supplement-overview-data", JSON.stringify(data))
}

function displayOverviewData() {
  data.supplements.forEach(element => {
    let date = ""
    if(element.personal["refil-date"] !== "") {
      date = new Date(element.personal["refil-date"]).toLocaleDateString()
    }

    document.querySelector(".overview-items").innerHTML +=
    `<div class="overview-row">
      <span class="overview-id">${element.id}</span>
      <div class="overview-nutrient overview-column">
        <span class="overview-nutrient-page">${element.name}</span>
        <div class="page-toolbox">
          <img class="page-tool duplicate-item" src="./images/duplicate.png" alt="duplicate">
          <img class="page-tool delete-item" src="./images/delete.png" alt="delete">
        </div>
      </div>
      <span class="overview-dosage overview-column">${element.product.amount + " " + element.nutrient.unit}</span>
      <span class="overview-serving overview-column">${element.personal.servings}</span>
      <span class="overview-time overview-column">${element.personal.time}</span>
      <span class="overview-food overview-column">${element.nutrient.food}</span>
      <span class="overview-refil overview-column">${date}</span>
      <a target="_blank" class="overview-link overview-column" href="${element.product.link}">${element.product.link}</a>
    </div>`
  })
}

function clearOverviewRows() {
  document.querySelector(".overview-items").innerHTML = ""
}

function getItemData(row) {
  let id = getId(row)
  let itemData = data.supplements.find(row => {
    return row.id === parseInt(id)
  })
  return itemData
}

function getId(row) {
  return row.querySelector(".overview-id").innerText
} 

function loadOverviewFile(element) {
  let reader = new FileReader()
  reader.addEventListener("load", res => {
    data = JSON.parse(res.target.result)
    element.value = ""
    setOverviewStorage()
    displayOverviewData()
    setItemEventListeners()
    showNotification("Content was successfully loaded.")
  })
  reader.readAsText(element.files[0], "utf-8")
}

function saveData() {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
  var downloadAnchor = document.createElement("a")
  downloadAnchor.setAttribute("href", dataStr)
  downloadAnchor.setAttribute("download", "Supplement overview" + ".json")
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}

function clearData() {
  localStorage.removeItem("new-supplement-data")
  localStorage.removeItem("view-supplement-data")
  localStorage.removeItem("edit-supplement-data")
  localStorage.removeItem("delete-supplement-data")
  localStorage.removeItem("supplement-overview-data")
  clearOverviewRows()
  initializeOverviewData()
  setOverviewStorage()
}
