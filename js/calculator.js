// Function to compute ANOVA



function computeANOVA() {
  console.log("Column Data Arrays:", currentCSV);

  var columnDataArrays = columnNamesArray.map(function (columnName) {
    return currentCSV.map(function (data) {
      return parseFloat(data[columnName]);
    });
  });

  var numDataPoints = columnDataArrays[0].length;
  for (var i = 1; i < columnDataArrays.length; i++) {
    if (columnDataArrays[i].length !== numDataPoints) {
      return "Error: The number of data points in each column must be the same for ANOVA.";
    }
  }

  var overallMean =
    columnDataArrays.flat().reduce(function (sum, value) {
      return sum + value;
    }, 0) /
    (columnDataArrays.length * numDataPoints);

  var ssBetweenGroups = columnDataArrays.reduce(function (sum, columnData) {
    var mean =
      columnData.reduce(function (acc, value) {
        return acc + value;
      }, 0) / numDataPoints;
    return sum + numDataPoints * Math.pow(mean - overallMean, 2);
  }, 0);

  var ssWithinGroups = columnDataArrays.reduce(function (sum, columnData) {
    return (
      sum +
      columnData.reduce(function (acc, value) {
        return (
          acc +
          Math.pow(
            value -
              columnData.reduce(function (acc, value) {
                return acc + value;
              }, 0) /
                numDataPoints,
            2
          )
        );
      }, 0)
    );
  }, 0);

  var dfBetweenGroups = columnDataArrays.length - 1;
  var dfWithinGroups =
    numDataPoints * columnDataArrays.length - columnDataArrays.length;
  var msBetweenGroups = ssBetweenGroups / dfBetweenGroups;
  var msWithinGroups = ssWithinGroups / dfWithinGroups;

  var fStatistic = msBetweenGroups / msWithinGroups;

  var pValue = computePValueANOVA(fStatistic, dfBetweenGroups, dfWithinGroups);

  return (
    "F-Statistic: " + fStatistic.toFixed(2) + ", P-Value: " + pValue.toFixed(2)
  );
}
function computePValueANOVA(fStatistic, dfBetweenGroups, dfWithinGroups) {
  // Use stats.js to compute the p-value for ANOVA
  var pValue = 0.05;
  return pValue;
}

//Function to compute T-test

// Function to compute t-test for two independent samples
function computeTTest(sample1, sample2) {
  // Calculate the means of the two samples
  var sample1 = currentCSV.map((row) => parseFloat(row[sample1]));
  var sample2 = currentCSV.map((row) => parseFloat(row[sample2]));

  var mean1 = sample1.reduce((acc, value) => acc + value, 0) / sample1.length;
  var mean2 = sample2.reduce((acc, value) => acc + value, 0) / sample2.length;

  // Calculate the variances of the two samples
  var variance1 =
    sample1.reduce((acc, value) => acc + Math.pow(value - mean1, 2), 0) /
    (sample1.length - 1);
  var variance2 =
    sample2.reduce((acc, value) => acc + Math.pow(value - mean2, 2), 0) /
    (sample2.length - 1);

  // Calculate the standard errors of the two samples
  var standardError1 = Math.sqrt(variance1) / Math.sqrt(sample1.length);
  var standardError2 = Math.sqrt(variance2) / Math.sqrt(sample2.length);

  // Calculate the t-statistic
  var tStatistic =
    (mean1 - mean2) /
    Math.sqrt(Math.pow(standardError1, 2) + Math.pow(standardError2, 2));

  // Compute the degrees of freedom
  var df = sample1.length + sample2.length - 2;

  // Compute the two-tailed p-value using a t-distribution table or a statistical library
  var pValue = computePValueTtest(tStatistic, df);

  // Return the t-test result
  return (
    "T-Statistic: " + tStatistic.toFixed(2) + ", P-Value: " + pValue.toFixed(5)
  );
}

function computePValueTtest(tStatistic, df) {
  // Use ttest library to compute the p-value for T-test
  var pValue = 0.05;
  return pValue;
}
