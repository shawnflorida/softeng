
// Function to dynamically create checkboxes for each column in the dataset
function createColumnCheckboxes(columnNames,statisticName,statisticColumnName) {
  var form = document.getElementById(statisticName);

  for (var i = 0; i < columnNames.length; i++) {
    var columnName = columnNames[i];

    var checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("button-container");

    var label = document.createElement("label");
    label.setAttribute("for", columnName);

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", statisticColumnName);
    checkbox.setAttribute("value", columnName);
    checkbox.setAttribute("id", columnName);

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(columnName));

    checkboxContainer.appendChild(label);
    form.appendChild(checkboxContainer);
    
  }
}

