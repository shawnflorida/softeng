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

  callANOVA();
  callTtest();
  callPearson();
  callSpearman();
  callChi();
}

function callANOVA() {
  // Event listener to open the ANOVA modal when the ANOVA button is clicked
  document.getElementById("anovaButton").addEventListener("click", function () {
    var modal = document.getElementById("anovaModal");
    modal.style.display = "block";

    // Use the global 'columnNamesArray' to create the checkboxes
    createColumnCheckboxes(columnNamesArray, "anovaForm", "anovaColumn");
  });

  document
    .getElementById("processANOVAButton")
    .addEventListener("click", function () {
      // Get the selected column names from the checkboxes
      var selectedColumns = [];
      var checkboxes = document.getElementsByName("anovaColumn");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedColumns.push(checkboxes[i].value);
        }
      }

      console.log(selectedColumns.length);

      // Check if at least 3 columns are selected for ANOVA
      if (selectedColumns.length < 3) {
        var resultDiv = document.getElementById("anovaResult");
        resultDiv.innerHTML =
          "Error: ANOVA requires at least 3 columns to be selected.";
        return;
      }

      // Compute ANOVA with the selected column names
      var anovaResult = computeANOVA(selectedColumns);

      // Display the ANOVA result in a div
      var resultDiv = document.getElementById("anovaResult");
      resultDiv.innerHTML = anovaResult;
    });

  // Close the ANOVA modal when the "Close" button is clicked
  document
    .getElementById("closeANOVAButton")
    .addEventListener("click", function () {
      var modal = document.getElementById("anovaModal");
      modal.style.display = "none";
    });
}

function callTtest() {
  document.getElementById("tTestButton").addEventListener("click", function () {
    var modal = document.getElementById("tTestModal");
    modal.style.display = "block";

    createColumnCheckboxes(columnNamesArray, "tTestForm", "tTestColumn");
  });

  document
    .getElementById("processTTestButton")
    .addEventListener("click", function () {
      var selectedColumns = [];
      var checkboxes = document.getElementsByName("tTestColumn");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedColumns.push(checkboxes[i].value);
        }
      }

      console.log(selectedColumns.length);

      if (selectedColumns.length > 2) {
        var resultDiv = document.getElementById("tTestResult");
        resultDiv.innerHTML = "Error: T-Test requires two columns only.";
        return;
      }
      console.log(selectedColumns[0], selectedColumns[1]);

      var tTestResult = computeTTest(selectedColumns[0], selectedColumns[1]);

      var resultDiv = document.getElementById("tTestResult");
      resultDiv.innerHTML = tTestResult;
    });

  document
    .getElementById("closeTTestButton")
    .addEventListener("click", function () {
      var modal = document.getElementById("tTestModal");
      modal.style.display = "none";
    });
}

function callPearson() {
  document
    .getElementById("pearsonButton")
    .addEventListener("click", function () {
      var modal = document.getElementById("pearsonModal");
      modal.style.display = "block";

      createColumnCheckboxes(columnNamesArray, "pearsonForm", "pearsonColumn");
    });

  document
    .getElementById("processPearsonButton")
    .addEventListener("click", function () {
      var selectedColumns = [];
      var checkboxes = document.getElementsByName("pearsonColumn");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedColumns.push(checkboxes[i].value);
        }
      }

      console.log(selectedColumns.length);

      if (selectedColumns.length > 2) {
        var resultDiv = document.getElementById("pearsonResult");
        resultDiv.innerHTML = "Error: Pearson requires two columns only.";
        return;
      }
      console.log(selectedColumns[0], selectedColumns[1]);

      var pearsonResult = computePearson(
        selectedColumns[0],
        selectedColumns[1]
      );

      var resultDiv = document.getElementById("pearsonResult");
      resultDiv.innerHTML = pearsonResult;
    });

  document
    .getElementById("closePearsonButton")
    .addEventListener("click", function () {
      var modal = document.getElementById("pearsonModal");
      modal.style.display = "none";
    });
}

function callSpearman() {
  document
    .getElementById("spearmanButton")
    .addEventListener("click", function () {
      var modal = document.getElementById("spearmanModal");
      modal.style.display = "block";

      createColumnCheckboxes(
        columnNamesArray,
        "spearmanForm",
        "spearmanColumn"
      );
    });

  document
    .getElementById("processSpearmanButton")
    .addEventListener("click", function () {
      var selectedColumns = [];
      var checkboxes = document.getElementsByName("spearmanColumn");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedColumns.push(checkboxes[i].value);
        }
      }

      console.log(selectedColumns.length);

      if (selectedColumns.length > 2) {
        var resultDiv = document.getElementById("spearmanResult");
        resultDiv.innerHTML = "Error: Spearman requires two columns only.";
        return;
      }
      console.log(selectedColumns[0], selectedColumns[1]);

      var spearmanResult = computeSpearmanRho(
        selectedColumns[0],
        selectedColumns[1]
      );

      var resultDiv = document.getElementById("spearmanResult");
      resultDiv.innerHTML = spearmanResult;
    });

  document
    .getElementById("closeSpearmanButton")
    .addEventListener("click", function () {
      var modal = document.getElementById("spearmanModal");
      modal.style.display = "none";
    });
}

function callChi() {
  document.getElementById("chiSquareButton").addEventListener("click", function () {
    var modal = document.getElementById("chiModal");
    modal.style.display = "block";

    createColumnCheckboxes(columnNamesArray, "chiForm", "chiColumn");
  });

  document
    .getElementById("processChiButton")
    .addEventListener("click", function () {
      var selectedColumns = [];
      var checkboxes = document.getElementsByName("chiColumn");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedColumns.push(checkboxes[i].value);
        }
      }

      console.log(selectedColumns.length);

      var chiResult = computeChiSquare(
        selectedColumns);

      var resultDiv = document.getElementById("chiResult");
      resultDiv.innerHTML = chiResult;
    });

  document
    .getElementById("closeChiButton")
    .addEventListener("click", function () {
      var modal = document.getElementById("chiModal");
      modal.style.display = "none";
    });
}
