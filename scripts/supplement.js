document.querySelector("#nutrient-unit-measurement").addEventListener("change", () => {
  let unit = event.target.value;
  if(unit === "g" || unit === "mg" || unit === "mcg") {
    document.querySelector("#product-amount-measurement").innerHTML = unit
  }
})