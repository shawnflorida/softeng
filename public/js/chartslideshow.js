
// Global variables
var charts = [];
var currentChartIndex = 1;

function createChart(jsonData, column) {
  var chartData = jsonData.map(function (data) {
    return data[column];
  });

  var valueCounts = {};
  for (var i = 0; i < chartData.length; i++) {
    var value = chartData[i];
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  }

  var canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;

  var chartContainer = document.createElement("div");
  chartContainer.classList.add("chart-container");
  chartContainer.appendChild(canvas);

  var slideshow = document.getElementById("slideshow");
  slideshow.appendChild(chartContainer);

  var chartTypes = ["bar", "doughnut", "polarArea"]; 
  var chartTypeIndex = charts.length % chartTypes.length;
  var chartType = chartTypes[chartTypeIndex];

  var chart = new Chart(canvas, {
    type: chartType,
    data: {
      labels: Object.keys(valueCounts),
      datasets: [
        {
          label: "Count",
          data: Object.values(valueCounts),
          backgroundColor: generateColors(Object.keys(valueCounts).length),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Count",
          },
        },
        x: {
          title: {
            display: true,
            text: column,
          },
        },
      },
      plugins: {
        legend: {
          display: false, 
        title: {
          display: true,
          text: column + " Column Values", 
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  });

  function generateColors(numColors) {
    var colors = [];
    for (var i = 0; i < numColors; i++) {
      var color = "rgba(";
      color += Math.floor(Math.random() * 256) + ",";
      color += Math.floor(Math.random() * 256) + ",";
      color += Math.floor(Math.random() * 256) + ",";
      color += "0.6)";
      colors.push(color);
    }
    return colors;
  }

  charts.push(chart);
}

function updateSlideshow() {
  var currentChart = charts[currentChartIndex];

  for (var i = 0; i < charts.length; i++) {
    charts[i].canvas.parentNode.style.display = "none";
  }

  currentChart.canvas.parentNode.style.display = "block";

  currentChartIndex = (currentChartIndex + 1) % charts.length;
  globalChartIndex = currentChartIndex;
}

function nextChart() {
  currentChartIndex = (globalChartIndex + 1) % charts.length;
  updateSlideshow();
}

function prevChart() {
    currentChartIndex = (currentChartIndex - 2 + charts.length) % charts.length;
    updateSlideshow();
  }
  
function showSlideshowControls() {
  var controls = document.querySelector(".slideshow-controls");
  controls.style.visibility = "visible";
}

function showSlideshowHeader() {
  var slideshowHeader = document.querySelector(".slideshow-header");
  slideshowHeader.style.visibility = "visible";
}

function showButtonContainer2() {
  var buttonContainer2 = document.querySelector(".button-container-2");
  var buttonContainer2Header = document.querySelector(
    ".button-container-2-header"
  );
  buttonContainer2.style.display = "flex";
  buttonContainer2Header.style.display = "flex";
}

