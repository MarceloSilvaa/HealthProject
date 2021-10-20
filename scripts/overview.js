if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready)
}
else {
  ready()
}

var data;

function ready() {
  data = {};
}

document.querySelector(".file-load").addEventListener("change", (event) => {
  let file = event.target.files[0]
  let reader = new FileReader()
  reader.readAsText(file, "utf-8")
  reader.onload = readerEvent => {
    data = JSON.parse(readerEvent.target.result);
  }
})

document.querySelector(".file-save").addEventListener("click", () => {
  if(Object.keys(data).length === 0) {
    showNotification("There is no data to be saved.")
    return;
  }
  saveData()
})

document.querySelector(".btn-new-item").addEventListener("click", () => {
  window.location.href = "supplement.html"
})

function saveData() {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  var downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "Supplement overview" + ".json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function showNotification(message) {
  document.querySelector(".notification-message").innerText = message
  document.querySelector(".notification-container").style.display = "flex";
}