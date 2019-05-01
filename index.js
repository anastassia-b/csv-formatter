const fs = require("fs");
const Papa = require("papaparse");
const args = require("minimist")(process.argv.slice(2));

main();

function main() {
  const inputFileName = args["i"] || args["input"];
  const outputFileName = args["o"] || args["output"] || "output.csv";
  if (!inputFileName) {
    console.log("Please specify an input file with --input=your-filename.csv.");
    return;
  }
  fs.readFile(inputFileName, "utf8", function(err, contents) {
    Papa.parse(contents, {
      complete: function(results) {
        console.log("Finished parsing CSV to JSON!");
        const data = results.data;
        replaceEmptyValues(data);
        extendObjectivesDown(data);
        const data2 = removeRowsRoadmapItems(data);
        const data3 = keepRowsKeyResults(data2);
        const data4 = removeTemplateRows(data3);
        saveNewFile(data4, outputFileName);
      }
    });
  });
}

function saveNewFile(data, outputFileName) {
  const output = Papa.unparse(data);
  fs.writeFile(outputFileName, output, "utf8", function(err) {
    if (err) {
      console.log(`Error occured saving the file.\n${err}`);
    } else {
      console.log(`New file saved: ${outputFileName}!`);
    }
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
