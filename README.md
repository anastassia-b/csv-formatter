# csv-formatter

This is a simple **node.js** script to clean up CSV files of a particular format. It relies on [minimist](https://github.com/substack/minimist) for reading CLI arguments and [papaparse](https://github.com/mholt/PapaParse) for CSV - JSON parsing.

```bash
$ npm install
$ npm run-script start -- --input=input.csv

> csv-formatter@1.0.0 start
> node ./index.js "--input=input.csv"
> Finished parsing CSV to JSON!
> New file saved: output.csv!
```