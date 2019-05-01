var fs = require("fs");
const Papa = require("papaparse");
var stringify = require("csv-stringify");

fs.readFile("./input.csv", "utf8", function(err, contents) {
  Papa.parse(contents, {
    complete: function(results) {
      console.log("Finished parsing CSV to JSON!");
      const data = results.data;
      replaceEmptyValues(data);
      extendObjectivesDown(data);
      const data2 = removeRowsRoadmapItems(data);
      const data3 = keepRowsKeyResults(data2);
      const data4 = removeTemplateRows(data3);
      saveNewFile(data4);
    }
  });
});

function saveNewFile(data) {
  stringify(data, function(err, output) {
    fs.writeFile("output.csv", output, "utf8", function(err) {
      if (err) {
        console.log(`Error occured saving the file.\n${err}`);
      } else {
        console.log("New file saved!");
      }
    });
  });
}

function replaceEmptyValues(data) {
  data.forEach((row, i) => {
    row.forEach((value, j) => {
      if (value == " " || value == "no grade needed") {
        row[j] = "";
      }
    });
  });
}

function extendObjectivesDown(data) {
  data.forEach((row, i) => {
    if (!row[0]) {
      row[0] = data[i - 1][0];
    }
  });
}

function keepRowsKeyResults(data) {
  return data.filter(row => {
    return row[1];
  });
}

function removeRowsRoadmapItems(data) {
  return data.filter(row => {
    return !row[2];
  });
}

function removeTemplateRows(data) {
  return data.filter(row => {
    return row[0] != "Objective: [Text Goes Here]";
  });
}
