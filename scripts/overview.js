if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready)
}
else {
  ready()
}

function ready() {
  setOverviewData()
  addNewSupplement()
  setOverviewStorage()
  displayOverviewData()
}

document.querySelector(".file-load").addEventListener("change", (event) => {
  clearOverviewRows()
  loadOverviewFile(event.target.files[0])
})

document.querySelector(".file-save").addEventListener("click", () => {
  if(Object.keys(data).length === 0) {
    showNotification("There is no data to save.")
    return;
  }
  saveData()
})

document.querySelector(".btn-new-item").addEventListener("click", () => {
  window.location.href = "supplement.html"
})

var data;

function showNotification(message) {
  document.querySelector(".notification-message").innerText = message
  document.querySelector(".notification-container").style.display = "flex";
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
      <span class="overview-nutrient overview-column">${element.name}</span>
      <span class="overview-dosage overview-column">${element.product.amount}</span>
      <span class="overview-serving overview-column">${element.personal.servings}</span>
      <span class="overview-time overview-column">${element.personal.time}</span>
      <span class="overview-food overview-column">${element.nutrient.food}</span>
      <span class="overview-refil overview-column">${element.personal["refil-date"]}</span>
      <a target="_blank" class="overview-link overview-column" href="${element.product.link}">${element.product.link}</a>
    </div>`
  })
}

function addNewSupplement() {
  let newSupplement = localStorage.getItem("new-supplement-data")
  if(newSupplement != null) {
    data.supplements[data.size] = JSON.parse(newSupplement)
    data.size++;
    localStorage.removeItem("new-supplement-data")
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