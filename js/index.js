var slideshowButton = document.getElementById("prevButton");
var slideshowButton = document.getElementById("nextButton");

// Show the slideshow controls
function showSlideshowHeader() {
  var slideshowHeader = document.querySelector(".slideshow-header");
  slideshowHeader.style.visibility = "visible";
  slideshowButton.classList.toggle("clicked");
}
function showSlideshowControls() {
  var controls = document.querySelector(".slideshow-controls");
  controls.style.visibility = "visible";
}

// Function to show the second set of buttons (button-container-2)
function showButtonContainer2() {
  var buttonContainer2 = document.querySelector(".button-container-2");
  var buttonContainer2Header = document.querySelector(
    ".button-container-2-header"
  );
  buttonContainer2.style.display = "flex";
  buttonContainer2Header.style.display = "flex";
}

// Get the button elements
var csvButton = document.getElementById("csvButton");
var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");

// Add event listener to the CSV button
csvButton.addEventListener("click", function () {
  csvButton.classList.toggle("clicked"); // Toggle the "clicked" class
});

var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");

// Add event listener to the next button
nextButton.addEventListener("click", function () {
  nextButton.classList.toggle("clicked"); // Toggle the "clicked" class for the next button
  prevButton.classList.remove("clicked"); // Remove the "clicked" class from the previous button
});

// Add event listener to the previous button
prevButton.addEventListener("click", function () {
  prevButton.classList.toggle("clicked"); // Toggle the "clicked" class for the previous button
  nextButton.classList.remove("clicked"); // Remove the "clicked" class from the next button
});

// Function to calculate using the provided column names
function calculate(columnNames) {
  // Populate the column select dropdown
  console.log("here")
  populateColumnSelect(columnNames);

  // Event listener for the column select
  document.getElementById("columnSelect").addEventListener("change", function () {
    var columnName = this.value;

    // Perform calculations
    calculateMode(columnName);
    calculateRange(columnName);
    calculateVariance(columnName);
  });
}