import { opendirSync, readFileSync } from "fs";
import path from "path";
import csvReader from "./file_readers/csvReader.js";
import txtReader from "./file_readers/txtReader.js";

const dir = opendirSync("../files");
for await (const entry of dir) {
	if (path.extname(entry.name) === ".csv") {
		const csvFileData = await csvReader(`../files/${entry.name}`);
		console.log("csv:", csvFileData);
	}
	if (path.extname(entry.name) === ".json") {
		console.log("JSON", JSON.parse(readFileSync(`../files/${entry.name}`)));
	}
	if (path.extname(entry.name) === ".txt") {
		const txtFileData = await txtReader(`../files/${entry.name}`);
		console.log("txt:", txtFileData);
	}
}
