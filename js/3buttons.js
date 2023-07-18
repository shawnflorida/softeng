// Get the modal elements
var statisticsModal = document.getElementById("statisticsModal");
var predictionModal = document.getElementById("predictionModal");
var calculatorModal = document.getElementById("calculatorModal");

// Get the buttons that open the modals
var statisticsButton = document.getElementById("statisticsButton");
var predictionButton = document.getElementById("predictionButton");
var calculatorButton = document.getElementById("calculatorButton");

// Open the respective modal when the buttons are clicked
statisticsButton.addEventListener("click", function (event) {
  event.preventDefault();
  statisticsModal.style.display = "block";
  statisticsButton.classList.add("clicked");
  predictionButton.classList.remove("clicked");
  calculatorButton.classList.remove("clicked");
});

predictionButton.addEventListener("click", function (event) {
  event.preventDefault();
  predictionModal.style.display = "block";
  predictionButton.classList.add("clicked");
  statisticsButton.classList.remove("clicked");
  calculatorButton.classList.remove("clicked");
});

calculatorButton.addEventListener("click", function (event) {
  event.preventDefault();
  calculatorModal.style.display = "block";
  calculatorButton.classList.add("clicked");
  statisticsButton.classList.remove("clicked");
  predictionButton.classList.remove("clicked");
});

// Close the modals when the close button is clicked
var closeBtns = document.getElementsByClassName("close");
for (var i = 0; i < closeBtns.length; i++) {
  closeBtns[i].addEventListener("click", function () {
    statisticsModal.style.display = "none";
    predictionModal.style.display = "none";
    calculatorModal.style.display = "none";
    statisticsButton.classList.remove("clicked");
    predictionButton.classList.remove("clicked");
    calculatorButton.classList.remove("clicked");
  });
}

// Close the modals when the user clicks outside of them
window.addEventListener("click", function (event) {
  if (
    event.target == statisticsModal ||
    event.target == predictionModal ||
    event.target == calculatorModal
  ) {
    statisticsModal.style.display = "none";
    predictionModal.style.display = "none";
    calculatorModal.style.display = "none";
    statisticsButton.classList.remove("clicked");
    predictionButton.classList.remove("clicked");
    calculatorButton.classList.remove("clicked");
  }
});
