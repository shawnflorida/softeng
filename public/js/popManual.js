var manualDataButton = document.getElementById("manualDataButton");
var modal = document.getElementById("manualDataModal");
var closeButton = document.querySelector("#manualDataModal .close");
var inputDataField = document.getElementById("inputData");
var addDataButton = document.getElementById("addDataButton");
var dataList = document.getElementById("dataList");
var processDataButton = document.getElementById("processDataButton");
var dataItems = [];

manualDataButton.addEventListener("click", function (e) {
  e.preventDefault();
  modal.style.display = "block";
});

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});

addDataButton.addEventListener("click", function () {
  var input = inputDataField.value.trim();
  if (input !== "") {
    dataItems.push(input);
    renderDataList();
    inputDataField.value = "";
  }
});

processDataButton.addEventListener("click", function () {
  console.log("Manually entered data list:", dataItems);
  console.log("Column count:", dataItems.length);
  // Process the manually entered data list
  // ...
});

function renderDataList() {
  dataList.innerHTML = "";
  var items = dataItems.join(",").split(",");
  items.forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item.trim();
    dataList.appendChild(li);
  });

  // Display column count as a bullet point
  var columnCount = document.createElement("li");
  columnCount.textContent = "Column count: " + items.length;
  dataList.appendChild(columnCount);
}

// Event listener for the manualDataButton
document
  .getElementById("manualDataButton")
  .addEventListener("click", showButtonContainer2);

// Function to show the second set of buttons (button-container-2)
function showButtonContainer2() {
  var buttonContainer2 = document.querySelector(".button-container-2");
  var buttonContainer2Header = document.querySelector(
    ".button-container-2-header"
  );
  buttonContainer2.style.display = "flex";
  buttonContainer2Header.style.display = "flex";
}

function showSlideshowControls() {
  var controls = document.querySelector(".slideshow-controls");
  controls.style.visibility = "visible";
}
