function computeMean(...selectedColumns) {
    if (selectedColumns.length === 0 || selectedColumns.length > 1) {
        throw new Error("Please select exactly one column for mean computation.");
    }

    var means = {};

    selectedColumns.forEach(function (columnName) {
        var columnData = currentCSV.map(function (row) {
            return parseFloat(row[columnName]);
        });

        var sum = columnData.reduce(function (accumulator, value) {
            return accumulator + value;
        }, 0);

        var mean = sum / columnData.length;

        means[columnName] = mean.toFixed(2);
    });

    console.log(means);

    return means;
}

// Compute Median
function computeMedian(...selectedColumns) {
    if (selectedColumns.length === 0 || selectedColumns.length > 1) {
        throw new Error("Please select exactly one column for median computation.");
    }

    var medians = {};

    selectedColumns.forEach(function (columnName) {
        var columnData = currentCSV.map(function (row) {
            return parseFloat(row[columnName]);
        });

        columnData.sort(function (a, b) {
            return a - b;
        });

        var median;
        if (columnData.length % 2 === 0) {
            var mid = columnData.length / 2;
            median = (columnData[mid - 1] + columnData[mid]) / 2;
        } else {
            var mid = Math.floor(columnData.length / 2);
            median = columnData[mid];
        }

        medians[columnName] = median.toFixed(2);
    });

    return medians;
}

// Compute Mode
function computeMode(...selectedColumns) {
    if (selectedColumns.length === 0 || selectedColumns.length > 1) {
        throw new Error("Please select exactly one column for mode computation.");
    }

    var modes = {};

    selectedColumns.forEach(function (columnName) {
        var columnData = currentCSV.map(function (row) {
            return parseFloat(row[columnName]);
        });

        var frequencyMap = {};
        var maxFrequency = 0;
        var mode = [];

        columnData.forEach(function (value) {
            frequencyMap[value] = (frequencyMap[value] || 0) + 1;
            if (frequencyMap[value] > maxFrequency) {
                maxFrequency = frequencyMap[value];
            }
        });

        for (var value in frequencyMap) {
            if (frequencyMap[value] === maxFrequency) {
                mode.push(parseFloat(value));
            }
        }

        modes[columnName] = mode.join(", ");
    });

    console.log(modes);

    return modes;
}

// Compute Range
function computeRange(...selectedColumns) {
    if (selectedColumns.length === 0 || selectedColumns.length > 1) {
        throw new Error("Please select exactly one column for range computation.");
    }

    var ranges = {};

    selectedColumns.forEach(function (columnName) {
        var columnData = currentCSV.map(function (row) {
            return parseFloat(row[columnName]);
        });

        var min = Math.min(...columnData);
        var max = Math.max(...columnData);
        var range = max - min;

        ranges[columnName] = range.toFixed(2);
    });

    console.log(ranges);

    return ranges;
}

// Compute Variance
function computeVariance(...selectedColumns) {
    if (selectedColumns.length === 0 || selectedColumns.length > 1) {
        throw new Error(
            "Please select exactly one column for variance computation."
        );
    }

    var variances = {};

    selectedColumns.forEach(function (columnName) {
        var columnData = currentCSV.map(function (row) {
            return parseFloat(row[columnName]);
        });

        var mean =
            columnData.reduce(function (accumulator, value) {
                return accumulator + value;
            }, 0) / columnData.length;

        var sumOfSquaredDifferences = columnData.reduce(function (
            accumulator,
            value
        ) {
            var difference = value - mean;
            return accumulator + difference * difference;
        },
            0);

        var variance = sumOfSquaredDifferences / columnData.length;

        variances[columnName] = variance.toFixed(2);
    });

    console.log(variances);

    return variances;
}

// Compute Minimum
function computeMinimum(...selectedColumns) {
    if (selectedColumns.length === 0 || selectedColumns.length > 1) {
        throw new Error(
            "Please select exactly one column for minimum computation."
        );
    }

    var minimums = {};

    selectedColumns.forEach(function (columnName) {
        var columnData = currentCSV.map(function (row) {
            return parseFloat(row[columnName]);
        });

        var min = Math.min(...columnData);

        minimums[columnName] = min.toFixed(2);
    });

    console.log(minimums);

    return minimums;
}

// Compute Maximum
function computeMaximum(...selectedColumns) {
    if (selectedColumns.length === 0 || selectedColumns.length > 1) {
        throw new Error(
            "Please select exactly one column for maximum computation."
        );
    }

    var maximums = {};

    selectedColumns.forEach(function (columnName) {
        var columnData = currentCSV.map(function (row) {
            return parseFloat(row[columnName]);
        });

        var max = Math.max(...columnData);

        maximums[columnName] = max.toFixed(2);
    });

    console.log(maximums);

    return maximums;
}

// Compute Standard Deviation
function computeStandardDeviation(...selectedColumns) {
    if (selectedColumns.length === 0 || selectedColumns.length > 1) {
        throw new Error(
            "Please select exactly one column for standard deviation computation."
        );
    }

    var standardDeviations = {};

    selectedColumns.forEach(function (columnName) {
        var columnData = currentCSV.map(function (row) {
            return parseFloat(row[columnName]);
        });

        var mean =
            columnData.reduce(function (accumulator, value) {
                return accumulator + value;
            }, 0) / columnData.length;

        var sumOfSquaredDifferences = columnData.reduce(function (
            accumulator,
            value
        ) {
            var difference = value - mean;
            return accumulator + difference * difference;
        },
            0);

        var variance = sumOfSquaredDifferences / columnData.length;
        var standardDeviation = Math.sqrt(variance);

        standardDeviations[columnName] = standardDeviation.toFixed(2);
    });

    console.log(standardDeviations);

    return standardDeviations;
}

// Compute Count of Values
function computeCountOfValues(...selectedColumns) {
    if (selectedColumns.length === 0) {
        throw new Error("Please select at least one column for count computation.");
    }

    var counts = {};

    selectedColumns.forEach(function (columnName) {
        var columnData = currentCSV.map(function (row) {
            return parseFloat(row[columnName]);
        });

        counts[columnName] = columnData.length;
    });

    console.log(counts);

    return counts;
}

function callMean() {
    document.getElementById("meanButton").addEventListener("click", function () {
        var modal = document.getElementById("meanModal");
        modal.style.display = "block";
    });

    document
        .getElementById("processMeanButton")
        .addEventListener("click", function () {
            var selectedColumns = [];
            var checkboxes = document.getElementsByName("meanColumn");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedColumns.push(checkboxes[i].value);
                }
            }

            if (selectedColumns.length !== 1) {
                var resultDiv = document.getElementById("meanResult");
                if (selectedColumns.length === 0) {
                    resultDiv.innerHTML = "Error: Please select exactly one column.";
                } else {
                    resultDiv.innerHTML =
                        "Error: Please select only one column for mean computation.";
                }
                return;
            }

            var meanResults = computeMean(selectedColumns);

            var resultDiv = document.getElementById("meanResult");
            resultDiv.innerHTML = "";

            // Display the mean for the selected column
            var column = selectedColumns[0];
            var meanResult = meanResults[column];
            var resultText = "Mean for " + column + ": " + meanResult + "<br>";
            resultDiv.innerHTML += resultText;
        });

    document
        .getElementById("closeMeanButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("meanModal");
            modal.style.display = "none";
        });
}

// Call Median
function callMedian() {
    document
        .getElementById("medianButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("medianModal");
            modal.style.display = "block";
        });

    document
        .getElementById("processMedianButton")
        .addEventListener("click", function () {
            var selectedColumns = [];
            var checkboxes = document.getElementsByName("medianColumn");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedColumns.push(checkboxes[i].value);
                }
            }

            if (selectedColumns.length !== 1) {
                var resultDiv = document.getElementById("medianResult");
                if (selectedColumns.length === 0) {
                    resultDiv.innerHTML = "Error: Please select exactly one column.";
                } else {
                    resultDiv.innerHTML =
                        "Error: Please select only one column for median computation.";
                }
                return;
            }

            var medianResults = computeMedian(selectedColumns);

            var resultDiv = document.getElementById("medianResult");
            resultDiv.innerHTML = "";

            // Display the median for the selected column
            var column = selectedColumns[0];
            var medianResult = medianResults[column];
            var resultText = "Median for " + column + ": " + medianResult + "<br>";
            resultDiv.innerHTML += resultText;
        });

    document
        .getElementById("closeMedianButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("medianModal");
            modal.style.display = "none";
        });
}

// Call Mode
function callMode() {
    document.getElementById("modeButton").addEventListener("click", function () {
        var modal = document.getElementById("modeModal");
        modal.style.display = "block";
    });

    document
        .getElementById("processModeButton")
        .addEventListener("click", function () {
            var selectedColumns = [];
            var checkboxes = document.getElementsByName("modeColumn");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedColumns.push(checkboxes[i].value);
                }
            }

            if (selectedColumns.length !== 1) {
                var resultDiv = document.getElementById("modeResult");
                if (selectedColumns.length === 0) {
                    resultDiv.innerHTML = "Error: Please select exactly one column.";
                } else {
                    resultDiv.innerHTML =
                        "Error: Please select only one column for mode computation.";
                }
                return;
            }

            var modeResults = computeMode(selectedColumns);

            var resultDiv = document.getElementById("modeResult");
            resultDiv.innerHTML = "";

            // Display the mode for the selected column
            var column = selectedColumns[0];
            var modeResult = modeResults[column];
            var resultText = "Mode for " + column + ": " + modeResult + "<br>";
            resultDiv.innerHTML += resultText;
        });

    document
        .getElementById("closeModeButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("modeModal");
            modal.style.display = "none";
        });
}

// Call Range
function callRange() {
    document.getElementById("rangeButton").addEventListener("click", function () {
        var modal = document.getElementById("rangeModal");
        modal.style.display = "block";
    });

    document
        .getElementById("processRangeButton")
        .addEventListener("click", function () {
            var selectedColumns = [];
            var checkboxes = document.getElementsByName("rangeColumn");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedColumns.push(checkboxes[i].value);
                }
            }

            if (selectedColumns.length !== 1) {
                var resultDiv = document.getElementById("rangeResult");
                if (selectedColumns.length === 0) {
                    resultDiv.innerHTML = "Error: Please select exactly one column.";
                } else {
                    resultDiv.innerHTML =
                        "Error: Please select only one column for range computation.";
                }
                return;
            }

            var rangeResults = computeRange(selectedColumns);

            var resultDiv = document.getElementById("rangeResult");
            resultDiv.innerHTML = "";

            // Display the range for the selected column
            var column = selectedColumns[0];
            var rangeResult = rangeResults[column];
            var resultText = "Range for " + column + ": " + rangeResult + "<br>";
            resultDiv.innerHTML += resultText;
        });

    document
        .getElementById("closeRangeButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("rangeModal");
            modal.style.display = "none";
        });
}

// Call Variance
function callVariance() {
    document
        .getElementById("varianceButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("varianceModal");
            modal.style.display = "block";

            createColumnCheckboxes(
                columnNamesArray,
                "varianceForm",
                "varianceColumn"
            );
        });

    document
        .getElementById("processVarianceButton")
        .addEventListener("click", function () {
            var selectedColumns = [];
            var checkboxes = document.getElementsByName("varianceColumn");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedColumns.push(checkboxes[i].value);
                }
            }

            if (selectedColumns.length !== 1) {
                var resultDiv = document.getElementById("varianceResult");
                if (selectedColumns.length === 0) {
                    resultDiv.innerHTML = "Error: Please select exactly one column.";
                } else {
                    resultDiv.innerHTML =
                        "Error: Please select only one column for variance computation.";
                }
                return;
            }

            var varianceResults = computeVariance(selectedColumns);

            var resultDiv = document.getElementById("varianceResult");
            resultDiv.innerHTML = "";

            // Display the variance for the selected column
            var column = selectedColumns[0];
            var varianceResult = varianceResults[column];
            var resultText =
                "Variance for " + column + ": " + varianceResult + "<br>";
            resultDiv.innerHTML += resultText;
        });

    document
        .getElementById("closeVarianceButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("varianceModal");
            modal.style.display = "none";
        });
}

// Call Minimum
function callMinimum() {
    document
        .getElementById("minimumButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("minimumModal");
            modal.style.display = "block";
        });

    document
        .getElementById("processMinimumButton")
        .addEventListener("click", function () {
            var selectedColumns = [];
            var checkboxes = document.getElementsByName("minimumColumn");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedColumns.push(checkboxes[i].value);
                }
            }

            if (selectedColumns.length === 0) {
                var resultDiv = document.getElementById("minimumResult");
                resultDiv.innerHTML = "Error: Please select at least one column.";
                return;
            }

            var minimumResults = computeMinimum(selectedColumns);

            var resultDiv = document.getElementById("minimumResult");
            resultDiv.innerHTML = "";

            // Display the minimum for each selected column
            for (var column in minimumResults) {
                var minimumResult = minimumResults[column];
                var resultText =
                    "Minimum for " + column + ": " + minimumResult + "<br>";
                resultDiv.innerHTML += resultText;
            }
        });

    document
        .getElementById("closeMinimumButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("minimumModal");
            modal.style.display = "none";
        });
}
// Call Maximum
function callMaximum() {
    document
        .getElementById("maximumButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("maximumModal");
            modal.style.display = "block";
        });

    document
        .getElementById("processMaximumButton")
        .addEventListener("click", function () {
            var selectedColumns = [];
            var checkboxes = document.getElementsByName("maximumColumn");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedColumns.push(checkboxes[i].value);
                }
            }

            if (selectedColumns.length !== 1) {
                var resultDiv = document.getElementById("maximumResult");
                if (selectedColumns.length === 0) {
                    resultDiv.innerHTML = "Error: Please select exactly one column.";
                } else {
                    resultDiv.innerHTML =
                        "Error: Please select only one column for maximum computation.";
                }
                return;
            }

            var maximumResults = computeMaximum(selectedColumns);

            var resultDiv = document.getElementById("maximumResult");
            resultDiv.innerHTML = "";

            // Display the maximum for the selected column
            var column = selectedColumns[0];
            var maximumResult = maximumResults[column];
            var resultText = "Maximum for " + column + ": " + maximumResult + "<br>";
            resultDiv.innerHTML += resultText;
        });

    document
        .getElementById("closeMaximumButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("maximumModal");
            modal.style.display = "none";
        });
}

// Call Standard Deviation
function callStandardDeviation() {
    document
        .getElementById("standardDeviationButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("standardDeviationModal");
            modal.style.display = "block";
        });

    document
        .getElementById("processStandardDeviationButton")
        .addEventListener("click", function () {
            var selectedColumns = [];
            var checkboxes = document.getElementsByName("standardDeviationColumn");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedColumns.push(checkboxes[i].value);
                }
            }

            if (selectedColumns.length !== 1) {
                var resultDiv = document.getElementById("standardDeviationResult");
                if (selectedColumns.length === 0) {
                    resultDiv.innerHTML = "Error: Please select exactly one column.";
                } else {
                    resultDiv.innerHTML =
                        "Error: Please select only one column for standard deviation computation.";
                }
                return;
            }

            var standardDeviationResults = computeStandardDeviation(selectedColumns);

            var resultDiv = document.getElementById("standardDeviationResult");
            resultDiv.innerHTML = "";

            // Display the standard deviation for the selected column
            var column = selectedColumns[0];
            var standardDeviationResult = standardDeviationResults[column];
            var resultText =
                "Standard Deviation for " +
                column +
                ": " +
                standardDeviationResult +
                "<br>";
            resultDiv.innerHTML += resultText;
        });

    document
        .getElementById("closeStandardDeviationButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("standardDeviationModal");
            modal.style.display = "none";
        });
}

// Call Count of Values
function callCountOfValues() {
    document
        .getElementById("countOfValuesButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("countOfValuesModal");
            modal.style.display = "block";

            c;
        });

    document
        .getElementById("processCountOfValuesButton")
        .addEventListener("click", function () {
            var selectedColumns = [];
            var checkboxes = document.getElementsByName("countOfValuesColumn");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedColumns.push(checkboxes[i].value);
                }
            }

            if (selectedColumns.length !== 1) {
                var resultDiv = document.getElementById("countOfValuesResult");
                if (selectedColumns.length === 0) {
                    resultDiv.innerHTML = "Error: Please select exactly one column.";
                } else {
                    resultDiv.innerHTML =
                        "Error: Please select only one column for count of values computation.";
                }
                return;
            }

            var countOfValuesResults = computeCountOfValues(selectedColumns);

            var resultDiv = document.getElementById("countOfValuesResult");
            resultDiv.innerHTML = "";

            // Display the count of values for the selected column
            var column = selectedColumns[0];
            var countOfValuesResult = countOfValuesResults[column];
            var resultText =
                "Count of Values for " + column + ": " + countOfValuesResult + "<br>";
            resultDiv.innerHTML += resultText;
        });

    document
        .getElementById("closeCountOfValuesButton")
        .addEventListener("click", function () {
            var modal = document.getElementById("countOfValuesModal");
            modal.style.display = "none";
        });
}

// Call all modal functions
function initializeCalculatorModal() {
    createColumnCheckboxes(columnNamesArray, "meanForm", "meanColumn");
    createColumnCheckboxes(columnNamesArray, "medianForm", "medianColumn");
    createColumnCheckboxes(columnNamesArray, "modeForm", "modeColumn");
    createColumnCheckboxes(columnNamesArray, "rangeForm", "rangeColumn");
    createColumnCheckboxes(columnNamesArray, "minimumForm", "minimumColumn");
    createColumnCheckboxes(columnNamesArray, "maximumForm", "maximumColumn");
    createColumnCheckboxes(
        columnNamesArray,
        "standardDeviationForm",
        "standardDeviationColumn"
    );
    createColumnCheckboxes(
        columnNamesArray,
        "countOfValuesForm",
        "countOfValuesColumn"
    );

    callChi();
    callMean();
    callMedian();
    callMode();
    callRange();
    callVariance();
    callMinimum();

    callMaximum();
    callStandardDeviation();
    callCountOfValues();
}
