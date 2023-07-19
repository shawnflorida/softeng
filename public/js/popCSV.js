// Global variables
var charts = [];
// Global variable to store the CSV data from popCSV.js
var currentCSV = [];

var currentChartIndex = 1;
var columnNamesArray = []; // Global array to store column names

// Event listener for the CSV button
document.getElementById("csvButton").addEventListener("click", function (e) {
  e.preventDefault();
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".csv";
  fileInput.addEventListener("change", handleFileSelect);
  fileInput.click();
});

document
  .getElementById("csvButton")
  .addEventListener("click", showButtonContainer2);

// Handle file selection
function handleFileSelect(event) {
  var file = event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var csvData = e.target.result;
      renderCSVData(csvData);
    };
    reader.readAsText(file);
  }
}

// Render CSV data
function renderCSVData(csvData) {
  var lines = csvData.split("\n");
  var jsonData = []; // Array to store JSON data
  var columnNames = lines[0].split(","); // Extract column names from the header

  // Process each line of the CSV data
  for (var i = 1; i < lines.length; i++) {
    var columns = lines[i].split(",");
    var rowData = {};

    // Check if the row has valid data
    var isValidRow = true;

    // Process each column of the CSV data
    for (var j = 0; j < columns.length; j++) {
      var trimmedValue = columns[j].trim();
      if (
        trimmedValue === "undefined" ||
        isNaN(trimmedValue) ||
        trimmedValue === ""
      ) {
        isValidRow = false;
        break;
      }
      rowData[columnNames[j]] = trimmedValue;
    }

    // If the row has valid data, add it to the JSON array
    if (isValidRow) {
      jsonData.push(rowData);
    }
  }

  currentCSV = jsonData;

  // Store the column names in the global array
  columnNamesArray = columnNames;
  console.log(columnNamesArray);

  // Create a chart for each column
  for (var column in columnNames) {
    if (column !== "") {
      createChart(jsonData, columnNames[column]);
    }
  }

  // Update the slideshow immediately
  updateSlideshow();
  showSlideshowControls();
  showButtonContainer2();
  showSlideshowHeader();

  setInterval(updateSlideshow, 7000);
  initializeStatisticsModal();
  initializeCalculatorModal();
}
