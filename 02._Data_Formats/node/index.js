import { opendirSync, readFileSync } from "fs";
import path from "path";
import csvReader from "./file_readers/csvReader.js";

async function main(filePath) {
  const csvFileData = await csvReader(filePath);
  console.log("csv:", csvFileData);
}

const dir = opendirSync("../files");
for await (const entry of dir) {
    console.log("Found file:", entry.name);
    console.log("file type:", path.extname(entry.name));

    if (path.extname(entry.name) === ".csv") {
        main(`../files/${entry.name}`);
    }
    if (path.extname(entry.name) === ".json") {
        console.log("JSON", JSON.parse(readFileSync(`../files/${entry.name}`)));
    }
}
