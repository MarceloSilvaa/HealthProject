if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start)
}
else {
  start()
}

document.querySelector(".file-load").addEventListener("change", event => {
  clearOverviewRows()
  loadOverviewFile(event.target.files[0])
})

document.querySelector(".file-save").addEventListener("click", () => {
  if(data.size === 0) {
    showNotification("There is no data to save.")
    return;
  }
  saveData()
})

document.querySelector(".data-reset").addEventListener("click", () => {
  confirmAction("This action is irreversible. Are you sure you want to delete all stored data?")
})

document.querySelectorAll(".overview-nutrient:not(.overview-header)").forEach(element => {
  element.addEventListener("click", event => {
    let aux = getItemData(event.target)
    localStorage.setItem("view-supplement-data", JSON.stringify(aux))
    window.location.href = "edit_supplement.html"
  })
})

document.querySelector(".btn-new-item").addEventListener("click", () => {
  window.location.href = "add_supplement.html"
})

document.querySelector(".action-confirmation-btn").addEventListener("click", event => {
  clearData()
  clearAction()
})

document.querySelector(".action-cancel-btn").addEventListener("click", clearAction)

var data;

function start() {
  setOverviewData()
  addNewSupplement()
  editSupplement()
  deleteSupplement()
  setOverviewStorage()
  displayOverviewData()
}

function showNotification(message) {
  document.querySelector(".notification-message").innerText = message
  document.querySelector(".notification-container").style.display = "flex";
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

function clearOverviewRows() {
  document.querySelector(".overview-items").innerHTML = ""
}

function loadOverviewFile(file) {
  let reader = new FileReader()
  reader.onload = res => {
    data = JSON.parse(res.target.result)
    displayOverviewData()
    setOverviewStorage()
    showNotification("Content was successfully loaded.")
  }
  reader.readAsText(file, "utf-8")
}

function setOverviewData() {
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

function setOverviewStorage() {
  localStorage.setItem("supplement-overview-data", JSON.stringify(data))
}

function displayOverviewData() {
  data.supplements.forEach(element => {
    document.querySelector(".overview-items").innerHTML +=
    `<div class="overview-row">
      <span class="overview-id">${element.id}</span>
      <span class="overview-nutrient overview-column">${element.name}</span>
      <span class="overview-dosage overview-column">${element.product.amount + " " + element.nutrient.unit}</span>
      <span class="overview-serving overview-column">${element.personal.servings}</span>
      <span class="overview-time overview-column">${element.personal.time}</span>
      <span class="overview-food overview-column">${element.nutrient.food}</span>
      <span class="overview-refil overview-column">${element.personal["refil-date"]}</span>
      <a target="_blank" class="overview-link overview-column" href="${element.product.link}">${element.product.link}</a>
    </div>`
  })
}

function getItemData(element) {
  let id =  element.parentElement.querySelector(".overview-id").innerText
  let itemData = data.supplements.find(element => {
    return element.id === parseInt(id)
  })
  return itemData
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
    let id = removeData
    data.supplements = data.supplements.filter(item => {
      return item.id != id
    })
    data.size--
    localStorage.removeItem("delete-supplement-data")
  }
}

function saveData() {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  var downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "Supplement overview" + ".json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function clearData() {
  localStorage.removeItem("new-supplement-data")
  localStorage.removeItem("view-supplement-data")
  localStorage.removeItem("edit-supplement-data")
  localStorage.removeItem("delete-supplement-data")
  localStorage.removeItem("supplement-overview-data")
  clearOverviewRows()
  start()
}