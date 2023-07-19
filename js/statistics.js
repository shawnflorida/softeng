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


// Function to compute Pearson correlation coefficient between two samples
function computePearson(sample1, sample2) {
  // Calculate the means of the two samples
  var sample1Values = currentCSV.map((row) => parseFloat(row[sample1]));
  var sample2Values = currentCSV.map((row) => parseFloat(row[sample2]));

  var mean1 = sample1Values.reduce((acc, value) => acc + value, 0) / sample1Values.length;
  var mean2 = sample2Values.reduce((acc, value) => acc + value, 0) / sample2Values.length;

  // Calculate the covariance
  var covariance =
    sample1Values.reduce((acc, value, index) => acc + (value - mean1) * (sample2Values[index] - mean2), 0) /
    (sample1Values.length - 1);

  // Calculate the standard deviations
  var stdDev1 = Math.sqrt(
    sample1Values.reduce((acc, value) => acc + Math.pow(value - mean1, 2), 0) /
    (sample1Values.length - 1)
  );
  var stdDev2 = Math.sqrt(
    sample2Values.reduce((acc, value) => acc + Math.pow(value - mean2, 2), 0) /
    (sample2Values.length - 1)
  );

  // Calculate the Pearson correlation coefficient
  var pearsonCoefficient = covariance / (stdDev1 * stdDev2);

  return "Pearson Correlation Coefficient: " + pearsonCoefficient.toFixed(5);
}
function computeSpearmanRho(sample1, sample2) {
  // Get the values of the two samples
  var sample1Values = currentCSV.map((row) => parseFloat(row[sample1]));
  var sample2Values = currentCSV.map((row) => parseFloat(row[sample2]));

  // Get the ranks of the values
  var sample1Ranks = rankData(sample1Values);
  var sample2Ranks = rankData(sample2Values);

  // Calculate the differences between ranks
  var rankDifferences = sample1Ranks.map((rank1, index) => rank1 - sample2Ranks[index]);

  // Calculate the sum of squared rank differences
  var sumSquaredRankDiff = rankDifferences.reduce((acc, diff) => acc + Math.pow(diff, 2), 0);

  // Calculate the number of data points
  var n = sample1Ranks.length;

  // Calculate the Spearman rank correlation coefficient (rho)
  var numerator = 6 * sumSquaredRankDiff;
  var denominator = n * (Math.pow(n, 2) - 1);

  var spearmanRho = 1 - (numerator / denominator);

  return "Spearman Rank Correlation Coefficient (rho): " + spearmanRho.toFixed(5);
}

// Helper function to rank the data
function rankData(data) {
  var sortedData = data.slice().sort((a, b) => a - b);
  var ranks = data.map((value) => {
    var count = sortedData.indexOf(value) + 1;
    var tiedRanksSum = count + sortedData.lastIndexOf(value) + 1;
    var averageRank = tiedRanksSum / 2;
    return averageRank;
  });
  return ranks;
}
function computeChiSquare(columnNames) {
  // Get the values of the specified columns from currentCSV
  var columnDataArrays = columnNames.map(function (columnName) {
    return currentCSV.map(function (row) {
      return parseFloat(row[columnName]);
    });
  });

  // Create a contingency table
  var contingencyTable = {};

  // Populate the contingency table
  for (var i = 0; i < columnDataArrays[0].length; i++) {
    var rowValues = columnDataArrays.map(function (columnData) {
      return columnData[i];
    });

    var rowKey = rowValues.join("-");

    if (!contingencyTable[rowKey]) {
      contingencyTable[rowKey] = 1;
    } else {
      contingencyTable[rowKey]++;
    }
  }

  // Calculate the expected frequencies
  var totalRows = columnDataArrays[0].length;
  var totalColumns = columnDataArrays.length;
  var expectedFrequencies = {};

  for (var key in contingencyTable) {
    var observedFrequency = contingencyTable[key];
    var expectedFrequency = (observedFrequency * totalRows) / (totalRows * totalColumns);
    expectedFrequencies[key] = expectedFrequency;
  }

  // Calculate the chi-square statistic
  var chiSquare = 0;

  for (var key in contingencyTable) {
    var observedFrequency = contingencyTable[key];
    var expectedFrequency = expectedFrequencies[key];
    chiSquare += Math.pow(observedFrequency - expectedFrequency, 2) / expectedFrequency;
  }

  // Calculate the degrees of freedom
  var degreesOfFreedom = (Object.keys(contingencyTable).length - 1) * (totalColumns - 1);

  // Compute the p-value using the chi-square distribution
  var pValue = chiSquarePValue(chiSquare, degreesOfFreedom);

  return "Chi-Square: " + chiSquare.toFixed(5) + ", P-Value: " + pValue.toFixed(5);
}

// Function to compute the p-value using the chi-square distribution
function chiSquarePValue(chiSquare, degreesOfFreedom) {
  // You can use statistical libraries or online chi-square distribution calculators
  // to compute the p-value. For simplicity, I'll use the statistical JavaScript library here.
  var pValue = 1 - jStat.chisquare.cdf(chiSquare, degreesOfFreedom);
  return pValue;
}
